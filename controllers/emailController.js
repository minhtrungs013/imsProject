const emailModel = require("../models/emailModel");

const emailController = {
  sendMail: async (req, res) => {
    try {
      const { email, subject, name, mentor, reviewtime, meetingUrl } = req.body;
      if (
        !email ||
        !subject ||
        !name ||
        !mentor ||
        !reviewtime ||
        !meetingUrl
      ) {
        return res.status(400).json("You need to fill in all required fields ");
      }
      await emailModel.sendMail(
        email,
        subject,
        name,
        mentor,
        reviewtime,
        meetingUrl
      );
      res.status(200).json("success");
    } catch (error) {
      res.send(error);
    }
  },
};
module.exports = emailController;