const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7999"));

// This is the account that submits the transaction
const sender_accounts = ["0xa1aa59f3980144daebd2252c709c997c880bc324", "0x1985e936fc36eabe24f9100517b13f7026ec938c", "0x45fc200f79b6ed7c424ef1d6d623797d13c4a813", "0xdd72c8f99e53fbe343eae4efcee31f720e08568f", "0x88ff728cd9ea8956fd1aaf71171ecde57c9a6aca", "0xf0864eb0d1dd7344b6b68a807bb6e7dcf91b5694", "0x514980540142ea7ee1c85df86504041a017e8c5e"];
const index = 1;

// This is the address of the lottery contract
// Not actually necessary when encoding parameters according to the ABI
const li_address = "0x7078b01170768c6dB7BD9f515305682e52664cd3";

// Amount of ETH sent by the lottery to the target addresses
const amount = web3.toWei(0.1);

// Submit transaction to the lottery contract;
// additional signatures may be needed before the transaction is executed
// If the transaction execution fails, it can be made to execute again calling executeTransaction
web3.eth.sendTransaction({from: sender_accounts[1], to: li_address, value: amount, gasPrice: 5000000000, gas: 100000});

