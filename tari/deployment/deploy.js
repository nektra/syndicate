const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// const web3 = new Web3(new Web3.providers.IpcProvider(config.ipc_file, net));

const ti_abi = require("./TariInvestment.abi.js");
const ti_bytecode = require("./TariInvestment.bin.js");

const account = "0x0F048ff7dE76B83fDC14912246AC4da5FA755cFE";

// Setup contract objects
const ti_contract = web3.eth.contract(ti_abi);
ti_contract.new({from: account, data: "0x" + ti_bytecode, gasPrice: 1000000000, gas: 5000000});
