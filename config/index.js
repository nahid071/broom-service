const mongoose = require("mongoose");
const Pusher = require("pusher");
const config = {};

// pusher
config.pusher = new Pusher({
  appId: "1188443",
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "ap2",
  useTLS: true,
});

// DB Connection
config.__db_conect = () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    const db = mongoose.connection;

    db.once("open", () => {
      console.log(`Mongodb Connected`);
      // collections
      //const analiticsChangeStream = db.collection("analitics").watch();

      //   analiticsChangeStream.on("change", (change) => {
      //     // Update
      //     if (change.operationType == "insert") {
      //       const doc = change.fullDocument;
      //       pusher.trigger("analitics", "insert", {
      //         ...doc,
      //       });
      //     }
      //   });
    });
  } catch (error) {}
};

module.exports = config;
