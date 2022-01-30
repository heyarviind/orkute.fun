import validator from "validator";
import initDB from "../_mongodb";
import { User } from "../../../models/";
import dayjs from "dayjs";
import randomstring from "randomstring";
import { sendEmail } from "../_zohoEmailClient";
import sendDiscordNotification from "../_sendDiscordNotification.js";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  const data = req.body;

  let errors = [];
  let isEmailAlreadyExists = [];
  let isUsernameAlreadyExists = [];

  // validate data
  if (data.email) {
    if (!validator.isEmail(data.email)) {
      errors.push("Invalid email");
    }
  }

  // if (!data.password || data.password.length < 3 || data.password.length > 50) {
  //   errors.push("Invalid password length");
  // }

  if (!data.username || data.username.length < 3 || data.username.length > 50) {
    errors.push("Invalid username length");
  }

  await initDB();

  isEmailAlreadyExists = await User.find({ email: data.email }).exec();
  console.log(isEmailAlreadyExists);
  if (isEmailAlreadyExists.length > 0) {
    errors.push("Email already exist! Please use another email");
  }

  isUsernameAlreadyExists = await User.find({
    username: data.username,
  }).exec();
  if (isUsernameAlreadyExists.length > 0) {
    errors.push("Username already exist! Please use another username");
  }

  if (errors.length == 0) {

    const user = new User();

    user.email = data.email;
    user.username = data.username;
    user.secretKey = randomstring.generate(28);
    // user.password = bcrypt.hashSync(data.password, 10);
    user.sentConfirmationEmailCount = 1;

    user
      .save()
      .then(async (response) => {
        if (data.email) {
          const message = `
          Hey, <br><br>
          Click on the link to verify your email address: <a href="https://orkute.fun/api/user/verify-email?s=${response.secretKey}&id=${response._id}">Verify Email</a> <br><br>
          If you think this is not for you, please ignore. <br><br>
          Best,<br>
          Orkute
        `;

          // sendEmail({
          //   to: data.email,
          //   subject: "Verify your email",
          //   message: message,
          // }).then((response) => {});

          sendDiscordNotification({
            content: `🐣 New User ${data.email} - username: ${data.username}`,
          });
        }
        // send confirmation code to the email

        return res.status(200).json(response);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } else {
    return res.status(400).json({
      type: "error",
      message: errors[0],
    });
  }
}
