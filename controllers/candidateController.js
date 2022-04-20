const candidateModel = require("../models/candidate");
const statusCodes = require("http-status-codes");

const update = async (req, res) => {
  const id = req.params.id;
  const emailRegex =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  const {
    emailInterviewer,
    interviewLink,
    interviewDate,
    interviewTime,
    interviewer,
  } = req.body;
  if (
    !emailInterviewer ||
    !interviewLink ||
    !interviewDate ||
    !interviewTime ||
    !interviewer
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: "Bạn cần nhập đủ thông tin" });
  }

  if (!emailRegex.test(emailInterviewer)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: "Định dang mail không hợp lệ",
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
      message: `Ngày phỏng vấn không được nhỏ hơn ngày hiện tại`,
    });
  }
  if (interviewLink.length < 5 || interviewLink.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `Chiều dài link phỏng vấn không đủ`,
    });
  }

  const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
  const checkForSpecialChar = function (string) {
    for (i = 0; i < specialChars.length; i++) {
      if (string.indexOf(specialChars[i]) > -1) {
        return true;
      }
    }
    return false;
  };

  if (checkForSpecialChar(interviewer)) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: `Tên người phỏng vấn không chứa ký tự đặt biệt ` });
  }
  if (interviewer.length < 2 || interviewer.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `Chiều dài tên người phỏng vấn không đủ`,
    });
  }

  const result = await candidateModel.update({
    emailInterviewer: emailInterviewer,
    interviewLink: interviewLink,
    interviewDate: interviewDate,
    interviewTime: interviewTime,
    interviewer: interviewer,
    idCandidate: id,
  });

  return res.status(statusCodes.OK).json({
    data: result,
    message: result ? "Cập nhật thành công" : "Cập nhật thất bại",
  });
};

module.exports = { update: update };
