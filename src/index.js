const telegramBot = require("node-telegram-bot-api");
//const { ethers } = require("ethers");
const ethers = require("ethers");
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
const routerABI = [
  {
    inputs: [
      { internalType: "address", name: "_factory", type: "address" },
      { internalType: "address", name: "_WETH", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "WETH",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
      { internalType: "uint256", name: "amountADesired", type: "uint256" },
      { internalType: "uint256", name: "amountBDesired", type: "uint256" },
      { internalType: "uint256", name: "amountAMin", type: "uint256" },
      { internalType: "uint256", name: "amountBMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "addLiquidity",
    outputs: [
      { internalType: "uint256", name: "amountA", type: "uint256" },
      { internalType: "uint256", name: "amountB", type: "uint256" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amountTokenDesired", type: "uint256" },
      { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
      { internalType: "uint256", name: "amountETHMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "addLiquidityETH",
    outputs: [
      { internalType: "uint256", name: "amountToken", type: "uint256" },
      { internalType: "uint256", name: "amountETH", type: "uint256" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "reserveIn", type: "uint256" },
      { internalType: "uint256", name: "reserveOut", type: "uint256" },
    ],
    name: "getAmountIn",
    outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "reserveIn", type: "uint256" },
      { internalType: "uint256", name: "reserveOut", type: "uint256" },
    ],
    name: "getAmountOut",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
    ],
    name: "getAmountsIn",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
    ],
    name: "getAmountsOut",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountA", type: "uint256" },
      { internalType: "uint256", name: "reserveA", type: "uint256" },
      { internalType: "uint256", name: "reserveB", type: "uint256" },
    ],
    name: "quote",
    outputs: [{ internalType: "uint256", name: "amountB", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountAMin", type: "uint256" },
      { internalType: "uint256", name: "amountBMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "removeLiquidity",
    outputs: [
      { internalType: "uint256", name: "amountA", type: "uint256" },
      { internalType: "uint256", name: "amountB", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
      { internalType: "uint256", name: "amountETHMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "removeLiquidityETH",
    outputs: [
      { internalType: "uint256", name: "amountToken", type: "uint256" },
      { internalType: "uint256", name: "amountETH", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
      { internalType: "uint256", name: "amountETHMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "removeLiquidityETHSupportingFeeOnTransferTokens",
    outputs: [{ internalType: "uint256", name: "amountETH", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
      { internalType: "uint256", name: "amountETHMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bool", name: "approveMax", type: "bool" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "removeLiquidityETHWithPermit",
    outputs: [
      { internalType: "uint256", name: "amountToken", type: "uint256" },
      { internalType: "uint256", name: "amountETH", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
      { internalType: "uint256", name: "amountETHMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bool", name: "approveMax", type: "bool" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
    outputs: [{ internalType: "uint256", name: "amountETH", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "amountAMin", type: "uint256" },
      { internalType: "uint256", name: "amountBMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bool", name: "approveMax", type: "bool" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "removeLiquidityWithPermit",
    outputs: [
      { internalType: "uint256", name: "amountA", type: "uint256" },
      { internalType: "uint256", name: "amountB", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapETHForExactTokens",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactETHForTokens",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactTokensForETH",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactTokensForTokens",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "amountInMax", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapTokensForExactETH",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "amountInMax", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "swapTokensForExactTokens",
    outputs: [
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];
const pairABI = [
  {
    inputs: [],
    payable: false,
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
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
      { indexed: true, internalType: "address", name: "to", type: "address" },
    ],
    name: "Burn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    name: "Mint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0In",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1In",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0Out",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1Out",
        type: "uint256",
      },
      { indexed: true, internalType: "address", name: "to", type: "address" },
    ],
    name: "Swap",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint112",
        name: "reserve0",
        type: "uint112",
      },
      {
        indexed: false,
        internalType: "uint112",
        name: "reserve1",
        type: "uint112",
      },
    ],
    name: "Sync",
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
    constant: true,
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "MINIMUM_LIQUIDITY",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "burn",
    outputs: [
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "factory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getReserves",
    outputs: [
      { internalType: "uint112", name: "_reserve0", type: "uint112" },
      { internalType: "uint112", name: "_reserve1", type: "uint112" },
      { internalType: "uint32", name: "_blockTimestampLast", type: "uint32" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "_token0", type: "address" },
      { internalType: "address", name: "_token1", type: "address" },
    ],
    name: "initialize",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "kLast",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "mint",
    outputs: [{ internalType: "uint256", name: "liquidity", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "nonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "price0CumulativeLast",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "price1CumulativeLast",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "skim",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "uint256", name: "amount0Out", type: "uint256" },
      { internalType: "uint256", name: "amount1Out", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "swap",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "sync",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "token0",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "token1",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];
const token = "6205714432:AAEEAa_wM04xjfZUk8x56L3UxA7gul6ON_A";
const bot = new telegramBot(token, { polling: true });
const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/fb42577745e24d429d936f65b43cca0b"
);
//const provider = ethers.getDefaultProvider();
let walletAddresses = [];
let walletNames = ["Main", "Demo 1", "Demo 2"]; // Array of wallet names
let activeWalletIndex = 0; // Index of the active wallet in the array

// Set the initial activeWallet based on the array length
let activeWallet = walletAddresses.length > 0 ? walletAddresses[activeWalletIndex].address : null;
let toggleBuySell = false; // Initialize toggleBuySell to false
// Global settings object
let copytradewallets = [];
let channels = ["Channel1"];
const globalSettings = {
  autoBuy: false, // Default state: Auto Buy is disabled
  autoSell: false,
  maxMC: null, // Default state: Max MC value is not set
  minLiquidity: null, // Default state:  value is not set
  maxLiquidity: null,
  maxBuytax: null,
  maxSelltax: null,
  SellHigh: null,
  SellLow: null,
  sellgasprice: null,
  buygasprice: null,
  autoapprove: null,
  approvegasprice: null,
  // Add other global settings here
};

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
        [{ text: "FAQ", callback_data: "faq" }],
      ],
    }),
  };

  bot.sendMessage(msg.chat.id, "WHat would u like to do today", opts);
});

//handling wallets query
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
            { text: "Create", callback_data: "create_wallet" },
            { text: "Import", callback_data: "import_wallet" },
            { text: "Your Wallets", callback_data: "yourwallets" },
            { text: "Config", callback_data: "configwallets" },
            { text: "Balance", callback_data: "balance" },
          ],
        ],
      }),
    };

    bot.sendMessage(chatId, "Select target chain:", opts);
    //bot.editMessageText("Select target chain:", opts);
  }else if (data === "balance") {
    if (walletAddresses.length === 0) {
      bot.sendMessage(chatId, "No wallets connected.");
    } else {
      const balancePromises = walletAddresses.map(async (wallet) => {
        const balance = await provider.getBalance(wallet.address);
        const balanceEth = ethers.utils.formatEther(balance);
        const walletNameIndex = walletAddresses.findIndex((w) => w.address === wallet.address);
        const walletName = walletNames[walletNameIndex];
        return { walletName, balanceEth };
      });
  
      Promise.all(balancePromises)
        .then((walletBalances) => {
          const balanceMessages = walletBalances.map((wb) => `${wb.walletName}: ${wb.balanceEth} ETH`);
  
          const balanceMessage = balanceMessages.join("\n");
  
          const opts = {
            chat_id: chatId,
            message_id: messageId,
          };
  
          bot.sendMessage(chatId, `Wallet Balances:\n\n${balanceMessage}`, opts);
        })
        .catch((error) => {
          console.error(error);
          bot.sendMessage(chatId, "Failed to retrieve wallet balances.");
        });
    }
  }else if (data === "import_wallet") {
    const opts = {
      chat_id: chatId,
      message_id: messageId,
    };
  
    bot.sendMessage(chatId, "Please enter the private key to import the wallet:", opts);
  
    // Register a new message handler to capture the private key
    bot.once("message", async (message) => {
      const privateKey = message.text;
  
      try {
        if (!privateKey) {
          throw new Error("Invalid private key");
        }
  
        const wallet = new ethers.Wallet(privateKey);
        const address = wallet.address;
  
        const newWallet = { address, privateKey }; // Create a new wallet object
        walletAddresses.push(newWallet);
  
        // Send a success message with the imported wallet address
        bot.sendMessage(chatId, `Wallet imported successfully. Address: ${address}`);
  
      } catch (error) {
        // Send an error message if importing the wallet fails
        bot.sendMessage(chatId, "Error importing wallet. Please make sure to provide a valid private key.");
      }
    });
  }else if (data === "yourwallets") {
    const walletButtons = walletAddresses.map((wallet, index) => ({
      text: walletNames[index] || wallet.address,
      callback_data: `wallet_address:${wallet.address}`,
    }));
  
    const opts = {
      chat_id: chatId,
      reply_markup: JSON.stringify({
        inline_keyboard: [walletButtons],
      }),
    };
  
    bot.sendMessage(chatId, "Your Wallets:", opts);
  }else if (data.includes("wallet_address:")) {
    const walletAddress = data.split(":")[1];
    const walletIndex = walletAddresses.findIndex(
      (wallet) => wallet.address === walletAddress
    );
  
    if (walletIndex !== -1) {
      const wallet = walletAddresses[walletIndex];
      const isWalletEnabled = wallet.enabled;
  
      const enableButtonText = isWalletEnabled ? "Disable" : "Enable";
      const enableButtonCallback = isWalletEnabled
        ? `disable_wallet:${walletAddress}`
        : `enable_wallet:${walletAddress}`;
  
      const settingsButtons = [
        { text: enableButtonText, callback_data: enableButtonCallback },
        { text: "Rename", callback_data: `change_name:${walletAddress}` },
        { text: "Send ETH", callback_data: `sendeth:${walletAddress}` },
        { text: "Send BNB", callback_data: `sendbnb:${walletAddress}` },
        { text: "Balance", callback_data: `balance:${walletAddress}` },
        { text: "Return", callback_data: "yourwallets" },
      ];
  
      const opts = {
        chat_id: chatId,
        reply_markup: JSON.stringify({
          inline_keyboard: [settingsButtons],
        }),
      };
  
      bot.sendMessage(chatId, "Wallet Settings:", opts);
    }
  }else if (data.startsWith("change_name")) {
    const walletAddress = data.split(":")[1];
    const walletIndex = walletAddresses.findIndex(
      (wallet) => wallet.address === walletAddress
    );
  
    if (walletIndex !== -1) {
      const wallet = walletAddresses[walletIndex];
  
      const opts = {
        chat_id: chatId,
        message_id: messageId,
      };
  
      // Prompt the user to enter a new name for the wallet
      bot.sendMessage(chatId, "Please enter the new name for the wallet:", opts);
  
      // Register a new message handler to capture the new name
      bot.once("message", async (message) => {
        const newName = message.text;
  
        // Update the name in the walletNames array
        walletNames[walletIndex] = newName;
  
        // Send a success message with the updated wallet name
        bot.sendMessage(chatId, `Wallet name has been updated to: ${newName}`);
      });
    }
  }else if (data.startsWith("sendeth")) {
    const walletAddress = data.split(":")[1];
    const walletIndex = walletAddresses.findIndex(
      (wallet) => wallet.address === walletAddress
    );
  
    if (walletIndex !== -1) {
      const selectedWallet = walletAddresses[walletIndex];
  
      const opts = {
        chat_id: chatId,
        message_id: messageId,
      };
  
      // Prompt the user to enter the amount
      bot.sendMessage(chatId, "Please enter the amount:", opts);
  
      // Register a new message handler to capture the amount
      bot.once("message", async (message) => {
        if (message.chat.id === chatId) {
          const amount = message.text;
  
          // Prompt the user to enter the recipient address
          bot.sendMessage(chatId, "Please enter the recipient address:");
  
          // Register a new message handler to capture the recipient address
          bot.once("message", async (message) => {
            if (message.chat.id === chatId) {
              const recipient = message.text;
  
              // Prepare the transaction details
              const txDetails = {
                to: recipient,
                value: ethers.utils.parseEther(amount),
                gasLimit: 21000,
              };
  
              try {
                // Generate the signer from the private key
                const signer = new ethers.Wallet(selectedWallet.privateKey).connect(provider);
  
                // Sign and send the transaction
                const tx = await signer.sendTransaction(txDetails);
                await tx.wait();
  
                // Send a success message
                bot.sendMessage(chatId, `${amount} ETH sent`);
              } catch (error) {
                console.error(error);
                bot.sendMessage(chatId, "Transaction failed.");
              }
            }
          });
        }
      });
    }
  }else if (data.startsWith("balance")) {
    const walletAddress = data.split(":")[1];
    const walletIndex = walletAddresses.findIndex(
      (wallet) => wallet.address === walletAddress
    );
  
    if (walletIndex !== -1) {
      const wallet = walletAddresses[walletIndex];
      const address = wallet.address;
      provider.getBalance(address).then((balance) => {
        const balanceEth = ethers.utils.formatEther(balance);
  
        const opts = {
          chat_id: chatId,
          message_id: messageId,
        };
  
        // Prompt the user to enter a new name for the wallet
        bot.sendMessage(chatId, `Wallet Balance: ${balanceEth} ETH`, opts);
      }).catch((error) => {
        // Handle error if failed to retrieve the balance
        console.error(error);
        bot.sendMessage(chatId, "Failed to retrieve wallet balance.");
      });
    }
  }else if (data === "create_wallet") {
    if (walletAddresses.length >= 3) {
      // If the maximum limit of addresses is reached
      bot.sendMessage(
        chatId,
        "Maximum wallet limit reached. You cannot create or import a new wallet."
      );
      return;
    }
  
    const wallet = ethers.Wallet.createRandom();
    const privateKey = wallet.privateKey;
    const mnemonic = wallet.mnemonic.phrase;
    const address = wallet.address;
  
    const newWallet = { address, privateKey }; // Create a new wallet object with enabled status
    walletAddresses.push(newWallet);
  
    // Send private key, mnemonic, and address to the user
    const message = `Private Key: ${privateKey}\n\nMnemonic: ${mnemonic}\n\nAddress: ${address}\n\n**Please make sure to save the mnemonic in a secure location**`;
    bot.sendMessage(chatId, message);
  }else  if (data.startsWith("enable_wallet") || data.startsWith("disable_wallet")) {
    const walletAddress = data.split(":")[1];
    const walletIndex = walletAddresses.findIndex(
      (wallet) => wallet.address === walletAddress
    );

    if (walletIndex !== -1) {
      const wallet = walletAddresses[walletIndex];
      wallet.enabled = !wallet.enabled;

      const enableButtonText = wallet.enabled ? "Disable" : "Enable";
      const enableButtonCallback = wallet.enabled
        ? `disable_wallet:${walletAddress}`
        : `enable_wallet:${walletAddress}`;

      const settingsButtons = [
        { text: enableButtonText, callback_data: enableButtonCallback },
        { text: "Rename", callback_data: `change_name:${walletAddress}` },
        { text: "Send ETH", callback_data: `change_password:${walletAddress}` },
        { text: "Send BNB", callback_data: `export_private_key:${walletAddress}` },
        { text: "Back", callback_data: "yourwallets" },
      ];

      const opts = {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: JSON.stringify({
          inline_keyboard: [settingsButtons],
        }),
      };

      bot.sendMessage(chatId, "Wallet Settings:", opts);
    }
  }else if (data === "activewallet") {
    if (walletAddresses.length === 0) {
      bot.sendMessage(chatId, "No wallets connected");
      return;
    }
  
    activeWalletIndex = (activeWalletIndex + 1) % walletAddresses.length;
    activeWallet = walletAddresses[activeWalletIndex].address;
    const activeWalletName = walletNames[activeWalletIndex];
  
    const activeWalletButton = walletAddresses.length === 1 ? "There's only one wallet connected" : activeWalletName;
  
    const buttons = [
      [{ text: "Buy 0.1", callback_data: "buy_0.1" }],
      [{ text: "Buy 0.5", callback_data: "buy_0.5" }],
      [{ text: "Buy 0.05", callback_data: "buy_0.05" }],
      [{ text: "Buy X", callback_data: "buyxtoken" }],
    ];
  
    if (toggleBuySell) {
      buttons.push(
        [{ text: "Sell 0.1", callback_data: "sell_0.1" }],
        [{ text: "Sell 0.5", callback_data: "sell_0.5" }],
        [{ text: "Sell 0.05", callback_data: "sell_0.05" }],
        [{ text: "Sell X", callback_data: "sellxtoken" }]
      );
    }
  
    const opts = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Track", callback_data: "track" }],
          [{ text: "BSC", callback_data: "togglecontractchain" }],
          [{ text: activeWalletButton, callback_data: "activewallet" }],
          [{ text: "Buy<->Sell", callback_data: "togglebuysellbtn" }],
          ...buttons,
        ],
      }),
    };
  
    bot.sendMessage(chatId, `Active Wallet: ${activeWalletButton}`, opts);
  }else if (data === "eth" || data === "btc") {
    const opts = {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Create Wallet", callback_data: "create_wallet" }],
        ],
      }),
    };

    bot.sendMessage(chatId, "Add a wallet", opts);
  }else if (data === "channels") {

    const buttons = channels.map((channel, index) => ({
      text: channels[index],
      callback_data: `channel:${channels[index]}`,
    }));
    const opts = {
      chat_id: chatId,
      reply_markup: JSON.stringify({
        inline_keyboard: [buttons, [{text: "add a channel", callback_data: "addchannel"}]],
      }),
    };
    let message = "";
    if (channels.length ==0){
       message = "No added channels"
    } else {
      message = "select a channel"
    }

    bot.sendMessage(chatId, message, opts);
  }else if (data.includes("channel:")){
    const channelName = data.split(":")[1];

    const settingsButtons = [
      { text: "Rename", callback_data: `change_name:${channelName}` },
      { text: "Send ETH", callback_data: `sendeth:${channelName}` },
      { text: "Send BNB", callback_data: `sendbnb:${channelName}` },
      { text: "Balance", callback_data: `balance:${channelName}` },
      { text: "Return", callback_data: "yourwallets" },
    ];

    const opts = {
      chat_id: chatId,
      reply_markup: JSON.stringify({
        inline_keyboard: [settingsButtons],
      }),
    };

    bot.sendMessage(chatId, "Channel Settings:", opts);
  }else if (data === "mechannel" || data === "catchannel") {
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
  }else if (
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
  } else if (data === "configwallets") {
    const opts = {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Anti-rug", callback_data: "antirug" }],
          [{ text: "Smart Slippage", callback_data: "smartslippage" }],
          [{ text: "Buy Settings", callback_data: "buysettings" }],
          [{ text: "Sell Settings", callback_data: "sellsettings" }],
          [{ text: "Approve Settings", callback_data: "approvesettings" }],
          [{ text: "Max Gas Price", callback_data: "maxgasprice" }],
          [{ text: "Slippage", callback_data: "slippage" }],
          [{ text: "Gas Limit", callback_data: "gaslimit" }],
        ],
      }),
    };

    bot.sendMessage(chatId, "Add a wallet", opts);
  } else if (data === "buysettings") {
    const opts = {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {
              text: `Auto Buy: ${
                globalSettings.autoBuy ? "Enabled" : "Disabled"
              }`,
              callback_data: "toggle_autobuy",
            },
          ],
          [{ text: "Max MC", callback_data: "set_maxmc" }],
          [{ text: "Min Liquidity", callback_data: "setminliquidity" }],
          [{ text: "Max Liquidity", callback_data: "setmaxliquidity" }],
          [{ text: "Max Buy Tax", callback_data: "setmaxbuytax" }],
          [{ text: "Max Sell Tax", callback_data: "setmaxselltax" }],
          [{ text: "Gas Price", callback_data: "setbuygasprice" }],
        ],
      }),
    };

    bot.sendMessage(chatId, "Buy Settings", opts);
  } else if (data === "toggle_autobuy") {
    // Toggle the Auto Buy setting
    globalSettings.autoBuy = !globalSettings.autoBuy;
  } else if (data === "set_maxmc") {
    // Prompt the user to send the value of Max MC
    bot
      .sendMessage(chatId, "Please enter the value for Max MC:")
      .catch((error) => console.error("Error sending message:", error));

    // Update the global setting when the user sends the value
    bot.once("message", async (message) => {
      const maxMCValue = message.text;
      // Perform validation on the value if needed

      // Update the Max MC setting
      globalSettings.maxMC = maxMCValue;

      // Send a confirmation message
      bot
        .sendMessage(chatId, `Max MC set to: ${maxMCValue}`)
        .catch((error) => console.error("Error sending message:", error));
    });
  } else if (data === "setminliquidity") {
    // Prompt the user to send the value of Max MC
    bot
      .sendMessage(chatId, "Please enter the value for Min Liquidity:")
      .catch((error) => console.error("Error sending message:", error));

    // Update the global setting when the user sends the value
    bot.once("message", async (message) => {
      const minLiquidity = message.text;
      // Perform validation on the value if needed

      // Update the Max MC setting
      globalSettings.minLiquidity = minLiquidity;

      // Send a confirmation message
      bot
        .sendMessage(chatId, `Min Liquidity set to: ${minLiquidity}`)
        .catch((error) => console.error("Error sending message:", error));
    });
  } else if (data === "setmaxliquidity") {
    // Prompt the user to send the value of Max MC
    bot
      .sendMessage(chatId, "Please enter the value for Max Liquidity:")
      .catch((error) => console.error("Error sending message:", error));

    // Update the global setting when the user sends the value
    bot.once("message", async (message) => {
      const maxLiquidity = message.text;
      // Perform validation on the value if needed

      // Update the Max MC setting
      globalSettings.maxLiquidity = maxLiquidity;

      // Send a confirmation message
      bot
        .sendMessage(chatId, `Max Liquidity set to: ${maxLiquidity}`)
        .catch((error) => console.error("Error sending message:", error));
    });
  } else if (data === "setmaxbuytax") {
    // Prompt the user to send the value of Max MC
    bot
      .sendMessage(chatId, "Please enter the value for Max Buy Tax :")
      .catch((error) => console.error("Error sending message:", error));

    // Update the global setting when the user sends the value
    bot.once("message", async (message) => {
      const maxBuytax = message.text;
      // Perform validation on the value if needed

      // Update the Max MC setting
      globalSettings.maxBuytax = maxBuytax;

      // Send a confirmation message
      bot
        .sendMessage(chatId, `Max Buy Tax set to: ${maxBuytax}`)
        .catch((error) => console.error("Error sending message:", error));
    });
  } else if (data === "setmaxselltax") {
    // Prompt the user to send the value of Max MC
    bot
      .sendMessage(chatId, "Please enter the value for Max Sell Tax :")
      .catch((error) => console.error("Error sending message:", error));

    // Update the global setting when the user sends the value
    bot.once("message", async (message) => {
      const maxSelltax = message.text;
      // Perform validation on the value if needed

      // Update the Max MC setting
      globalSettings.maxSelltax = maxSelltax;

      // Send a confirmation message
      bot
        .sendMessage(chatId, `Max Sell Tax set to: ${maxSelltax}`)
        .catch((error) => console.error("Error sending message:", error));
    });
  } else if (data === "setbuygasprice") {
    // Prompt the user to send the value of Max MC
    bot
      .sendMessage(chatId, "Please enter the value for Max Buy Gas Price :")
      .catch((error) => console.error("Error sending message:", error));

    // Update the global setting when the user sends the value
    bot.once("message", async (message) => {
      const buygasprice = message.text;
      // Perform validation on the value if needed

      // Update the Max MC setting
      globalSettings.buygasprice = buygasprice;

      // Send a confirmation message
      bot
        .sendMessage(chatId, `Max Buy Gas Price set to: ${buygasprice}`)
        .catch((error) => console.error("Error sending message:", error));
    });
  } else if (data === "sellsettings") {
    const opts = {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {
              text: `Auto Sell: ${
                globalSettings.autoSell ? "Enabled" : "Disabled"
              }`,
              callback_data: "toggle_autosell",
            },
          ],
          [{ text: "Gas Price", callback_data: "setsellgasprice" }],
          [{ text: "Sell-Hi", callback_data: "setsellhi" }],
          [{ text: "Sell Low", callback_data: "setselllow" }],
          [{ text: "Sell-Hi Amount", callback_data: "setsellhiamount" }],
          [{ text: "Sell Low Amount", callback_data: "setselllowamount" }],
        ],
      }),
    };
    bot.sendMessage(chatId, "Sell Settings", opts);
  } else if (data === "toggle_autosell") {
    // Toggle the Auto Buy setting
    globalSettings.autoSell = !globalSettings.autoSell;
  } else if (data === "setsellhi") {
    // Prompt the user to send the value of Max MC
    bot
      .sendMessage(chatId, "Please enter the value for Sell High :")
      .catch((error) => console.error("Error sending message:", error));

    // Update the global setting when the user sends the value
    bot.once("message", async (message) => {
      const SellHigh = message.text;
      // Perform validation on the value if needed

      // Update the Max MC setting
      globalSettings.SellHigh = SellHigh;

      // Send a confirmation message
      bot
        .sendMessage(chatId, `Sell High set to: ${SellHigh}`)
        .catch((error) => console.error("Error sending message:", error));
    });
  } else if (data === "setselllow") {
    // Prompt the user to send the value of Max MC
    bot
      .sendMessage(chatId, "Please enter the value for Sell Low :")
      .catch((error) => console.error("Error sending message:", error));

    // Update the global setting when the user sends the value
    bot.once("message", async (message) => {
      const SellLow = message.text;
      // Perform validation on the value if needed

      // Update the Max MC setting
      globalSettings.SellLow = SellLow;

      // Send a confirmation message
      bot
        .sendMessage(chatId, `Sell Low set to: ${SellLow}`)
        .catch((error) => console.error("Error sending message:", error));
    });
  } else if (data === "setsellhiamount") {
    // Prompt the user to send the value of Max MC
    bot
      .sendMessage(chatId, "Please enter the value for Sell High Amount :")
      .catch((error) => console.error("Error sending message:", error));

    // Update the global setting when the user sends the value
    bot.once("message", async (message) => {
      const SellHighAmount = message.text;
      // Perform validation on the value if needed

      // Update the Max MC setting
      globalSettings.SellHighAmount = SellHighAmount;

      // Send a confirmation message
      bot
        .sendMessage(chatId, `Sell High Amounto set to: ${SellHighAmount}`)
        .catch((error) => console.error("Error sending message:", error));
    });
  } else if (data === "setselllowamount") {
    // Prompt the user to send the value of Max MC
    bot
      .sendMessage(chatId, "Please enter the value for Sell Low Amount :")
      .catch((error) => console.error("Error sending message:", error));

    // Update the global setting when the user sends the value
    bot.once("message", async (message) => {
      const SellLowAmount = message.text;
      // Perform validation on the value if needed

      // Update the Max MC setting
      globalSettings.SellLowAmount = SellLowAmount;

      // Send a confirmation message
      bot
        .sendMessage(chatId, `Sell Low Amounto set to: ${SellLowAmount}`)
        .catch((error) => console.error("Error sending message:", error));
    });
  } else if (data === "setsellgasprice") {
    // Prompt the user to send the value of Max MC
    bot
      .sendMessage(chatId, "Please enter the value for Max Sell Gas Price :")
      .catch((error) => console.error("Error sending message:", error));

    // Update the global setting when the user sends the value
    bot.once("message", async (message) => {
      const sellgasprice = message.text;
      // Perform validation on the value if needed

      // Update the Max MC setting
      globalSettings.sellgasprice = sellgasprice;

      // Send a confirmation message
      bot
        .sendMessage(chatId, `Max Sell Gas Price set to: ${sellgasprice}`)
        .catch((error) => console.error("Error sending message:", error));
    });
  } else if (data === "approvesettings") {
    const opts = {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {
              text: `Auto Approve: ${
                globalSettings.autoapprove ? "Enabled" : "Disabled"
              }`,
              callback_data: "toggle_autoapprove",
            },
          ],
          [{ text: "Gas Price", callback_data: "setapprovegasprice" }],
        ],
      }),
    };

    bot.sendMessage(chatId, "Approve Settings", opts);
  } else if (data === "toggle_autoapprove") {
    // Toggle the Auto Buy setting
    globalSettings.autoapprove = !globalSettings.autoapprove;
  } else if (data === "setapprovegasprice") {
    // Prompt the user to send the value of Max MC
    bot
      .sendMessage(chatId, "Please enter the value for Max Approve Gas Price :")
      .catch((error) => console.error("Error sending message:", error));

    // Update the global setting when the user sends the value
    bot.once("message", async (message) => {
      const approvegasprice = message.text;
      // Perform validation on the value if needed

      // Update the Max MC setting
      globalSettings.approvegasprice = approvegasprice;

      // Send a confirmation message
      bot
        .sendMessage(chatId, `Max Approve Price set to: ${approvegasprice}`)
        .catch((error) => console.error("Error sending message:", error));
    });
  }else if (data.startsWith("buyxtoken")) {
    const contractAddress = data.split(":")[1];
    const wallet = walletAddresses[activeWalletIndex];
  
    // Prompt the user to enter the amount of ETH
    bot.sendMessage(chatId, "Please enter the amount of ETH to swap:").then(() => {
      // Register a new message handler to capture the amount
      bot.once("message", async (message) => {
        const amount = message.text;
  
        // Validate the amount if needed
  
        try {
          // Generate the signer from the private key
          const signer = new ethers.Wallet(wallet.privateKey).connect(provider);
  
          // Perform the token swap
          const tx = await swapTokens(contractAddress, amount, signer);
  
          // Send a message with the transaction hash and Etherscan link
          const transactionHash = tx.hash;
          const etherscanLink = `https://etherscan.io/tx/${transactionHash}`;
          const message = `Token swap initiated!\n\nTransaction Hash: ${transactionHash}\n\nEtherscan: ${etherscanLink}`;
          bot.sendMessage(chatId, message);
  
          // Wait for the transaction to be confirmed
          const receipt = await tx.wait();
  
          // Send another message with the completed transaction link
          const completedTransactionHash = receipt.transactionHash;
          const completedEtherscanLink = `https://etherscan.io/tx/${completedTransactionHash}`;
          const completedMessage = `Token swap completed!\n\nTransaction Hash: ${completedTransactionHash}\n\nEtherscan: ${completedEtherscanLink}`;
          bot.sendMessage(chatId, completedMessage);
        } catch (error) {
          // Send an error message if the swap fails
          bot.sendMessage(chatId, "Token swap failed. Please try again.");
        }
      });
    });
  } else if (callbackData === "togglebuysellbtn") {
    toggleBuySell = !toggleBuySell;

    // Resend the message with the toggled buttons
    const chatId = query.message.chat.id;
    const message = query.message;

    let buttons = [
      [{ text: "Buy 0.1", callback_data: "buy_0.1" }],
      [{ text: "Buy 0.5", callback_data: "buy_0.5" }],
      [{ text: "Buy 0.05", callback_data: "buy_0.05" }],
      [{ text: "Buy X", callback_data: "buyxtoken" }],
    ];

    if (toggleBuySell) {
      buttons = [
        [{ text: "Sell 0.1", callback_data: "sell_0.1" }],
        [{ text: "Sell 0.5", callback_data: "sell_0.5" }],
        [{ text: "Sell 0.05", callback_data: "sell_0.05" }],
        [{ text: "Sell X", callback_data: "sellxtoken" }],
      ];
    }

    const opts = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Track", callback_data: "track" }],
          [{ text: "BSC", callback_data: "togglecontractchain" }],
          [{ text: "Main", callback_data: "activewallet" }],
          [{ text: "Buy<->Sell", callback_data: "togglebuysellbtn" }],
          ...buttons,
        ],
      }),
    };

    bot.sendMessage(chatId, message.text, opts);
  } else if (callbackData === "copytrade") {
    const chatId = query.message.chat.id;

    const opts = {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: `OFF`, callback_data: "toggle_copytrade" }],
          [{ text: "Add a wallet", callback_data: "addcopytradewallet" }],
        ],
      }),
    };

    bot.sendMessage(chatId, opts);
  } 
});

// Function to get contract information
async function getContractInfo(contractAddress) {
  try {
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

    // Get the balance of the token for the first wallet address
    let balance = "Wallet not connected";
    if (walletAddresses.length > 0) {
      // Get the balance of the token for the first wallet address
      balance = await contract.balanceOf(walletAddresses[0].address);
      balance = balance.toString();
    }
    // Retrieve gas price
    const gasPrice = await provider.getGasPrice();

    // Estimate gas fees for buying and selling on Uniswap
    const estimatedBuyGas = await estimateGasFees(contract, "buy");
    // const estimatedSellGas = await estimateGasFees(contract, "sell");

    // Get the Uniswap V2 pair contract
    const pairContract = new ethers.Contract(
      uniswapV2PairAddress,
      pairABI,
      provider
    );

    const tokenContract = new ethers.Contract(contractAddress, abi, provider);

    // Retrieve liquidity
    const liquidity = await tokenContract.balanceOf(uniswapV2PairAddress);

    // Calculate market cap
    const marketCap = liquidity
      .mul(totalSupply)
      .div(await pairContract.totalSupply());

    return {
      name: name,
      symbol: symbol,
      decimals: decimals,
      totalSupply: totalSupply.toString(),
      uniswapV2PairAddress: uniswapV2PairAddress,
      chain: chainId,
      balance: balance.toString(),
      gasPrice: ethers.utils.formatUnits(gasPrice, "gwei"),
      // gasPrice.toString(),
      estimatedBuyGas: estimatedBuyGas,
      // estimatedSellGas: estimatedSellGas,
      liquidity: liquidity.toString(),
      marketCap: marketCap.toString(),
    };
  } catch (error) {
    console.error("Error retrieving contract information:", error);
    return null;
  }
}

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
// Function to estimate gas fees for buying or selling on Uniswap
async function estimateGasFees(contract, action) {
  try {
    // Define the Uniswap router address
    const routerAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; // Enter the Uniswap router address

    // Define the token amount and slippage tolerance
    const amount = ethers.utils.parseUnits("100", "ether"); // Enter the desired token amount
    const slippageTolerance = 0.05; // 5% slippage tolerance

    // Get the token address
    const tokenAddress = contract.address;

    // Create a new instance of the Uniswap router contract
    const routerContract = new ethers.Contract(
      routerAddress,
      routerABI,
      provider
    );

    // Estimate gas fees
    const path = [tokenAddress, routerContract.WETH(), tokenAddress];
    const amountsOut = await routerContract.getAmountsOut(amount, path);
    const expectedAmountOut = amountsOut[amountsOut.length - 1];
    const slippageAmountOut = expectedAmountOut.mul(
      ethers.utils.parseUnits(slippageTolerance.toString(), "ether")
    );

    if (action === "buy") {
      // Estimate buy gas fees// Set a suitable gas limit for the transaction
      // Estimate buy gas fees
      const buyEstimate =
        await routerContract.estimateGas.swapExactETHForTokens(
          "0",
          path,
          walletAddresses[0].address,
          Date.now() + 1000 * 60 * 10, // 10 minutes
          { value: amountsOut[0], gasLimit: 500000 } // Set a suitable gas limit
        );
      return buyEstimate.toString();
    } else if (action === "sell") {
      // Estimate sell gas fees
      const gasLimit = 5000000; // Set a suitable gas limit for the transaction
      const sellEstimate = await contract.estimateGas.approve(
        routerAddress,
        amount,
        { gasLimit }
      );
      return sellEstimate.toString();
    }
  } catch (error) {
    console.error("Error estimating gas fees:", error);
    return null;
  }
}

// Handles when contract address is pasted
bot.on("message", async (message) => {
  const chatId = message.chat.id;
  const text = message.text;

  // Check if the message contains a contract address
  if (text.match(/^0x[a-fA-F0-9]{40}$/)) {
    const contractAddress = text.trim();

    // Get contract information
    const contractInfo = await getContractInfo(contractAddress);

    if (contractInfo) {
      let buttons = [
        [{ text: "Buy 0.1", callback_data: "buy_0.1" }],
        [{ text: "Buy 0.5", callback_data: "buy_0.5" }],
        [{ text: "Buy 0.05", callback_data: "buy_0.05" }],
        [{ text: "Buy X", callback_data: "buyxtoken:${contractAddress}" }],
      ];

      if (toggleBuySell) {
        buttons = [
          [{ text: "Sell 0.1", callback_data: "sell_0.1" }],
          [{ text: "Sell 0.5", callback_data: "sell_0.5" }],
          [{ text: "Sell 0.05", callback_data: "sell_0.05" }],
          [{ text: "Sell X", callback_data: "sellxtoken:${contractAddress}" }],
        ];
      }

      const activeWalletButton = walletAddresses.length === 0 ? "None" : walletNames[activeWalletIndex];

      const opts = {
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: "Track", callback_data: "track" }],
            [{ text: "BSC", callback_data: "togglecontractchain" }],
            [{ text: activeWalletButton, callback_data: "activewallet" }],
            [{ text: "Buy<->Sell", callback_data: "togglebuysellbtn" }],
            ...buttons,
          ],
        }),
      };

      const replyMessage = `Contract Information:\n\nName: ${contractInfo.name}\nSymbol: ${contractInfo.symbol}\nDecimals: ${contractInfo.decimals}\nTotal Supply: ${contractInfo.totalSupply}\nLP: ${contractInfo.uniswapV2PairAddress}\nChain: ${contractInfo.chain}\nBalance in Wallet: ${contractInfo.balance}\nGas Price: ${contractInfo.gasPrice}\nEstimated Buy Gas Fees: ${contractInfo.estimatedBuyGas}\nEstimated Sell Gas Fees: ${contractInfo.estimatedSellGas}\nMarket cap: ${contractInfo.marketCap}\nLiquidity: ${contractInfo.liquidity}`;

      bot.sendMessage(chatId, replyMessage, opts);
    } else {
      bot.sendMessage(chatId, "Failed to retrieve contract information.");
    }
  }
});

// Handle button callbacks
bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  // Check the button callback data
  if (data === "buy_0.1" || data === "buy_0.5") {
    // Get the contract address from the original message text
    const contractAddress = query.message.text.match(/^0x[a-fA-F0-9]{40}$/)[0];

    // Get contract information
    const contractInfo = await getContractInfo(contractAddress);

    if (contractInfo) {
      const amountInEth = data === "buy_0.1" ? 0.1 : 0.5;

      // Buy the token with the specified amount of ETH
      const buyResult = await buyToken(contractAddress, amountInEth);

      if (buyResult) {
        bot.sendMessage(
          chatId,
          `Successfully bought ${amountInEth} ETH worth of tokens.`
        );
      } else {
        bot.sendMessage(chatId, "Failed to buy tokens.");
      }
    } else {
      bot.sendMessage(chatId, "Failed to retrieve contract information.");
    }
  }
});

// Function to buy tokens
async function buyToken(contractAddress, amountInEth) {
  try {
    // Connect to the Ethereum network
    const provider = new ethers.providers.InfuraProvider(
      "mainnet",
      "YOUR_INFURA_PROJECT_ID"
    );
    const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);

    // Create a new instance of the token contract
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // Get the Uniswap router address
    const routerAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

    // Create a new instance of the Uniswap router contract
    const routerContract = new ethers.Contract(
      routerAddress,
      routerABI,
      signer
    );

    // Get the token path (ETH to token)
    const path = [ethers.constants.AddressZero, contractAddress];

    // Define the minimum amount of tokens you want to receive
    const minAmountOut = 0;

    // Define the deadline for the transaction
    const deadline = Math.floor(Date.now() / 1000) + 3600;

    // Prepare the transaction parameters
    const transactionParams = {
      value: ethers.utils.parseEther(amountInEth.toString()),
      gasLimit: 500000, // Set a suitable gas limit
      deadline: deadline,
      path: path,
      to: routerAddress,
      data: routerContract.interface.encodeFunctionData(
        "swapExactETHForTokens",
        [minAmountOut, path, signer.address, deadline]
      ),
    };

    // Sign and send the transaction
    const transactionResponse = await signer.sendTransaction(transactionParams);

    // Wait for the transaction to be mined
    const transactionReceipt = await transactionResponse.wait();

    // Transaction successful
    return true;
  } catch (error) {
    console.error("Error buying token:", error);
    return false;
  }
}

// Function to swap tokens on Uniswap
async function swapTokens(tokenInAddress, tokenOutAddress, amountIn, wallet) {
  try {
    const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/your-infura-project-id"); // Replace with your Infura Project ID or the desired Ethereum provider URL
    const signer = wallet.connect(provider);

    const uniswapRouter = new ethers.Contract(routerAddress, uniswap.RouterAbi, signer);

    // Get token instances
    const tokenIn = new uniswap.Token(uniswap.ChainId.MAINNET, tokenInAddress, 18);
    const tokenOut = new uniswap.Token(uniswap.ChainId.MAINNET, tokenOutAddress, 18);

    // Get token pair from the tokens
    const pair = uniswap.Fetcher.fetchPairData(tokenIn, tokenOut);

    // Get the route for the swap
    const route = new uniswap.Route([pair], tokenIn);

    // Calculate the amount out based on the desired amount in
    const amountOut = route.getAmountOut(ethers.utils.parseEther(amountIn));

    // Prepare the swap transaction
    const path = [tokenInAddress, tokenOutAddress];
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // Set the deadline to 20 minutes from now
    const amountInMin = 0; // Set the minimum acceptable amount of tokenIn
    const amountOutMin = amountOut.toExact(); // Use the calculated amountOut as the minimum acceptable amount of tokenOut

    // Approve the Router to spend the tokenIn
    const approveTx = await tokenIn.approve(routerAddress, ethers.constants.MaxUint256);
    await approveTx.wait();

    // Swap tokens
    const swapTx = await uniswapRouter.swapExactTokensForTokens(
      ethers.utils.parseEther(amountIn),
      ethers.utils.parseEther(amountOutMin),
      path,
      wallet.address,
      deadline
    );
    await swapTx.wait();

    console.log(`Swapped ${amountIn} ${tokenIn.symbol} for ${amountOutMin} ${tokenOut.symbol}`);
  } catch (error) {
    console.error("Failed to swap tokens:", error);
  }
}




