const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

module.exports = {
  config: {
    name: "pp",
    version: "2.0.0",
    author: "Ajmaul",
    countDown: 3,
    role: 0,
    shortDescription: "Facebook profile picture 📸",
    longDescription: "Reply / mention / link দিয়ে profile pic দেখাবে",
    category: "utility",
    guide: {
      en: "{pn} [reply/@mention/link]"
    }
  },

  onStart: async function ({ api, event, args, usersData }) {
    try {
      const cacheDir = path.join(__dirname, "cache");
      const filePath = path.join(cacheDir, "pp.png");

      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir);
      }

      let uid;

      if (event.type === "message_reply") {
        uid = event.messageReply.senderID;
      } 
      else if (Object.keys(event.mentions || {}).length > 0) {
        uid = Object.keys(event.mentions)[0];
      } 
      else if (args[0] && args[0].includes("facebook.com")) {
        uid = await api.getUID(args[0]);
      } 
      else {
        uid = event.senderID;
      }

      const name = await usersData.getName(uid);

      const url = `https://graph.facebook.com/${uid}/picture?width=2048&height=2048`;

      // 🔥 important fix এখানে
      const res = await axios.get(url, { responseType: "arraybuffer" });

      fs.writeFileSync(filePath, Buffer.from(res.data, "utf-8"));

      if (!fs.existsSync(filePath)) {
        return api.sendMessage("❌ ছবি লোড হয় নাই!", event.threadID, event.messageID);
      }

      return api.sendMessage(
        {
          body: `🌸✨ ${name} এর প্রোফাইল পিকচার 👇`,
          attachment: fs.createReadStream(filePath)
        },
        event.threadID,
        () => fs.unlinkSync(filePath),
        event.messageID
      );

    } catch (err) {
      console.error(err);
      api.sendMessage("⚠️ Error হয়েছে! আবার চেষ্টা করো 😭", event.threadID, event.messageID);
    }
  }
};
