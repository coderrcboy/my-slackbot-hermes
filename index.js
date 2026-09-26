require("dotenv").config();
const { App } = require("@slack/bolt");
const axios = require("axios");

// Initialize Slack Bolt App using Socket Mode
const app = new App({
  token: process.env.SLACK_BOT_TOKEN || "xoxb-2210535565-12160771072721-axz5EmEVRUuy18wVC98niPBO",
  appToken: process.env.SLACK_APP_TOKEN || "xapp-1-A0C4QNA32KT-12160760773473-137b8545d43b19c0c4ac86497dfbbf759bdcc1f1097839fa71b3cb42e54da176",
  signingSecret: process.env.SLACK_SIGNING_SECRET || "8a1d9d62122c08876bd5455e39da64a9",
  socketMode: true,
});

// 1. Ping Command
app.command("/hermes_by-shyam-ping", async ({ ack, respond }) => {
  await ack();
  const startTime = Date.now();
  await respond({
    text: `Pong! 🏓 Latency: ${Date.now() - startTime}ms`,
  });
});

// 2. Fact Check Command (Generates Google Search link)
app.command("/hermes_by-shyam-factcheck", async ({ command, ack, respond }) => {
  await ack();
  const query = command.text.trim();

  if (!query) {
    await respond({
      text: "Please provide text or a claim to fact check! Example: `/hermes_by-shyam-factcheck the earth is round`",
    });
    return;
  }

  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  await respond({
    text: `🔍 *Fact Check Search Link for:* "${query}"\nClick here to open Google Search in a new tab: ${searchUrl}`,
  });
});

// 3. Find Command (Searches channel history text and returns the latest matching message)
app.command("/hermes_by-shyam-find", async ({ command, ack, respond, client }) => {
  await ack();
  const searchTerm = command.text.trim();

  if (!searchTerm) {
    await respond({
      text: "Please provide text to search for! Example: `/hermes_by-shyam-find extended`",
    });
    return;
  }

  try {
    const result = await client.conversations.history({
      channel: command.channel_id,
      limit: 100,
    });

    const cleanTerm = searchTerm.replace(/[@<>]/g, "").toLowerCase();

    // Find the latest message containing the search text
    const match = result.messages.find(
      (msg) => msg.text && msg.text.toLowerCase().includes(cleanTerm)
    );

    if (!match) {
      await respond({ text: `No recent messages found containing "${searchTerm}".` });
      return;
    }

    await respond({
      text: `🔎 *Latest message matching "${searchTerm}":*\n• <@${match.user}>: ${match.text}`,
    });
  } catch (error) {
    await respond({ text: `Failed to search messages: ${error.message}` });
  }
});

// 4. Cat Fact Command
app.command("/hermes_by-shyam-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

// 5. Help Command
app.command("/hermes_by-shyam-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `Available Commands:
/hermes_by-shyam-ping - Check bot latency
/hermes_by-shyam-catfact - Get a cat fact
/hermes_by-shyam-factcheck [query] - Get a Google search link to fact check
/hermes_by-shyam-find [text] - Find the latest channel message containing specified text`,
  });
});

// Start the Bolt App
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
