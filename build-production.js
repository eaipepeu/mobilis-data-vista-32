#!/usr/bin/env node

/**
 * Script de build otimizado para produção da Mobilis Consultas
 * 
 * Este script:
 * 1. Limpa a pasta dist anterior
 * 2. Executa o build do Vite com otimizações
 * 3. Prepara os arquivos para upload via FileZilla
 * 4. Cria um arquivo .htaccess para SPA routing
 * 5. Otimiza assets para hospedagem
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build de produção para a Mobilis Consultas...\n');

try {
  // 1. Limpar pasta dist
  console.log('📁 Limpando pasta dist...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // 2. Executar build do Vite
  console.log('⚡ Executando build do Vite...');
  execSync('npm run build', { stdio: 'inherit' });

  // 3. Criar arquivo .htaccess para SPA routing
  console.log('🔧 Criando .htaccess para roteamento SPA...');
  const htaccessContent = `# Mobilis Consultas - Configuração de produção

# Habilitar compressão gzip
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>

# Configurar cache para assets estáticos
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Roteamento SPA - Redirecionar todas as rotas para index.html
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Handle Angular and React routing
    RewriteBase /
    RewriteRule ^index\\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Configurações de segurança
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Configurar tipos MIME
AddType application/javascript .js
AddType text/css .css
AddType image/svg+xml .svg
AddType application/json .json

# Configurações do PHP se necessário
DirectoryIndex index.html index.php

# Evitar listagem de diretórios
Options -Indexes

# Proteger arquivos sensíveis
<Files ~ "\\.(env|json|config|log)$">
    Order allow,deny
    Deny from all
</Files>
`;

  fs.writeFileSync(path.join('dist', '.htaccess'), htaccessContent);

  // 4. Criar arquivo de instruções para upload
  const uploadInstructions = `
# 📋 INSTRUÇÕES PARA UPLOAD NA LOCAWEB VIA FILEZILLA

## Passos para fazer o upload:

1. **Conectar no FileZilla:**
   - Host: ftp.seudominio.com.br (substitua pelo seu domínio)
   - Usuário: Seu usuário FTP da LocaWeb
   - Senha: Sua senha FTP da LocaWeb
   - Porta: 21 (FTP) ou 22 (SFTP)

2. **Navegar até a pasta do site:**
   - Geralmente é: /public_html/ ou /www/
   - Se você tem subdomínio, pode ser: /public_html/subdominio/

3. **Upload dos arquivos:**
   - Selecione TODOS os arquivos da pasta 'dist'
   - Arraste para a pasta do seu site no servidor
   - Aguarde o upload completar

4. **Verificações importantes:**
   - ✅ Arquivo .htaccess foi enviado
   - ✅ Pasta assets/ foi enviada
   - ✅ Arquivo index.html está na raiz
   - ✅ Todos os arquivos .js e .css foram enviados

## Estrutura que deve estar no servidor:
\`\`\`
/public_html/
├── .htaccess
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── outras imagens...
└── outros arquivos...
\`\`\`

## Teste após upload:
1. Acesse: https://seudominio.com.br
2. Teste todas as páginas: /about, /contact, etc.
3. Verifique se não há erros 404

## Problemas comuns:
- **Página em branco**: Verifique se o .htaccess foi enviado
- **Erro 404 nas rotas**: Confirme se o .htaccess está configurado
- **Arquivos não carregam**: Verifique se a pasta assets foi enviada completa

## Contato para suporte:
- Email: contato@mobilisconsultas.com.br
- WhatsApp: (11) 98116-2006
`;

  fs.writeFileSync('UPLOAD-INSTRUCTIONS.md', uploadInstructions);

  // 5. Criar arquivo robots.txt otimizado
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://www.mobilisconsultas.com.br/sitemap.xml

# Otimizações para SEO
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Arquivos que não devem ser indexados
Disallow: /api/
Disallow: /*.json$
Disallow: /dist/
Disallow: /node_modules/

# Delay para evitar sobrecarga
Crawl-delay: 1
`;

  fs.writeFileSync(path.join('dist', 'robots.txt'), robotsTxt);

  // 6. Verificar se todos os arquivos necessários existem
  console.log('🔍 Verificando integridade do build...');
  const requiredFiles = ['index.html', '.htaccess', 'robots.txt'];
  const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join('dist', file)));
  
  if (missingFiles.length > 0) {
    console.error('❌ Arquivos obrigatórios não encontrados:', missingFiles);
    process.exit(1);
  }

  // 7. Informações finais
  console.log('\n✅ Build de produção concluído com sucesso!');
  console.log('📁 Arquivos gerados na pasta: ./dist/');
  console.log('📋 Instruções de upload: UPLOAD-INSTRUCTIONS.md');
  console.log('\n🚀 Pronto para upload na LocaWeb via FileZilla!');
  console.log('\n📊 Estatísticas do build:');
  
  // Mostrar tamanho dos arquivos principais
  const statsFiles = ['index.html', '.htaccess'];
  statsFiles.forEach(file => {
    const filePath = path.join('dist', file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`   ${file}: ${(stats.size / 1024).toFixed(2)} KB`);
    }
  });

  // Contar arquivos na pasta assets
  const assetsPath = path.join('dist', 'assets');
  if (fs.existsSync(assetsPath)) {
    const assetsFiles = fs.readdirSync(assetsPath);
    console.log(`   assets/: ${assetsFiles.length} arquivos`);
  }

  console.log('\n🎉 Mobilis Consultas - Build finalizado!\n');

} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  process.exit(1);
}