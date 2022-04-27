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
      .json({ error: candidateModel.ErrorRequest });
  }

  if (!emailRegex.test(emailInterviewer)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ErrorEmail,
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
      error: candidateModel.ErrorInterviewDate,
    });
  }
  if (interviewLink.length < 2 || interviewLink.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ErrorInterviewLink,
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
      .json({ error: candidateModel.ErroSpecialChars });
  }
  if (interviewer.length < 2 || interviewer.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ErrorInterviewer,
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
    message: result ? candidateModel.Success : candidateModel.Failure,
  });
};

module.exports = { update: update };
