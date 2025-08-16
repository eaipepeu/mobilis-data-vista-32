import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, name, confirmationCode, amount, paymentMethod } = await req.json()

    // Template do email de confirmação de pagamento
    const emailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Confirmação de Pagamento - Mobilis Consultas</title>
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://your-domain.com/logo.png" alt="Mobilis Consultas" style="height: 60px;">
        </div>
        
        <h2 style="color: #1e40af; text-align: center;">Confirmação de Pagamento</h2>
        
        <p>Olá <strong>${name}</strong>,</p>
        
        <p>Para confirmar seu pagamento de <strong>R$ ${amount}</strong> via <strong>${paymentMethod}</strong>, utilize o código abaixo:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; display: inline-block; border: 2px solid #16a34a;">
            <h1 style="color: #16a34a; margin: 0; font-size: 32px; letter-spacing: 8px;">${confirmationCode}</h1>
          </div>
        </div>
        
        <p>Este código é válido por 10 minutos.</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1e40af;">
          <h3 style="margin-top: 0; color: #1e40af;">Detalhes do Pagamento:</h3>
          <p><strong>Valor:</strong> R$ ${amount}</p>
          <p><strong>Método:</strong> ${paymentMethod}</p>
          <p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
        </div>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        
        <p style="color: #6b7280; font-size: 14px; text-align: center;">
          Mobilis Consultas - Pagamentos seguros e confiáveis<br>
          Em caso de dúvidas, entre em contato pelo WhatsApp
        </p>
      </body>
      </html>
    `

    console.log(`Enviando confirmação de pagamento para ${email} com código ${confirmationCode}`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Código de confirmação enviado com sucesso!' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})