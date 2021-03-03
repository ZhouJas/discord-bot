const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

const prefix = "%";

client.on("message", async function (message) {
    if (message.author.bot) {
        return;
    }
    if (message.content == "YEP") {
        message.channel.send("COCK!");
    }
    if (!(message.content.startsWith(prefix))) {
        return;
    };

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.channel.send(`:ping_pong: ${timeTaken}ms.`);
    }
    if (command === "pin") {
        var chnl = message.channel;
        if (message.reference) {
            var referencedMessageID = message.reference.messageID;
            console.log(referencedMessageID);
            var referencedMessage;
            await chnl.messages.fetch(referencedMessageID).then(foundMessage => referencedMessage = foundMessage).catch(console.error);
            await referencedMessage.pin({ reason: 'goose bot pin command invoked' }).then(result => {
                Log.success(`Pin request success for Message: ${referencedMessage.content}`);
            }).catch(console.error)
            return;
        } else {
            chnl.send("No referenced message for pinning! Use the reply feature to add a referenced message and try again.").then(sentMessage => {
                setTimeout(function () { sentMessage.delete(); }, 5000)
            })
        }


    }

});


client.login(config.BOT_TOKEN);
console.log("app running");
