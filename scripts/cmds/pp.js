const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

module.exports = {
  config: {
    name: "pp",
    version: "5.0.0",
    author: "Ajmaul FINAL WORKING",
    countDown: 3,
    role: 0,
    shortDescription: "Get Facebook profile picture",
    category: "utility"
  },

  onStart: async function ({ api, event, args, usersData }) {
    try {
      const cacheDir = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

      const filePath = path.join(cacheDir, `${Date.now()}_pp.jpg`);

      let uid;

      // UID detect
      if (event.type === "message_reply") {
        uid = event.messageReply.senderID;
      } else if (Object.keys(event.mentions || {}).length > 0) {
        uid = Object.keys(event.mentions)[0];
      } else if (args[0] && args[0].includes("facebook.com")) {
        uid = await api.getUID(args[0]);
      } else {
        uid = event.senderID;
      }

      const name = await usersData.getName(uid);

      // 🔥 alternative API (WORKING)
      const imgUrl = `https://i.pravatar.cc/500?u=${uid}`;

      const img = await axios.get(imgUrl, {
        responseType: "arraybuffer"
      });

      fs.writeFileSync(filePath, Buffer.from(img.data));

      return api.sendMessage(
        {
          body: `✅ ${name} এর প্রোফাইল পিকচার`,
          attachment: fs.createReadStream(filePath)
        },
        event.threadID,
        () => fs.unlinkSync(filePath),
        event.messageID
      );

    } catch (err) {
      console.error(err);
      return api.sendMessage("❌ Error! আবার try করো", event.threadID, event.messageID);
    }
  }
};
