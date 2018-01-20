const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// This is the account that submits the transaction
const sender_account = "0x54d9249c776c56520a62faecb87a00e105e8c9dc";

// For testing purposes
// const sender_account = "0xa1aa59f3980144daebd2252c709c997c880bc324";

// This is the address of the tari contract
// Not actually necessary when encoding parameters according to the ABI
const ti_address = "0x7078b01170768c6dB7BD9f515305682e52664cd3";

// Import specific transfer function ABI to cope with lack of overload resolution
const ti_abi = require("./TariTransfer.abi.js");
// Construct interface of the tari contract instance
const ti_interface = web3.eth.contract(ti_abi);
const ti_instance = ti_interface.at(ti_address);

// Amount of ETH sent by the tari to the target addresses
const amount = web3.toWei(0.1);

// Submit transaction to the tari contract;
// additional signatures may be needed before the transaction is executed
// If the transaction execution fails, it can be made to execute again calling executeTransaction
ti_instance.execute_transfer(amount, {from: sender_account, gasPrice: 5000000000, gas: 300000});

