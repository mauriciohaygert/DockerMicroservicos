const amqp = require('amqplib');
const EnrichedUser = require('../models/EnrichedUser');

async function startConsumer() {
  const queue = process.env.RABBITMQ_QUEUE || 'user.created';
  const conn = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
  const channel = await conn.createChannel();
  await channel.assertQueue(queue, { durable: true });
  console.log(`[*] Waiting for messages in ${queue}`);

  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      console.log('Mensagem recebida:', msg.content.toString());
      try {
        const { uuid, name } = JSON.parse(msg.content.toString());
        if (!uuid || !name) {
          console.error('Mensagem inválida recebida:', msg.content.toString());
          channel.nack(msg, false, false);
          return;
        }
        const username = name.toLowerCase().replace(/[^a-z0-9]/g, '');
        const linkedin = `linkedin.com/in/${username}`;
        const github = `github.com/${username}`;
        await EnrichedUser.findOneAndUpdate(
          { uuid },
          { linkedin, github },
          { upsert: true, new: true }
        );
        channel.ack(msg);
        console.log(`Usuario enriquecido: ${uuid}`);
      } catch (err) {
        console.error('Erro processando mensagem:', err);
        channel.nack(msg, false, false);
      }
    }
  });
}

async function startConsumerWithRetry(retries = 5, delay = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      await startConsumer();
      return;
    } catch (err) {
      console.error(`Erro ao conectar ao RabbitMQ (tentativa ${i + 1}/${retries}):`, err.message);
      if (i < retries - 1) {
        await new Promise(res => setTimeout(res, delay));
      } else {
        throw err;
      }
    }
  }
}

module.exports = { startConsumerWithRetry };
