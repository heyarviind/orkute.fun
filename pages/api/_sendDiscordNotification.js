import axios from "axios";

export default function sendDiscordNotification(data) {
  const webhookURL = process.env.DISCORD_WEBHOOK_URL;

  axios({
    method: "post",
    url: webhookURL,
    data,
  });
}