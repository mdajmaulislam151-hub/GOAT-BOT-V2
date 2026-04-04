module.exports.config = {
  name: "autoreact",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Ajmaul",
  description: "React with many emojis only to owner's messages",
  commandCategory: "system",
  usages: "",
  cooldowns: 0
};

// তোমার Facebook UID already বসানো
const OWNER_ID = "61588349794704";

module.exports.handleEvent = async function ({ api, event }) {
  const { messageID, senderID } = event;

  // শুধু তোমার message এ react করবে
  if (senderID !== OWNER_ID) return;

  const emojis = [
    "😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇",
    "🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚",
    "😋","😛","😝","😜","🤪","🤨","🧐","🤓","😎","🥳",
    "😏","😒","😞","😔","😟","😕","🙁","☹️","😣","😖",
    "😫","😩","🥺","😢","😭","😤","😠","😡","🤬","🤯",
    "😳","🥵","🥶","😱","😨","😰","😥","😓","🤗","🤔",
    "🤭","🤫","🤥","😶","😐","😑","😬","🙄","😯","😦",
    "😧","😮","😲","🥱","😴","🤤","😪","😵","🤐","🥴",
    "🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠","😈","👿",
    "👹","👺","💀","☠️","👻","👽","🤖","🎃","😺","😸",
    "😹","😻","😼","😽","🙀","😿","😾",
    "❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔",
    "❣️","💕","💞","💓","💗","💖","💘","💝","💟",
    "👍","👎","👏","🙌","🙏","🤝","👋","🤟","👌","✌️",
    "🤘","👈","👉","👆","👇","☝️","✊","👊","🤛","🤜"
  ];

  try {
    for (const emoji of emojis) {
      await api.setMessageReaction(emoji, messageID, () => {}, true);
    }
  } catch (e) {
    console.log("AutoReact Error:", e);
  }
};
