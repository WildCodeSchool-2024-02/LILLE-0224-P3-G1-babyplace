const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

const login = async (req, res) => {
  // Getting authentication's request body
  try {
    const { role } = req.body;

    let userMail;
    let userPassword;
    let passwordField;
    let info;

    if (role === "parent") {
      userMail = req.body.parent_mail;
      userPassword = req.body.parent_password;
      passwordField = "parent_password";
      info = await tables.parent.readByEmail(userMail);
    } else if (role === "nursery") {
      userMail = req.body.nursery_mail;
      userPassword = req.body.nursery_password;
      passwordField = "nursery_password";
      info = await tables.nursery.readByEmail(userMail);
    } else if (role === "moderator") {
      userMail = req.body.moderator_mail;
      userPassword = req.body.moderator_password;
      passwordField = "moderator_password";
      info = await tables.moderator.readByEmail(userMail);
    } else {
      return res.status(400).json({ message: "User not found" });
    }
    // Checking User informations
    if (!info) {
      // if the user doesn't exist
      return res.status(404).json({
        message:
          "Compte et/ou mot de passe incorrect.\n Vérifiez vos informations, ou inscrivez-vous en cliquant sur le lien ci-dessous.",
      });
    }

    // Checking User password
    const verified = await argon2.verify(info[passwordField], userPassword);

    if (!verified) {
      // If it's a wrong password
      return res.status(401).json({
        message:
          "Adresse e-mail et/ou mot de passe incorrect.\n Vérifiez vos informations, ou inscrivez-vous en cliquant sur le lien ci-dessous.",
      });
    }

    // Token generation
    const token = jwt.sign({ info }, process.env.APP_SECRET, {
      expiresIn: "1h",
    });

    // Setting the token in a cookie
    const cookieOptions = {
      httpOnly: true, // Preventing JS from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Cookie is only sent in https in production
      sameSite: "strict", // Preventing the CSRF attacks
      maxAge: 60 * 60 * 1000, // Time of validity
    };

    // Set the cookie using the options
    res.cookie("token", token, cookieOptions);
    // If the User is found and the password is correct, send user infos
    return res.status(200).json({
      message: "Login is successful",
      user: info,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:
        "Adresse e-mail et/ou mot de passe incorrect.\n Vérifiez vos informations, ou inscrivez-vous en cliquant sur le lien ci-dessous",
      error,
    });
  }
};

module.exports = login;
