const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const sendMail = (email, subject, name, mentor, reviewtime, meetingUrl) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.mailHost,
    port: process.env.mailPort,
    secure: true,
    auth: {
      user: process.env.adminEmail,
      pass: process.env.adminPassword,
    },
  });
  let content = 'BEGIN:VCALENDAR\n' +
  'VERSION:2.0\n' +
  'BEGIN:VEVENT\n' +
  'SUMMARY:Meeting\n' +
  `DTSTART;VALUE=DATE:20224080\n` +
  'DTEND;VALUE=DATE:20224090\n' +
  'LOCATION:Webex \n' +
  'DESCRIPTION:Description123\n' +
  'STATUS:CONFIRMED\n' +
  'SEQUENCE:3\n' +
  'BEGIN:VALARM\n' +
  'TRIGGER:-PT10M\n' +
  'DESCRIPTION:Description123\n' +
  'ACTION:DISPLAY\n' +
  'END:VALARM\n' +
  'END:VEVENT\n' +
  'END:VCALENDAR';
  const options = {
    from: process.env.adminEmail,
    to: email,
    subject: subject,
    html: `<h3 style="color: red;"> Xin chào ${name}</h3>
    <p>Như đã qua trao đổi bằng điện thoại, chúng tôi xin mời bạn đến với cuộc phỏng vấn chi tiết với trưởng dự án bằng link dưới đây.</p>
    <ul>
      <li>Thời gian: ${reviewtime} PM</li>
      <li>Cuộc họp: <a href=${meetingUrl}>${meetingUrl}</a></li>
      <li>Người phỏng vấn: <a href="#">${mentor}</a></li>
    </ul>
    <p>Vui lòng xác nhận nếu bạn nhận được email này. Nếu bạn có bất kì câu hỏi nào, chỉ cần liên hệ với chúng tôi qua.<br> 
      Hotline: <a href="#">0977.465.083</a> 
      <br>  
      Email: intern-binhdinh@tma.com.vn | Website: www.tma-binhdinh.vn
    </p>
  `, 
  icalEvent: {
    contentType: "text/calendar; method=REQUEST; name='meeting.ics';component=VEVENT",
    content: content,
    contentEncoding:"Base64",
    "Content-Class":"urn:content-classes:calendarmessage"
  }
  };
  return transporter.sendMail(options, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json({ message: "ok nha" });
    }
  });
};
module.exports = {
  sendMail: sendMail,
};