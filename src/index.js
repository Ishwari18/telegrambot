const telegramBot = require("node-telegram-bot-api");
const { ethers } = require("ethers");
//require('dotenv').config();

const token = "6205714432:AAEEAa_wM04xjfZUk8x56L3UxA7gul6ON_A";

const bot = new telegramBot(token, { polling: true });

let originalMessage = {};

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
    "This is tradesmart bot. Here's a manual. Follow us on twitter. Make sure u follow these channels."
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
            { text: "Import Wallet", callback_data: "import_wallet" },
            { text: "Return", callback_data: "return" },
          ],
        ],
      }),
    };

    // Store the original message content before editing
    originalMessage[messageId] = {
      text: callbackQuery.message.text,
      reply_markup: callbackQuery.message.reply_markup,
    };

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
            { text: "BSC", callback_data: "bsc" }
          ],
        ],
      }),
    };

    bot.editMessageText("Select target chain:", opts);
  } else if (data === "return") {
    const previousData = originalMessage[messageId];
    const opts = {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: previousData.reply_markup,
      text: previousData.text,
    };
    bot.editMessageText(previousData.text, opts);
  }
});


// Define an object to store the channel settings
const channelSettings = {};

// Call channels and settings
bot.on("callback_query", (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const data = callbackQuery.data;

  if (data === "channels") {
    const opts = {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            { text: "Me", callback_data: "mechannel" },
            { text: "Cat", callback_data: "catchannel" },
          ],
        ],
      }),
    };
    bot.editMessageText("Select channels:", opts);
  } else if (data === "mechannel" || data === "catchannel") {
    const channelId = data;
    const channelSettingsExists = channelSettings.hasOwnProperty(channelId);

    // Check if channel settings exist, if not, initialize with default values
    if (!channelSettingsExists) {
      channelSettings[channelId] = {
        autoBuy: false,
        autoSell: false,
      };
    }

    // Toggle auto buy setting
    channelSettings[channelId].autoBuy = !channelSettings[channelId].autoBuy;

    const autoBuyText = channelSettings[channelId].autoBuy ? "Enabled" : "Disabled";
    const autoSellText = channelSettings[channelId].autoSell ? "Enabled" : "Disabled";

    const opts = {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {
              text: `Auto Buy (${autoBuyText})`,
              callback_data: `${channelId}_autobuy`,
            },
            {
              text: `Auto Sell (${autoSellText})`,
              callback_data: `${channelId}_autosell`,
            },
          ],
          [
            { text: "Set Minimum Amount", callback_data: `${channelId}_setminamount` },
          ],
        ],
      }),
    };
    bot.editMessageText("Call channel settings:", opts);
  }  else if (data.startsWith("mechannel_setminamount") || data.startsWith("catchannel_setminamount")) {
    const channelId = data.split("_")[0];
    const settingType = data.split("_")[1];

    // Set the minimum amount for the specific channel
    bot.sendMessage(chatId, `Please enter the minimum amount for ${channelId}:`, {
      reply_markup: {
        force_reply: true,
      },
    });
  }
});

// Handle the minimum amount input from the user
bot.onReplyToMessage((message) => {
  const chatId = message.chat.id;
  const messageId = message.message_id;
  const channelId = message.text.split(":")[0].trim();
  const minimumAmount = parseFloat(message.text.split(":")[1].trim());

  // Update the minimum amount for the specific channel
  channelSettings[channelId].minAmount = minimumAmount;

  bot.sendMessage(chatId, `Minimum amount for ${channelId} set to: ${minimumAmount}`);
});