const fs = require("fs");
const LimitSizeStream = require("./LimitSizeStream");

const limitedStream = makeLimitSizeStream({
  limit: 8,
  encoding: "utf-8",
}); // 8 байт
const outStream = fs.createWriteStream("out.txt");

limitedStream.on("data", console.log);

limitedStream.pipe(outStream);

limitedStream.write("hello"); // 'hello' - это 5 байт, поэтому эта строчка целиком записана в файл

setTimeout(() => {
  limitedStream.write("world"); // ошибка LimitExceeded! в файле осталось только hello
}, 1000);
