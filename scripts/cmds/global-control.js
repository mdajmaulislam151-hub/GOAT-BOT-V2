const login = require("facebook-chat-api");

// 👉 তোমার UID (already set)
const OWNER_ID = "61575453039889";

// 👉 Global ON/OFF
let botEnabled = true;

login({ appState: require("./appstate.json") }, (err, api) => {
  if (err) return console.error(err);

  console.log("✅ Bot Started");

  api.listenMqtt((err, event) => {
    if (err) return console.error(err);

    if (event.type !== "message") return;

    const senderID = event.senderID;
    const threadID = event.threadID;
    const message = event.body;

    if (!message) return;

    // ❌ Bot OFF হলে → owner ছাড়া সবাই ignore
    if (!botEnabled && senderID !== OWNER_ID) {
      return;
    }

    // 👉 শুধু তুমি control করতে পারবে
    if (message === "!off" && senderID === OWNER_ID) {
      botEnabled = false;
      return api.sendMessage("⛔ Bot OFF in all groups (only owner active)", threadID);
    }

    if (message === "!on" && senderID === OWNER_ID) {
      botEnabled = true;
      return api.sendMessage("✅ Bot ON in all groups", threadID);
    }

    // 👉 Normal command
    if (message === "!ping") {
      return api.sendMessage("Pong 🟢", threadID);
    }

    if (message === "!test") {
      return api.sendMessage("🔥 Owner control working", threadID);
    }
  });
});
