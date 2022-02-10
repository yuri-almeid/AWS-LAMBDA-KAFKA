const { Kafka } = require('kafkajs')

const CONFIG = {
  'topic': 'OPEN_TOPIC',
  'bootstrap.servers': process.env.BOOTSTRAP_SERVERS,
  'sasl.username': process.env.SASL_USERNAME,
  'sasl.password': process.env.SASL_PASSWORD,
  'security.protocol': process.env.SECURITY_PROTOCOL,
  'sasl.mechanisms': process.env.SASL_MECHANISMS,
  'session.timeout.ms': process.env.SESSION_TIMEOUT
}

async function getAccess(event, context) {

  const kafka = new Kafka({
    clientId: 'LAMBDA',
    brokers: [CONFIG['bootstrap.servers']],
    ssl: true,
    sasl: {
      mechanism: CONFIG['sasl.mechanisms'],
      username: CONFIG['sasl.username'],
      password: CONFIG['sasl.password']
    },
  });
  
  const USER = JSON.parse(event.body);
  const USER_ = JSON.stringify(USER, null, '\t');

  const producer = kafka.producer();
  await producer.connect();

  await producer.send({
    topic: CONFIG.topic,
    messages: [
        {   
            key: USER.cod,
            value: USER_
        },
    ]
  });

  await producer.disconnect();

  const responseBody = {
    messageStatus: "sent Sucessfully",
    clientId: 'AWS-LAMBDA-KAFKA',
    topic: CONFIG.topic,
    key: USER.cod,
    value: USER
  };


  return {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
}

export const handler = getAccess;

