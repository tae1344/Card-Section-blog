// Deploy(배포) 한 후, production 비밀 설정 파일 관리
const username = "taeyeon";
const password = "aksemr123";

module.exports = {
  // mongoURI: process.env.MONGO_URI // heroku 에서 설정해주면 됨
  mongoURI: `mongodb+srv://${username}:${password}@boilerplate.o8zxo.mongodb.net/?retryWrites=true&w=majority`
}
