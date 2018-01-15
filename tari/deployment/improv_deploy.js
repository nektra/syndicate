const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// const web3 = new Web3(new Web3.providers.IpcProvider(config.ipc_file, net));

const ms_abi = require("./MultiSigWallet.abi.js");
const ms_bytecode = require("./MultiSigWallet.bin.js");

const multisig_owners = [ "0x0F048ff7dE76B83fDC14912246AC4da5FA755cFE", "0x8f0592bDCeE38774d93bC1fd2c97ee6540385356", "0x8ffC991Fc4C4fC53329Ad296C1aFe41470cFFbb3" ];
const account = "0x54d9249C776C56520A62faeCB87A00E105E8c9Dc";

// Setup contract objects
const MS_contract = web3.eth.contract(ms_abi);
MS_contract.new(multisig_owners, 2, {from: account, data: "0x" + ms_bytecode, gasPrice: 5000000000, gas: 2000000, nonce: 1449});
