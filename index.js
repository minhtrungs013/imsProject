const express = require("express");
const app = express();
const dotenv = require("dotenv");

const cors = require("cors");

app.use(cors());
const { requireToken } = require("./middleware/index");

const authRoute = require("./routers/auth");
const courseRoute = require("./routers/course");
const candidate = require("./routers/candidate");
const email = require("./routers/email");
const mentor = require("./routers/mentor");
const importCandidate = require("./routers/import");
const dg = require("./routers/dg");
const internview = require("./routers/internview");
const internship = require("./routers/internship");
dotenv.config();
const port = process.env.PORT;
global.__basedir = __dirname + "/..";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.use(authRoute);
app.use(requireToken, courseRoute);
app.use(requireToken, candidate);
app.use(requireToken, mentor);
app.use(requireToken, importCandidate);
app.use(requireToken, email);
app.use(requireToken, internview);
app.use(requireToken, dg);
app.use(requireToken, internship);


// lấy ra các phẩn tử chẵn trong mảng
// var array = [2,3,5,6,8,9];
// for(let i = 0; i < array[i]; i++){
//   if(array[i] % 2 === 0){
//     console.log(array[i])
//   }
// }
// sắp xếp mảng tăng dần bằng vòng for
// var array = [1, 2, 3, 13, 4, 6, 22, 8];
// //  dùng sort
// array.sort( (a,b) => a-b)
// array.at(-1)
// console.log(array.at(-1))
// var tg;
// var n = array.length;
// var i, j;
// for (i = 0; i <= n; i++) {
//   for (j = i + 1; j <= n; j++) {
//     // thay dấu mũi tên < or >
//     if (array[i] > array[j]) {
//       tg = array[i];
//       array[i] = array[j];
//       array[j] = tg;
//     }
//   }
// }
// for (i = 0; i < n; i++) {
//   console.log(array[i]);
// }
// console.log("số lớn nhất : ",array.at(-1));

// var ar1 = [10, 20, 20, 10, 10, 30, 50, 10, 20] 
// //  tính tổng của mảng
// var tt = 0;
// for (var values of ar1) {
//   tt += values
// }
// var sum = 0;
// for(let i = 0 ; i < ar1[i]; i++) {
//   sum += ar1[i]
// }

// console.log(ar1.reduce(function(se, value) {
//   return se + value
// }))
// console.log(tt)
// console.log(sum)
// function countPairs(ar) {
//   var obj = {};

//   ar.forEach(item => {
//     console.log("a1",item);
//     obj[item] = obj[item] ? obj[item] + 1 : 1;
//     console.log("a",obj[item]);
//   });
//   console.log(Object.values(obj));
//   return Object.values(obj).reduce((acc, curr) => {
//     console.log("sấ",curr / 2)
//     acc += Math.floor(curr / 2)
//     console.log("sss",acc);
//     return acc;
//   }, 0);
// }
// console.log(countPairs(ar1))

// const number = 99;
// let sum = 0;
// let temp = number;

// while (temp > 0) {
//     // finding the one's digit
//     let sodu = temp % 10;
//     // sum += sodu *  sodu *  sodu;
//     sum = sum*10+ sodu
//     // removing last digit from the number
//     temp = parseInt(temp / 10); // convert float into integer
// }
// // check the condition
// if (sum == number) {
//     console.log(`${number} is an Armstrong number`);
// }
// else {
//     console.log(`${number} is not an Armstrong number.`);
// }





// function palindrome(str) {
//   var re = /[\W_]/g;
//   var lowRegStr = str.toLowerCase().replace(re, '');
//   console.log(lowRegStr)
//   var reverseStr = lowRegStr.split('').reverse().join(''); 
//   console.log(reverseStr)

//   return reverseStr === lowRegStr;
// }
// console.log(palindrome("A man, a plan, a canal. Panama"))





app.listen(port, () => {
  console.log("App start success");
});
