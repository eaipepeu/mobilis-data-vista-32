import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  transactionAmount: number;
  token: string;
  description: string;
  installments: number;
  paymentMethodId: string;
  issuer: string;
  payer: {
    email: string;
    identification: {
      type: string;
      number: string;
    };
  };
  verification_token: string;
  package_info: {
    title: string;
    price: number;
    type: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get authenticated user
    const authHeader = req.headers.get("Authorization")!;
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace("Bearer ", "")
    );

    if (authError || !user) {
      throw new Error("Usuário não autenticado");
    }

    const paymentData: PaymentRequest = await req.json();
    
    // Verify token first
    const { data: tokenData, error: tokenError } = await supabase
      .from('payment_tokens')
      .select('*')
      .eq('user_id', user.id)
      .eq('token', paymentData.verification_token)
      .is('verified_at', null)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (tokenError || !tokenData) {
      throw new Error("Token de verificação inválido ou expirado");
    }

    // Process payment with MercadoPago
    const mpAccessToken = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");
    if (!mpAccessToken) {
      throw new Error("Token do MercadoPago não configurado");
    }

    let payment_data: any = {
      transaction_amount: Number(paymentData.transactionAmount),
      description: paymentData.description,
      payer: {
        email: paymentData.payer.email,
        identification: {
          type: paymentData.payer.identification.type,
          number: paymentData.payer.identification.number,
        },
      },
    };

    // Handle different payment methods
    if (paymentData.paymentMethodId === 'pix') {
      payment_data.payment_method_id = 'pix';
    } else if (paymentData.paymentMethodId === 'bolbradesco') {
      payment_data.payment_method_id = 'bolbradesco';
      payment_data.date_of_expiration = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(); // 3 days expiry
    } else {
      // Credit card payment
      payment_data.token = paymentData.token;
      payment_data.installments = Number(paymentData.installments);
      payment_data.payment_method_id = paymentData.paymentMethodId;
      payment_data.issuer_id = paymentData.issuer;
    }

    const mpResponse = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${mpAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payment_data),
    });

    const mpResult = await mpResponse.json();

    if (!mpResponse.ok) {
      throw new Error(`Erro MercadoPago: ${mpResult.message || "Falha no pagamento"}`);
    }

    // If payment approved, process credits/plan
    if (mpResult.status === "approved") {
      const supabaseService = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
        { auth: { persistSession: false } }
      );

      // Add credits based on package
      const { package_info } = paymentData;
      let creditsToAdd = 0;

      if (package_info.title === "Pacote Básico") {
        creditsToAdd = 6000; // R$ 60,00 em centavos
      } else if (package_info.title === "Pacote Empresarial") {
        creditsToAdd = 12000; // R$ 120,00 em centavos
      }

      if (creditsToAdd > 0) {
        // Update user credits
        const { error: creditError } = await supabaseService
          .from('user_credits')
          .upsert({
            user_id: user.id,
            balance_cents: creditsToAdd,
            total_earned_cents: creditsToAdd,
            total_spent_cents: 0
          }, {
            onConflict: 'user_id'
          });

        if (creditError) {
          console.error('Error updating credits:', creditError);
        }

        // Record transaction
        await supabaseService
          .from('credit_transactions')
          .insert({
            user_id: user.id,
            type: 'CREDIT',
            amount_cents: creditsToAdd,
            description: `Compra de ${package_info.title}`,
            reference_type: 'PAYMENT',
            reference_id: mpResult.id
          });
      }

      // Record the order
      await supabaseService
        .from('orders')
        .insert({
          user_id: user.id,
          amount_cents: Math.round(package_info.price * 100),
          currency: 'BRL',
          status: 'completed',
          payment_method: 'mercadopago',
          payment_data: mpResult,
          consultation_data: package_info,
          completed_at: new Date().toISOString()
        });

      // Mark token as used
      await supabaseService
        .from('payment_tokens')
        .update({ verified_at: new Date().toISOString() })
        .eq('id', tokenData.id);
    }

    return new Response(JSON.stringify(mpResult), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Payment processing error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Falha ao processar pagamento", 
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});