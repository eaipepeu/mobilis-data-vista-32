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
    const { email, name, verificationCode } = await req.json()

    // Configurar cliente Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Template do email de verificação
    const emailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Verificação de Conta - Mobilis Consultas</title>
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://your-domain.com/logo.png" alt="Mobilis Consultas" style="height: 60px;">
        </div>
        
        <h2 style="color: #1e40af; text-align: center;">Bem-vindo à Mobilis Consultas!</h2>
        
        <p>Olá <strong>${name}</strong>,</p>
        
        <p>Obrigado por se cadastrar na Mobilis Consultas. Para ativar sua conta, utilize o código de verificação abaixo:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; display: inline-block;">
            <h1 style="color: #1e40af; margin: 0; font-size: 32px; letter-spacing: 8px;">${verificationCode}</h1>
          </div>
        </p>
        
        <p>Este código é válido por 10 minutos.</p>
        
        <p>Se você não solicitou este cadastro, pode ignorar este email.</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        
        <p style="color: #6b7280; font-size: 14px; text-align: center;">
          Mobilis Consultas - Sua plataforma de consultas confiável<br>
          Suporte 24/7 disponível em nosso WhatsApp
        </p>
      </body>
      </html>
    `

    // Enviar email (aqui você integraria com um serviço de email como SendGrid, Resend, etc.)
    // Por enquanto, vamos simular o envio
    console.log(`Enviando email de verificação para ${email} com código ${verificationCode}`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email de verificação enviado com sucesso!' 
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