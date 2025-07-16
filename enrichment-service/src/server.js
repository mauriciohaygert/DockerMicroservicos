const app = require('./app');
const connectDB = require('./config/db');
const { startConsumerWithRetry } = require('./consumers/userCreated');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Enrichment Service running on port ${PORT}`);
    });
    startConsumerWithRetry().catch(console.error);
  } catch (err) {
    console.error('Failed to start service:', err);
    process.exit(1);
  }
}

start();
