# Template Komput API

### Autor  
**Cainan Luyles** – Engenheiro de Computação, Pós-graduado em Engenharia de Controle e Automação e Engenharia Elétrica.
[LinkedIn](https://www.linkedin.com/in/cainan-luyles/)

---

## Sobre o Template

Este template foi desenvolvido para acelerar a criação de novos projetos, utilizando boas práticas de desenvolvimento como SOLID, DDD e arquitetura modular.  
Tecnologias usadas: Node.js, TypeScript, NestJS, TypeORM.

---

## 🛠 Como iniciar o projeto

### 📦 Pré-requisitos

- Node.js v18+
- PostgreSQL
- Yarn ou NPM

### ⚙️ Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

<pre lang="markdown">  env
# DATABASE CONFIGURATION
MASTER_DATABASE_URL="postgresql://SeuUsuário:SuaSenha@EndereçoDoBanco:porta/NomeDoBancoDeDados"
TENANT_DATABASE_URL="postgresql://SeuUsuário:SuaSenha@EndereçoDoBanco:porta/NomeDoBancoDeDados"
TENANT_DB_HOST="EndereçoDoBanco"
TENANT_DB_PORT="porta"
TENANT_DB_USER="SeuUsuário"
TENANT_DB_PASSWORD="SuaSenha"

# SMTP configuration for sending emails
SMTP_HOST=endereçoHostDeEmail
SMTP_PORT=Porta # ssl 587
SMTP_SECURE=SECURE # ssl true
SMTP_USER=EmailQueIráDispararEmails
SMTP_PASS=SenhaDoEmail
SMTP_FROM="NomeDoEmissario <EmailDoEmissario>"
FRONTEND_URL=URLDoFrontEnd
  </pre>

### 🚀 Rodando em modo desenvolvimento

# Instale as dependências
<pre lang="markdown">  npm install   </pre>

# Rode o servidor com reload automático
<pre lang="markdown">  npm run start:dev  </pre>

# 🏗️ Build do projeto
<pre lang="markdown">  npm run build  </pre>

# ▶️ Rodar em produção (após build)
<pre lang="markdown">  npm run start:prod  </pre>


# 🧩 Migrations com PrismaJS
<pre lang="markdown">  npx prisma migrate dev --schema=prisma/master/master.prisma --name init  </pre>
<pre lang="markdown">  npx prisma migrate dev --schema=prisma/tenant/tenant.prisma --name init  </pre>

Isso irá gerar uma migration com base nas alterações das entidades.

# Executar as migrations
<pre lang="markdown">  npm run migration:run  </pre>

# Reverter a última migration
<pre lang="markdown">  npm run migration:revert  </pre>

---

## 📚 Documentação da API

A documentação da API é gerada automaticamente com o Swagger.

Após iniciar a aplicação, acesse:

👉 [http://localhost:3000/docs](http://localhost:3000/docs)

Lá você encontrará todos os endpoints disponíveis, parâmetros, respostas e possibilidade de realizar requisições diretamente pela interface Swagger.

---