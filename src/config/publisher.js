import { getChannel } from "./rabbitmq.js";
import consumeNotifications from "./consume.js";
const QUEUE_NAME = "notification_queue";

const sendNotification = async (message) => {
  try {
    const channel = await getChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: false });

    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
    console.log(`Sent contact data: ${JSON.stringify(message)}`);
  } catch (error) {
    console.error("Error:", error);
  }
};

consumeNotifications();

export default sendNotification;