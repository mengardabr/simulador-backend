const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Cadastro de usuário
app.post('/api/users', async (req, res) => {
  const { email, name } = req.body;
  try {
    const user = await prisma.user.create({ data: { email, name } });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: 'Usuário já existe ou erro de dados.' });
  }
});

// Novo diagnóstico
app.post('/api/diagnosis', async (req, res) => {
  const { userId, company, answers } = req.body;
  // Simulação simples de maturidade e ROI
  const maturity = Math.floor(Math.random() * 100);
  const roi = Math.random() * 10;
  const diagnosis = await prisma.diagnosis.create({
    data: { userId, company, answers, maturity, roi }
  });
  res.json(diagnosis);
});

// Listar diagnósticos
app.get('/api/diagnosis/:userId', async (req, res) => {
  const { userId } = req.params;
  const diagnoses = await prisma.diagnosis.findMany({ where: { userId: Number(userId) } });
  res.json(diagnoses);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));