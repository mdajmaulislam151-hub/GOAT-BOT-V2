module.exports.config = {
    name: "autoreact",
    version: "4.0.0",
    author: "Ajmaul",
    role: 0,
    description: "Auto react only to owner's messages",
    category: "system",
    countDown: 0
};

const OWNER_ID = "61588349794704";

let autoReactStatus = {};

module.exports.onStart = async ({ api, event, args }) => {
    const threadID = event.threadID;

    // only owner can use command
    if (event.senderID !== OWNER_ID) {
        return api.sendMessage("❌ Only owner can use this command.", threadID);
    }

    if (!args[0]) {
        return api.sendMessage("Use: autoreact on / off", threadID);
    }

    const cmd = args[0].toLowerCase();

    if (cmd === "on") {
        autoReactStatus[threadID] = true;
        return api.sendMessage("✅ Auto React ON (owner only)", threadID);
    }

    if (cmd === "off") {
        autoReactStatus[threadID] = false;
        return api.sendMessage("❌ Auto React OFF", threadID);
    }
};

module.exports.onChat = async ({ api, event }) => {
    try {
        const threadID = event.threadID;

        // feature off
        if (!autoReactStatus[threadID]) return;

        // react only to owner's messages
        if (event.senderID !== OWNER_ID) return;

        // bot
