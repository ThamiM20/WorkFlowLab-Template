import { websiteConfig } from '@/config/website';
import { defaultMessages } from '@/i18n/messages';
import { getBaseUrl } from '@/lib/urls/urls';

/**
 * Send a message to Discord
 * @param message The message to send
 */
export async function sendMessageToDiscord(
  message: string
): Promise<void> {
  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn(
        'DISCORD_WEBHOOK_URL is not set, skipping Discord notification'
      );
      return;
    }

    // Format the message
    const payload = {
      // You can customize these values later
      username: `${defaultMessages.Metadata.name} Bot`,
      avatar_url: `${getBaseUrl()}${websiteConfig.metadata?.images?.logoLight}`,
      content: message,
      timestamp: new Date().toISOString(),
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
        `<< Failed to send Discord notification:`,
        response
      );
    }

    console.log(
      `<< Successfully sent Discord notification`
    );
  } catch (error) {
    console.error('<< Failed to send Discord notification:', error);
    
  }
}
