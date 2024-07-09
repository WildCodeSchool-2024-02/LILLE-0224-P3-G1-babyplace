const argon2 = require("argon2");

const tables = require("../../database/tables");

const login = async (req, res) => {
  // Retrieve the info of the body
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

    // Retrieving User informations

    // Checking User informations
    if (!info) {
      // if the user doesn't exists
      return res.status(404).json({ message: "User not found" });
    }

    // Checking User password
    const verified = await argon2.verify(info[passwordField], userPassword);

    if (!verified) {
      // If it's a wrong password
      return res.status(401).json({ message: "Incorrect Password" });
    }

    // If the User is found
    return res.status(200).json({ message: "Login is successful", user: info });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occured", error });
  }
};

module.exports = login;
