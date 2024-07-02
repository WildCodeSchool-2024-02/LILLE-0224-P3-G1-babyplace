const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

// eslint-disable-next-line consistent-return
const hashPassword = async (req, res, next) => {
  try {
    const { parentPassword, moderatorPassword, nurseryPassword } = req.body;

    // Hashed password verification
    let passwordToHash;
    if (parentPassword) {
      passwordToHash = parentPassword;
    } else if (moderatorPassword) {
      passwordToHash = moderatorPassword;
    } else if (nurseryPassword) {
      passwordToHash = nurseryPassword;
    } else {
      // No password entered
      return res.status(400).send("No password provided");
    }

    const hashedPassword = await argon2.hash(passwordToHash, hashingOptions);

    // Add the hashed password and remove the original password
    if (parentPassword) {
      req.body.parent_hashedPassword = hashedPassword;
      delete req.body.parentPassword;
    } else if (moderatorPassword) {
      req.body.moderator_hashedPassword = hashedPassword;
      delete req.body.moderatorPassword;
    } else if (nurseryPassword) {
      req.body.nursery_hashedPassword = hashedPassword;
      delete req.body.nurseryPassword;
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = hashPassword;
