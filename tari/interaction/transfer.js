const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// This is the account that submits the transaction
const sender_account = "0x54d9249c776c56520a62faecb87a00e105e8c9dc";

// This is the address of the multisig contract
// Not actually necessary when encoding parameters according to the ABI
const ti_address = "0x47fEfe4eDe7Cfc136659D3e3098A5FD1B8D99936";

// Construct interface of the wallet contract instance
const ti_abi = require("../deployment/MultiSigWallet.abi.js");
const ti_interface = web3.eth.contract(ti_abi);
const ti_instance = ti_interface.at(ti_address);

// Amount of ETH sent by the multisig to the target address
const amount = web3.toWei(0.1);
// Order these parameters according to the solidity function signature
// const parameters = [];

// Submit transaction to the multisig;
// additional signatures may be needed before the transaction is executed
// If the transaction execution fails, it can be made to execute again calling executeTransaction
ti_instance.execute_transfer(amount, {from: sender_account, gasPrice: 41000000000, gas: 300000});

