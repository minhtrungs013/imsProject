# imsProject
npm i body-parser cookie-parser cors dotenv express jsonwebtoken md5 multer mysql nodemailer nodemon
tạo .env -> 
DB_HOST= localhost
DB_USER= root
DB_PASS=
DB_NAME= internship
DB_PORT= 3306
ACCESS_TOKEN_SECRET= jwttoken
adminEmail = dominhtrung2k@gmail.com
adminPassword = qzhuqsixihqonach
mailHost = smtp.gmail.com
mailPort = 465
PORT = 5000
update  db-migrate
 npm i db-migrate 
 npm i  db-migrate-mysql

 câu lệnh 
 up bảng lên:  db-migrate up
 up csdl lên: db-migrate up:seeds
 down bảng xuống:  db-migrate down -c 7
 down bảng xuống:  db-migrate down:seeds



