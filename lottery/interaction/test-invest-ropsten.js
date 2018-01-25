const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8544"));

// This is the account that submits the transaction
const sender_accounts = web3.eth.accounts;
const index = 0;

// This is the address of the lottery contract
// Not actually necessary when encoding parameters according to the ABI
const li_address = "0xc15fA2D549d15b86be168bF9C3a7134e9f0Ace2D";

// Amount of ETH sent by the lottery to the target addresses
const amount = web3.toWei(0.1);

// Submit transaction to the lottery contract;
// additional signatures may be needed before the transaction is executed
// If the transaction execution fails, it can be made to execute again calling executeTransaction
web3.eth.sendTransaction({from: sender_accounts[index], to: li_address, value: amount, gasPrice: 5000000000, gas: 100000});

