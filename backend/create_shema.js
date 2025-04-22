const fs = require('fs');
const path = require('path');
const db = require('./db');

async function createSchemaForAccount(accountId) {
  const schemaName = `acc_${accountId}`;

  // Read template SQL
  const templateSql = fs.readFileSync(path.join(__dirname, 'schema-template.sql'), 'utf8');

  // Start a transaction
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    // Create the schema
    await client.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName};`);

    // Set search_path to the new schema
    await client.query(`SET search_path TO ${schemaName};`);

    // Execute the template SQL
    await client.query(templateSql);

    await client.query('COMMIT');
    console.log(`Schema ${schemaName} created successfully.`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(`Failed to create schema ${schemaName}:`, err);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = createSchemaForAccount;
