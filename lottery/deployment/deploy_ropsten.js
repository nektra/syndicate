const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8544"));
// const web3 = new Web3(new Web3.providers.IpcProvider(config.ipc_file, net));

const ti_abi = require("./LotteryInvestment.abi.js");
const ti_bytecode = require("./LotteryInvestment.bin.js");

const account = "0x485de458fBCac6A7D35227842d652641384cB333";

// Setup contract objects
const ti_contract = web3.eth.contract(ti_abi);
ti_contract.new({from: account, data: "0x" + ti_bytecode, gasPrice: 12000000000, gas: 600000});
