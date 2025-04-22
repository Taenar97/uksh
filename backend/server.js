const express = require('express');
const createSchemaForAccount = require('./createMedicalSchema');

const app = express();
app.use(express.json());

app.post('/accounts', async (req, res) => {
  const { accountId } = req.body;

  if (!accountId) {
    return res.status(400).json({ error: 'Missing accountId' });
  }

  try {
    await createSchemaForAccount(accountId);
    res.status(201).json({ message: `Medical schema created for account ${accountId}` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create schema' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
