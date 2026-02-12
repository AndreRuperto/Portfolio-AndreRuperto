# Backend - Portfolio André Ruperto

API Express.js para o portfolio pessoal.

## Stack

- **Express 4** - Web framework
- **Prisma** - ORM (PostgreSQL)
- **Resend** - Envio de emails
- **JWT** - Autenticação

## Setup

```bash
# Instalar dependências
npm install

# Copiar e configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# Gerar JWT Secret seguro
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Rodar migrations
npm run migrate

# Iniciar em desenvolvimento
npm run dev
```

## API Endpoints

### Público

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/projects` | Lista todos os projetos |
| `POST` | `/api/contact` | Envia formulário de contato (rate limited: 5/hora) |

### Autenticação

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/auth/login` | Login admin (rate limited: 5/15min) |

### Admin (requer JWT)

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/projects` | Criar projeto |
| `PUT` | `/api/projects/:id` | Atualizar projeto |
| `DELETE` | `/api/projects/:id` | Deletar projeto |
| `GET` | `/api/admin/email-preview/notification` | Preview email de notificação |
| `GET` | `/api/admin/email-preview/confirmation` | Preview email de confirmação |

## Segurança

- Rate limiting em login (5 tentativas / 15 min) e contato (5 mensagens / hora)
- Sanitização de HTML nos templates de email (prevenção de XSS)
- Validação de email e limites de tamanho nos campos
- Rotas de escrita protegidas por JWT
- Body size limitado a 1MB

## Scripts

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Desenvolvimento com hot reload |
| `npm start` | Produção |
| `npm run migrate` | Rodar migrations do Prisma |
| `npm run generate` | Gerar Prisma Client |
| `npm run seed` | Popular banco com dados iniciais |
