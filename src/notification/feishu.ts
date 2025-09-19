/**
 * Send a message to Feishu
 * @param message The message to send
 */
export async function sendMessageToFeishu(
  message: string
): Promise<void> {
  try {
    const webhookUrl = process.env.FEISHU_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn(
        'FEISHU_WEBHOOK_URL is not set, skipping Feishu notification'
      );
      return;
    }

    // Format the message
    const payload = {
      msg_type: 'text',
      content: {
        text: message,
      },
    };

    // Send the webhook request
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(
        `<< Failed to send Feishu notification:`,
        response
      );
    }

    console.log(
      `<< Successfully sent Feishu notification`
    );
  } catch (error) {
    console.error('<< Failed to send Feishu notification:', error);
    
  }
}
