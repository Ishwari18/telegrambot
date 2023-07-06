const telegramBot = require("node-telegram-bot-api");
const { ethers } = require("ethers");
//require('dotenv').config();
const abi = [
  {
    inputs: [
      { internalType: "uint256", name: "_totalSupply", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_address", type: "address" },
      { internalType: "bool", name: "_isBlacklisting", type: "bool" },
    ],
    name: "blacklist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "blacklists",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "limited",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxHoldingAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minHoldingAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bool", name: "_limited", type: "bool" },
      { internalType: "address", name: "_uniswapV2Pair", type: "address" },
      { internalType: "uint256", name: "_maxHoldingAmount", type: "uint256" },
      { internalType: "uint256", name: "_minHoldingAmount", type: "uint256" },
    ],
    name: "setRule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapV2Pair",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

const token = "6205714432:AAEEAa_wM04xjfZUk8x56L3UxA7gul6ON_A";

const bot = new telegramBot(token, { polling: true });

let originalMessage = {};
let walletAddresses = [];

//wallet settings
bot.on("callback_query", (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const data = callbackQuery.data;

 if (data === "wallets") {
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

})

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

    const newWallet = { chatId, address }; // Create a new wallet object
    walletAddresses.push(newWallet);
    // Send private key, mnemonic, and address to the user
    const message = `Private Key: ${privateKey}\n\nMnemonic: ${mnemonic}\n\nAddress: ${address}\n\n**Please make sure to save the mnemonic in a secure location**`;
    //bot.sendMessage(chatId, "wallet created");
    bot.sendMessage(chatId, message);
  } else if (data === "import_wallet") {
    // handling import_wallet
    bot.sendMessage(chatId, "Import an existing wallet");
  }
});

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

    const autoBuyText = channelSettings[channelId].autoBuy
      ? "Enabled"
      : "Disabled";
    const autoSellText = channelSettings[channelId].autoSell
      ? "Enabled"
      : "Disabled";

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
            {
              text: "Set Minimum Amount",
              callback_data: `${channelId}_setminamount`,
            },
          ],
        ],
      }),
    };
    bot.editMessageText("Call channel settings:", opts);
  } else if (
    data.startsWith("mechannel_setminamount") ||
    data.startsWith("catchannel_setminamount")
  ) {
    const channelId = data.split("_")[0];
    const settingType = data.split("_")[1];

    // Set the minimum amount for the specific channel
    bot.sendMessage(
      chatId,
      `Please enter the minimum amount for ${channelId}:`,
      {
        reply_markup: {
          force_reply: true,
        },
      }
    );
  }
});

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

// Define an object to store the channel settings
const channelSettings = {};

// Function to get contract information
async function getContractInfo(contractAddress) {
  try {
    const provider = ethers.getDefaultProvider();
    const contract = new ethers.Contract(contractAddress, abi, provider);

    // Retrieve contract information
    const [name, symbol, decimals, totalSupply, uniswapV2Pair] =
      await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.decimals(),
        contract.totalSupply(),
        contract.uniswapV2Pair(),
      ]);

    const uniswapV2PairAddress = uniswapV2Pair.toString();

    // Retrieve chain ID
    const network = await provider.getNetwork();
    const chainId = network.chainId;

    let chain = "";
    if (chainId === 1) {
      chain = "Ethereum";
    } else if (chainId === 56) {
      chain = "BSC";
    } else {
      chain = "Unknown";
    }

    return {
      name: name,
      symbol: symbol,
      decimals: decimals,
      totalSupply: totalSupply.toString(),
      uniswapV2PairAddress: uniswapV2PairAddress,
      chain: chainId,
    };
  } catch (error) {
    console.error("Error retrieving contract information:", error);
    return null;
  }
}

// Handle user messages
bot.on("message", async (message) => {
  const chatId = message.chat.id;
  const text = message.text;

  // Check if the message contains a contract address
  if (text.match(/^0x[a-fA-F0-9]{40}$/)) {
    const contractAddress = text.trim();

    // Get contract information
    const contractInfo = await getContractInfo(contractAddress);

    if (contractInfo) {
      const replyMessage = `Contract Information:\n\nName: ${contractInfo.name}\nSymbol: ${contractInfo.symbol}\nDecimals: ${contractInfo.decimals}\nTotal Supply: ${contractInfo.totalSupply}\nUniswap V2 Pair Address: ${contractInfo.uniswapV2PairAddress}\nChain: ${contractInfo.chain}`;
      bot.sendMessage(chatId, replyMessage);
    } else {
      bot.sendMessage(chatId, "Failed to retrieve contract information.");
    }
  }
});
