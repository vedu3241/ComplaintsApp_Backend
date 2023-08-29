const User = require("../models/user");
function authController() {
  return {
    async register(req, res) {
      const user = await User.findOne({ email: req.body.email });

      if (user == null) {
        const user = User({
          email: req.body.email,
          password: req.body.password,
        });

        user
          .save()
          .then((user) => {
            res.status(200).json({ message: "Registered successfully!!" });
          })
          .catch((err) => {
            res.status(401).json({ message: "Registration failed!!" });
          });
      } else {
        res.status(409).json({ message: "Email already Exist!" });
      }
    },

    async login(req, res) {
      const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
      });

      if (user) {
        const userId = user._id;
        res
          .status(200)
          .json({ message: "Login successful DB", userId: userId });
      } else {
        res.status(401).json({ message: "Login failed" });
      }
    },
  };
}

module.exports = authController;
