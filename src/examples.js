const telegramBot = require("node-telegram-bot-api");
const { ethers } = require("ethers");
//require('dotenv').config();

const token = "6205714432:AAEEAa_wM04xjfZUk8x56L3UxA7gul6ON_A";

const bot = new telegramBot(token, { polling: true });

bot.on("message", (message) => {
  let chatid = message.from.id;
  if (
    message.text.toString().toLocaleLowerCase() === "hi" ||
    message.text.toString().toLocaleLowerCase() === "hey" ||
    message.text.toString().toLocaleLowerCase() === "hello"
  ) {
    bot.sendMessage(chatid, "Hello dear user");
  }
});

bot.onText(/\/greet/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome");
});
bot.onText(/\/sniper/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "This is tradesmart bot. Here's a manual. Follow us on twitter."
  );
  const opts = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Wallets", callback_data: "wallets" }],
        [{ text: "Call channels", callback_data: "channels" }],
        [{ text: "Copytrade", callback_data: "copytrade" }],
        [{ text: "snipe presales", callback_data: "snipe_presale" }],
        [{ text: "dhjbdjh", callback_data: "autobuyBSC" }],
        [{ text: "snipe presales", callback_data: "autobuyETH" }],
      ],
    }),
  };
  bot.sendMessage(msg.chat.id, "WHat would u like to do today", opts);
});

//shows currenies to check price
bot.onText(/\/price/, (msg) => {
  const opts = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "ETH", callback_data: "eth" }],
        [{ text: "BSC", callback_data: "bsc" }],
        [{ text: "ARB", callback_data: "arb" }],
        [{ text: "MATIC", callback_data: "matic" }],
      ],
    }),
  };
  bot.sendMessage(msg.chat.id, "Choose currency:", opts);
});

let originalMessage = {};

//to create a wallet
bot.on("callback_query", (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const data = callbackQuery.data;

  if (data === "eth" || data === "btc" || data === "matic" || data === "arb") {
    const opts = {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            { text: "Create Wallet", callback_data: "create_wallet" },
            { text: "Import Wallet", callback_data: "import_wallet" }
          ],
        ],
      }),
    };

    // Store the original message content before editing
    originalMessage[messageId] = callbackQuery.message.text;

    bot.editMessageText("Add a wallet", opts);
  } else if (data === "create_wallet") {
    const wallet = ethers.Wallet.createRandom();
    const privateKey = wallet.privateKey;
    const mnemonic = wallet.mnemonic.phrase;
    const address = wallet.address;
    // Send private key, mnemonic, and address to the user
    const message = `Private Key: ${privateKey}\n\nMnemonic: ${mnemonic}\n\nAddress: ${address}\n\n**Please make sure to save the mnemonic in a secure location**`;
    //bot.sendMessage(chatId, "wallet created");
    bot.sendMessage(chatId, message);
  } else if (data === "import_wallet") {
    // handling import_wallet
    bot.sendMessage(chatId, "Import an existing wallet");
  } else if (data === "wallets") {
    const opts = {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            { text: "ETH", callback_data: "eth" },
            { text: "BSC", callback_data: "bsc" },
          ],
        ],
      }),
    };

    bot.editMessageText("Select target chain:", opts);
  } 
});

