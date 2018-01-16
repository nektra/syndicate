const Web3 = require("web3");
// const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const web3 = new Web3();

// This is the account that submits the transaction
// const sender_account = "0x54d9249C776C56520A62faeCB87A00E105E8c9Dc";

// This is the address of the multisig contract
// Not actually necessary when encoding parameters according to the ABI
const ms_address = "0x47fEfe4eDe7Cfc136659D3e3098A5FD1B8D99936";

// Construct interface of the wallet contract instance
const ms_abi = require("../deployment/MultiSigWallet.abi.js");
const ms_interface = eth.contract(ms_abi);
const ms_instance = ms_interface.at(ms_address);

// Address that must be called by the multisig contract
const target_address = "0x8ffC991Fc4C4fC53329Ad296C1aFe41470cFFbb3";
// Amount of ETH sent by the multisig to the target address
const value = web3.toWei(0.1);
// Data sent along in the call to the target address
const txn_data = 0;
// Order these parameters according to the solidity function signature
const parameters = [target_address, value, txn_data];

// Submit transaction to the multisig;
// additional signatures may be needed before the transaction is executed
// If the transaction execution fails, it can be made to execute again calling executeTransaction
// parameters.push({from: sender_account, data: "0x" + ms_bytecode, gasPrice: 5000000000, gas: 300000});
// ms_instance.submitTransaction.apply(parameters);
const transfer_data = ms_instance.submitTransaction.getData.apply(parameters);

console.log("Transfer data: " + transfer_data.toString());