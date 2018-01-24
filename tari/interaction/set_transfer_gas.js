const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7999"));

// This is the account that submits the transaction
const sender_accounts = ["0xa1aa59f3980144daebd2252c709c997c880bc324", "0x1985e936fc36eabe24f9100517b13f7026ec938c", "0x45fc200f79b6ed7c424ef1d6d623797d13c4a813", "0xdd72c8f99e53fbe343eae4efcee31f720e08568f", "0x88ff728cd9ea8956fd1aaf71171ecde57c9a6aca", "0xf0864eb0d1dd7344b6b68a807bb6e7dcf91b5694", "0x514980540142ea7ee1c85df86504041a017e8c5e"];
const index = 1;

// This is the address of the tari contract
// Not actually necessary when encoding parameters according to the ABI
const ti_address = "0x7078b01170768c6dB7BD9f515305682e52664cd3";

// Construct interface of the tari contract instance
const ti_abi = require("../deployment/TariInvestment.abi.js");
const ti_interface = web3.eth.contract(ti_abi);
const ti_instance = ti_interface.at(ti_address);

// Gas amount to be set
const gas = 3500;

ti_instance.set_transfer_gas(gas, {from: sender_accounts[1], gasPrice: 5000000000, gas: 300000});