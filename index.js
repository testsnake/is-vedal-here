import tmi from "tmi.js";
import "dotenv/config";
import users from "./users.json" assert { type: "json" };

const username = process.env.TWITCH_USERNAME;
const token = process.env.TWITCH_TOKEN;
const channel = process.env.TWITCH_CHANNEL;

const warningUsers = users.channels;

const client = new tmi.Client({
    options: { debug: true },
    identity: {
        username: username,
        password: token,
    },
    channels: [channel],
});

client.connect();

client.on("join", (channel, username, self) => {
    warningUsers.forEach(user => {
        if (user.channel === username) {
            client.say(channel, user.message);
        }
    });
});