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
const ms_interface = web3.eth.contract(ms_abi);
const ms_instance = ms_interface.at(ms_address);

// Id of the transaction that is to be confirmed
const transaction_id = 0;

// Confirm transaction in the multisig;
// additional signatures may be needed before the transaction is executed
// If the transaction execution fails, it can be made to execute again calling executeTransaction
// parameters.push({from: sender_account, gasPrice: 5000000000, gas: 300000});
// myInstance.submitTransaction.apply(parameters);
const confirm_data = ms_instance.confirmTransaction.getData(transaction_id);

console.log("Confirm data: " + confirm_data.toString());