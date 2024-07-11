/* eslint-disable camelcase */
const argon2 = require("argon2");

const hashingOptions = {
  ty_pe: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

// eslint-disable-next-line consistent-return
const hashPassword = async (req, res, next) => {
  try {
    const { parent_password, moderator_password, nursery_password } = req.body;

    // Hashed _password verification
    let passwordToHash;
    if (parent_password) {
      passwordToHash = parent_password;
    } else if (moderator_password) {
      passwordToHash = moderator_password;
    } else if (nursery_password) {
      passwordToHash = nursery_password;
    } else {
      // No password entered
      return res.status(400).send("No password provided");
    }

    const hashedPassword = await argon2.hash(passwordToHash, hashingOptions);

    // Add the hashed password and remove the original _password
    if (parent_password) {
      req.body.parent_hashedPassword = hashedPassword;
      delete req.body.parent_password;
    } else if (moderator_password) {
      req.body.moderator_hashedPassword = hashedPassword;
      delete req.body.moderator_password;
    } else if (nursery_password) {
      req.body.nursery_hashedPassword = hashedPassword;
      delete req.body.nursery_password;
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = hashPassword;
