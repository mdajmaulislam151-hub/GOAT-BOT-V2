module.exports.config = {
  name: "autoreact",
  version: "4.0.0",
  hasPermission: 0,
  credits: "ALVI | Modified by Ajmaul",
  description: "Auto react + auto delete bad words",
  commandCategory: "No Prefix",
  usages: "",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
  const { messageID, threadID, senderID } = event;
  if (!event.body || !messageID) return;

  const msg = event.body.toLowerCase();

  // ---------- WORD LISTS ----------
  const badWords = [
    "sex","fuck","porn","horny","xxx","xvideo",
    "bitch","dick","boob","nude","cum"
  ];

  const loveWords = [
    "love","baby","babe","bby","crush","cute","sweet"
  ];

  const sadWords = [
    "sad","pain","hurt","cry","lonely","depress","stress"
  ];

  const greetWords = [
    "good morning","gm","good night","gn","morning","night"
  ];

  const wowWords = [
    "wow","amazing","great","nice","awesome"
  ];

  const questionWords = [
    "?","why","what","how","kivabe","keno","ki"
  ];

  // ---------- MATCH FUNCTION ----------
  const match = (list) => list.some(word => msg.includes(word));

  // ---------- BAD WORD DELETE ----------
  if (match(badWords)) {
    try {
      await api.unsendMessage(messageID); // delete message
      return api.sendMessage(
        "⚠️ খারাপ ভাষা ব্যবহার করা যাবে না!",
        threadID
      );
    } catch (e) {
      console.log("Delete failed:", e);
    }
    return;
  }

  // ---------- REACTIONS ----------
  if (match(loveWords)) return api.setMessageReaction("😽", messageID, () => {});
  if (match(sadWords)) return api.setMessageReaction("🐥", messageID, () => {});
  if (match(greetWords)) return api.setMessageReaction("🌷", messageID, () => {});
  if (match(wowWords)) return api.setMessageReaction("🐣", messageID, () => {});
  if (match(questionWords)) return api.setMessageReaction("🎀", messageID, () => {});
};

module.exports.run = async function () {};
