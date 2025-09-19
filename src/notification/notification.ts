import { sendMessageToDiscord } from './discord';
import { sendMessageToFeishu } from './feishu';

/**

* Send a notification
 * @param message The message to send
 */
export async function sendNotification(
  message: string
): Promise<void> {
  console.log('sendNotification', message);

  // Send message to Discord channel
  // await sendMessageToDiscord(message);

  // Send message to Feishu group
  // await sendMessageToFeishu(message);
}
