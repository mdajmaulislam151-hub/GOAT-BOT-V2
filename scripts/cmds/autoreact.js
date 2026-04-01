module.exports.config = {
    name: "autoreact",
    version: "3.1.0",
    author: "Ajmaul",
    role: 0,
    description: "Auto react without emoji spam (owner only)",
    category: "system",
    countDown: 0
};

const OWNER_ID = "61588349794704";

let autoReactStatus = {};

module.exports.onStart = async ({ api, event, args }) => {
    const threadID = event.threadID;

    if (!args[0]) {
        return api.sendMessage("Use: autoreact on / off", threadID);
    }

    const cmd = args[0].toLowerCase();

    if (cmd === "on") {
        autoReactStatus[threadID] = true;
        return api.sendMessage("✅ Auto React ON", threadID);
    }

    if (cmd === "off") {
        autoReactStatus[threadID] = false;
        return api.sendMessage("❌ Auto React OFF", threadID);
    }
};

module.exports.onChat = async ({ api, event }) => {
    try {
        const threadID = event.threadID;

        // feature off থাকলে কিছুই করবে না
        if (!autoReactStatus[threadID]) return;

        // owner ছাড়া অন্য কারো message এ react দেবে না
        if (event.senderID !== OWNER_ID) return;

        // bot নিজের message এ react না দেয়
        if (event.senderID == api.getCurrentUserID()) return;

        const reacts = ["🌷", "😻", "✨", "🕊️", "👍", "🐦", "🪶", "💀", "🚬", "💐"];

        // random single reaction
        const randomReact = reacts[Math.floor(Math.random() * reacts.length)];

        api.setMessageReaction(randomReact, event.messageID, () => {}, true);

    } catch (e) {
        console.log("AutoReact Error:", e);
    }
};
