require("dotenv").config();
dbURL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.78nqw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
module.exports = {
  mongoURI: dbURL,
};
