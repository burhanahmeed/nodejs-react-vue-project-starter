import { MailtrapClient } from "mailtrap"

/**
 * For this example to work, you need to set up a sending domain,
 * and obtain a token that is authorized to send from the domain.
 */

const TOKEN: string = process.env.MAILTRAP_TOKEN || 'some-token';
export const SENDER_EMAIL = process.env.MAILTRAP_SENDER_EMAIL || "<SENDER@YOURDOMAIN.COM>";
export const SENDER_NAME = process.env.MAILTRAP_SENDER_NAME || "SENDER NAME";

const client = new MailtrapClient({ token: TOKEN });

export default client;
