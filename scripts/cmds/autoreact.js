module.exports.config = {
  name: "autoreact",
  version: "5.0.0",
  hasPermission: 0,
  credits: "ALVI | Modified by Ajmaul",
  description: "Auto delete bad words only",
  commandCategory: "No Prefix",
  usages: "",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
  const { messageID, threadID } = event;
  if (!event.body || !messageID) return;

  const msg = event.body.toLowerCase();

  // ---------- BAD WORD LIST ----------
  const badWords = [
    "sex","fuck","porn","horny","xxx","xvideo",
    "bitch","dick","boob","nude","cum"
  ];

  // ---------- MATCH FUNCTION ----------
  const containsBadWord = badWords.some(word => msg.includes(word));

  // ---------- DELETE MESSAGE ----------
  if (containsBadWord) {
    try {
      await api.unsendMessage(messageID);

      return api.sendMessage(
        "⚠️ খারাপ ভাষা ব্যবহার করা যাবে না!",
        threadID
      );

    } catch (err) {
      console.log("Delete failed:", err);
    }
  }
};

module.exports.run = async function () {};
