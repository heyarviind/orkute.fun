import { wrapInEmailTemplate } from "../../util/";

export function sendEmail({
  to,
  subject,
  message,
  from = "arvind@orkute.fun",
}) {
  return fetch("https://api.transmail.co.in/v1.1/email", {
    method: "post",
    headers: {
      Authorization: `Zoho-enczapikey ${process.env.ZOHO_MAIL_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      bounce_address: "trash@bounce.heyspoil.me",
      from: {
        address: from,
        name: "HeySpoil.me",
      },
      to: [{ email_address: { address: to } }],
      subject: subject,
      htmlBody: wrapInEmailTemplate(message),
    }),
  })
    .then((result) => result.json())
    .then((data) => {
      return Promise.resolve(data);
    });
}
