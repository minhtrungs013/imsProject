const emailModel = require("../models/email");
const statusCodes = require("http-status-codes");
const emailController = {
  sendMail: async (req, res) => {
    const emailRegex =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    const {
      interviewer,
      emailInterviewer,
      interviewDate,
      interviewTime,
      interviewLink,
      listCandidates,
    } = req.body;
    if (
      !emailInterviewer ||
      !interviewLink ||
      !interviewDate ||
      !interviewTime ||
      !interviewer
    ) {
      return res.status(400).json("Bạn cần nhập đủ các trường");
    }

    if (!emailRegex.test(emailInterviewer)) {
      return res.status(statusCodes.BAD_REQUEST).json({
        error: "Email người phỏng vấn không đúng định dạng",
      });
    }

    if (interviewLink.length < 10 || interviewLink.length > 255) {
      return res.status(statusCodes.BAD_REQUEST).json({
        message: `Tên người phỏng vấn không đủ chiều dài`,
      });
    }
    const dateNow = new Date();
    const dateRequest = new Date(
      interviewDate.slice(0, 4) +
        "/" +
        interviewDate.slice(5, 7) +
        "/" +
        interviewDate.slice(8, 10) +
        "," +
        interviewTime.slice(0, 2) +
        ":" +
        interviewTime.slice(3, 5)
    );

    if (dateRequest.getTime() < dateNow.getTime()) {
      return res.status(statusCodes.BAD_REQUEST).json({
        message: `Ngày phỏng vấn không thể nhỏ hơn ngày hiện tại`,
      });
    }

    if (interviewer.length < 10 || interviewer.length > 255) {
      return res.status(statusCodes.BAD_REQUEST).json({
        message: `Tên người phỏng vấn không đủ chiều dài`,
      });
    }
    // add person interview to array with candidate.
    listCandidates.push({
      emailCandidate: emailInterviewer,
      fullName: interviewer,
    });

    const sendMail = await emailModel.sendMail(
      listCandidates,
      emailInterviewer,
      interviewLink,
      interviewDate,
      interviewTime,
      interviewer
    );
    if (sendMail) {
      return res.status(200).json("Gửi mail thành công");
    }
    return res.status(400).json("Gửi mail lỗi");
  },
};
module.exports = emailController;
