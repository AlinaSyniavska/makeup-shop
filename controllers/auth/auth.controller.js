const {passwordService, tokenService, emailService} = require("../../services");
const {OAuth, ActionToken, User} = require("../../dataBase");
const {emailActionEnum} = require("../../constants");


module.exports = {
  login: async (req, res, next) => {
    try {
      const { password: hashPassword, _id } = req.user;
      const { password } = req.body;

      await passwordService.comparePassword(hashPassword, password);

      const tokens = tokenService.generateAuthTokens();

      await OAuth.create({
        userId: _id,
        ...tokens,
      });

      res.json({
        user: req.user,
        ...tokens,
      });
    } catch (e) {
      next(e);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { userId, refresh_token } = req.tokenInfo;

      await OAuth.deleteOne({ refresh_token });

      const tokens = tokenService.generateAuthTokens();

      await OAuth.create({
        userId,
        ...tokens,
      });

      res.json(tokens);
    } catch (e) {
      return next(e);
    }
  },

  logout: async (req, res, next) => {
    try {
      // const { access_token } = req;
      // const { email, name } = user;
      const { access_token } = req;

      await OAuth.deleteOne({ access_token });

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },

  logoutAllDevices: async (req, res, next) => {
    try {
      // const { _id, email, name } = req.user;
      const { _id } = req.user;

      const { deletedCount } = await OAuth.deleteMany({ userId: _id });
      console.log(deletedCount);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },

  forgotPassword: async (req, res, next) => {
    try {
      const { _id, name, email } = req.user;
      const token = tokenService.generateActionToken(emailActionEnum.FORGOT_PASSWORD, {
        name,
        _id,
      });

      await ActionToken.create({
        userId: _id,
        token,
        actionType: emailActionEnum.FORGOT_PASSWORD,
      });

      // await emailService.sendMail(email, emailActionEnum.FORGOT_PASSWORD, {userName: name, token}); //real code
      await emailService.sendMail('alina22syniavska@gmail.com', emailActionEnum.FORGOT_PASSWORD, {
        userName: name,
        token,
      }); //test code

      res.json('Ok');
    } catch (e) {
      next(e);
    }
  },

  setForgotPassword: async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { password } = req.body;

      const hashedPassword = await passwordService.hashPassword(password);

      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { password: hashedPassword },
        { new: true }
      );
      await ActionToken.deleteOne({ actionType: emailActionEnum.FORGOT_PASSWORD, userId: _id });

      res.json(updatedUser);
    } catch (e) {
      next(e);
    }
  },
};
