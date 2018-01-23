#!/usr/bin/python3 -i
from web3 import Web3, HTTPProvider
import json
import time

web3 = Web3(HTTPProvider('http://localhost:7999'))

eth = web3.eth

contract_name = "TariInvestment"

with open("build/" + contract_name + ".abi") as contract_abi_file:
  contract_abi = json.load(contract_abi_file)

#Comes as string without '0x'
contract_bin = open("build/" + contract_name + ".bin").read()
contract = eth.contract(contract_abi, bytecode=("0x" + contract_bin))

def trans(from_index=0, value=0):
  return {"from": eth.accounts[from_index], "value": value*(10**18), "gas": 7000000, "gasPrice": 0}

#params = [ [eth.accounts[1], eth.accounts[2], eth.accounts[3]], [40000, 30000, 30000] ]

dHash = contract.deploy(transaction=trans(0,0))

def receipt(tx_hash):
  return eth.getTransactionReceipt(tx_hash)

def status(tx_hash):
  print("Status:", eth.getTransactionReceipt(tx_hash)["status"])

def gas(tx_hash):
  print("Gas:", eth.getTransactionReceipt(tx_hash)["gasUsed"])

def addAddress():
  time.sleep(2)
  status(dHash)
  gas(dHash)
  contract.address = receipt(dHash).contractAddress
  print(contract_name, contract.address)

addAddress()

def buy(buyer_index, value):
  tx_hash = eth.sendTransaction({"from": eth.accounts[buyer_index], "value": value*(10**18), "gas": 200000, "gasPrice": 0, "to": contract.address})
  time.sleep(2)
  gas(tx_hash)

def transfer(amount, gas):
  tx_hash = contract.transact(trans()).execute_transfer(amount, gas)
  time.sleep(2)
  gas(tx_hash)

def transfer_all(gas):
  tx_hash = contract.transact(trans()).execute_transfer_all(gas)
  time.sleep(2)
  gas(tx_hash)

def withdraw(withdrawer_index):
  tx_hash = contract.transact(trans(withdrawer_index, 0)).withdraw()
  time.sleep(2)
  gas(tx_hash)

def enable_refunds():
  tx_hash = contract.transact(trans()).enable_refunds()
  time.sleep(2)
  gas(tx_hash)

def set_withdrawal_gas(gas):
  tx_hash = contract.transact(trans()).set_withdrawal_gas(gas)
  time.sleep(2)
  gas(tx_hash)

