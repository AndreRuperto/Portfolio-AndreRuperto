// backend/src/server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

// Carrega o .env correto baseado no NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: envFile });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Rate limiters
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5,
  message: { error: 'Muitas tentativas de login. Tente novamente em 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 5,
  message: { error: 'Muitas mensagens enviadas. Tente novamente mais tarde.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// HTML escape para prevenir XSS em templates de email
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Validação de email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const queryToken = req.query.token;

  const token = authHeader ? authHeader.replace('Bearer ', '') : queryToken;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// Email Templates
function buildNotificationEmail({ name, email, subject, message }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #110F0D; font-family: 'Sora', 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #110F0D; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #F97316, #E8553A); padding: 32px 40px; border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #110F0D; font-size: 22px; font-weight: 700;">Nova mensagem do portfolio</h1>
              <p style="margin: 8px 0 0; color: rgba(17,15,13,0.7); font-size: 14px;">Alguém entrou em contato pelo formulário</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="background-color: #1A1715; padding: 32px 40px; border: 1px solid #332D29; border-top: none;">
              <!-- Nome -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="color: #F97316; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; padding-bottom: 8px;">Nome</td>
                </tr>
                <tr>
                  <td style="color: #FAF8F6; font-size: 16px; padding: 14px 16px; background-color: #252019; border-radius: 10px; border-left: 3px solid #F97316;">${safeName}</td>
                </tr>
              </table>
              <!-- Email -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="color: #F97316; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; padding-bottom: 8px;">Email</td>
                </tr>
                <tr>
                  <td style="padding: 14px 16px; background-color: #252019; border-radius: 10px; border-left: 3px solid #F97316;">
                    <a href="mailto:${safeEmail}" style="color: #F97316; text-decoration: none; font-size: 16px;">${safeEmail}</a>
                  </td>
                </tr>
              </table>
              <!-- Assunto -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="color: #F97316; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; padding-bottom: 8px;">Assunto</td>
                </tr>
                <tr>
                  <td style="color: #FAF8F6; font-size: 16px; padding: 14px 16px; background-color: #252019; border-radius: 10px; border-left: 3px solid #F97316;">${safeSubject}</td>
                </tr>
              </table>
              <!-- Mensagem -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color: #F97316; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; padding-bottom: 8px;">Mensagem</td>
                </tr>
                <tr>
                  <td style="color: #FAF8F6; font-size: 15px; line-height: 1.7; padding: 16px; background-color: #252019; border-radius: 10px; border-left: 3px solid #F97316;">${safeMessage}</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #1A1715; padding: 20px 40px; border: 1px solid #332D29; border-top: none; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0; color: #948C86; font-size: 12px;">Enviado pelo formulário de contato &middot; <a href="https://andreruperto.dev" style="color: #F97316; text-decoration: none;">andreruperto.dev</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildConfirmationEmail({ name, subject, message }) {
  const safeName = escapeHtml(name);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #110F0D; font-family: 'Sora', 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #110F0D; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #F97316, #E8553A); padding: 40px; border-radius: 16px 16px 0 0; text-align: center;">
              <h1 style="margin: 0; color: #110F0D; font-size: 24px; font-weight: 700;">Mensagem recebida!</h1>
              <p style="margin: 8px 0 0; color: rgba(17,15,13,0.7); font-size: 14px;">Vou te responder em breve</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="background-color: #1A1715; padding: 36px 40px; border: 1px solid #332D29; border-top: none;">
              <p style="color: #FAF8F6; font-size: 16px; line-height: 1.7; margin: 0 0 20px;">
                E aí, <strong>${safeName}</strong>!
              </p>
              <p style="color: #C4BBB3; font-size: 15px; line-height: 1.7; margin: 0 0 20px;">
                Recebi sua mensagem sobre "<strong style="color: #FAF8F6;">${safeSubject}</strong>" e vou te responder em até <strong style="color: #F97316;">24 horas</strong>.
              </p>

              <!-- Resumo -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
                <tr>
                  <td style="color: #F97316; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; padding-bottom: 8px;">Sua mensagem</td>
                </tr>
                <tr>
                  <td style="color: #948C86; font-size: 14px; line-height: 1.7; padding: 16px; background-color: #252019; border-radius: 10px; border-left: 3px solid #F97316;">${safeMessage}</td>
                </tr>
              </table>

              <p style="color: #C4BBB3; font-size: 15px; line-height: 1.7; margin: 0 0 28px;">
                Enquanto isso, dá uma olhada nos meus projetos no portfolio. Quem sabe a gente não constrói algo incrível juntos!
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://andreruperto.dev" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #F97316, #E8553A); color: #110F0D; text-decoration: none; border-radius: 10px; font-size: 14px; font-weight: 600;">Ver Portfolio</a>
                  </td>
                </tr>
              </table>

              <!-- Assinatura -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 36px; border-top: 1px solid #332D29; padding-top: 24px;">
                <tr>
                  <td>
                    <p style="margin: 0; color: #FAF8F6; font-size: 15px; font-weight: 600;">André Ruperto</p>
                    <p style="margin: 4px 0 0; color: #F97316; font-size: 13px;">Desenvolvedor Full Stack & Cientista de Dados</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #1A1715; padding: 20px 40px; border: 1px solid #332D29; border-top: none; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0; color: #948C86; font-size: 12px;">
                <a href="https://andreruperto.dev" style="color: #F97316; text-decoration: none;">andreruperto.dev</a>
                &nbsp;&middot;&nbsp;
                <a href="mailto:contato@andreruperto.dev" style="color: #F97316; text-decoration: none;">contato@andreruperto.dev</a>
              </p>
              <p style="margin: 8px 0 0; color: #6B645E; font-size: 11px;">Este e um email automatico de confirmacao.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Auth Routes
app.post('/api/auth/login', loginLimiter, (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(
      { id: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, success: true });
  } else {
    res.status(401).json({ error: 'Senha incorreta' });
  }
});

// Admin Routes - Email Preview
app.get('/api/admin/email-preview/notification', authMiddleware, (req, res) => {
  const sampleData = {
    name: 'João Silva',
    email: 'joao@exemplo.com',
    subject: 'Orçamento para Desenvolvimento Web',
    message: 'Olá André,\n\nGostaria de conversar sobre um projeto de desenvolvimento web para minha empresa.\n\nO projeto envolve criar uma plataforma de e-commerce completa.\n\nAguardo seu retorno!'
  };

  res.send(buildNotificationEmail(sampleData));
});

app.get('/api/admin/email-preview/confirmation', authMiddleware, (req, res) => {
  const sampleData = {
    name: 'João Silva',
    email: 'joao@exemplo.com',
    subject: 'Orçamento para Desenvolvimento Web',
    message: 'Olá André,\n\nGostaria de conversar sobre um projeto de desenvolvimento web para minha empresa.\n\nO projeto envolve criar uma plataforma de e-commerce completa.\n\nAguardo seu retorno!'
  };

  res.send(buildConfirmationEmail(sampleData));
});

// API Routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(projects);
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    res.status(500).json({ error: 'Erro ao buscar projetos' });
  }
});

app.post('/api/projects', authMiddleware, async (req, res) => {
  try {
    const project = await prisma.project.create({
      data: req.body
    });
    res.json(project);
  } catch (error) {
    console.error('Erro ao criar projeto:', error);
    res.status(500).json({ error: 'Erro ao criar projeto' });
  }
});

app.put('/api/projects/:id', authMiddleware, async (req, res) => {
  try {
    const project = await prisma.project.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(project);
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    res.status(500).json({ error: 'Erro ao atualizar projeto' });
  }
});

app.delete('/api/projects/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.project.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Projeto deletado' });
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    res.status(500).json({ error: 'Erro ao deletar projeto' });
  }
});

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validação
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    if (name.length > 100 || subject.length > 200 || message.length > 5000) {
      return res.status(400).json({ error: 'Um ou mais campos excedem o tamanho máximo permitido' });
    }

    // 1. Enviar email de notificação para você (André)
    const { data: notificationData, error: notificationError } = await resend.emails.send({
      from: 'Portfolio <contato@andreruperto.dev>',
      to: ['contato@andreruperto.dev'],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: buildNotificationEmail({ name, email, subject, message })
    });

    if (notificationError) {
      console.error('Erro ao enviar email de notificação:', notificationError);
      return res.status(500).json({ error: 'Erro ao enviar mensagem' });
    }

    // 2. Enviar email de confirmação para quem enviou
    const { error: confirmationError } = await resend.emails.send({
      from: 'André Ruperto <contato@andreruperto.dev>',
      to: [email],
      subject: 'Recebi sua mensagem!',
      html: buildConfirmationEmail({ name, subject, message })
    });

    if (confirmationError) {
      console.error('Erro ao enviar email de confirmação:', confirmationError);
    }

    res.json({
      success: true,
      messageId: notificationData.id,
      confirmationSent: !confirmationError
    });
  } catch (error) {
    console.error('Erro ao processar contato:', error);
    res.status(500).json({ error: 'Erro ao enviar mensagem' });
  }
});

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../dist')));

// Handle React routing - CORRETO para Express 4
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 3001;
const ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`\n✓ Server running on port ${PORT} (${ENV})`);
  console.log(`✓ API: http://localhost:${PORT}/api`);
  console.log(`✓ Frontend: http://localhost:${PORT}\n`);
});
