pragma solidity ^0.4.19;

import "./Ownable.sol";

// The owner of this contract should be an externally owned account
contract TariInvestment is Ownable {

  // Address of the target contract
  address public investment_address = 0x33eFC5120D99a63bdF990013ECaBbd6c900803CE;
  // Major partner address
  address public major_partner_address = 0x8f0592bDCeE38774d93bC1fd2c97ee6540385356;
  // Minor partner address
  address public minor_partner_address = 0xC787C3f6F75D7195361b64318CE019f90507f806;
  // Record balances to allow refunding
  mapping(address => uint) public balances;
  // Total received. Used for refunding.
  uint public total_investment;
  // Available refunds. Used for refunding.
  uint public available_refunds;
  // Deadline when refunding starts.
  uint public refunding_deadline;
  // Gas used for withdrawals.
  uint public withdrawal_gas;
  // States: Open for investments - allows investments and transfers,
  //         Refunding investments - any state can transition to refunding state
  enum State{Open, Refunding}


  State public state = State.Open;

  function TariInvestment() public {
    refunding_deadline = now + 4 days;
    // Withdrawal gas is added to the 2300 call stipend by the EVM (if it has non-zero value).
    set_withdrawal_gas(1000);
  }

  // Payments to this contract require a bit of gas. 100k should be enough.
  function() payable public {
    // Reject any value transfers once refunding stage has been entered.
    require(state == State.Open);
    balances[msg.sender] += msg.value;
    total_investment += msg.value;
  }

  // Transfer some funds to the target investment address.
  function execute_transfer(uint transfer_amount, uint gas) public onlyOwner {
    // Transferral of funds shouldn't be possible during refunding.
    require(state == State.Open);

    // Major fee is 1,50% = 15 / 1000
    uint major_fee = transfer_amount * 15 / 1000;
    // Minor fee is 1% = 10 / 1000
    uint minor_fee = transfer_amount * 10 / 1000;

    // These calls give no opportunity of reentrancy as long as the owner is not a contract.
    require(major_partner_address.call.gas(gas).value(major_fee)());
    require(minor_partner_address.call.gas(gas).value(minor_fee)());

    // Send the rest
    require(investment_address.call.gas(gas).value(transfer_amount - major_fee - minor_fee)());
  }

  // Convenience function to transfer all available balance.
  function execute_transfer_all(uint gas) public onlyOwner {
    execute_transfer(this.balance, gas);
  }

  // Refund an investor when he sends a withdrawal transaction.
  // Only available once refunds are enabled or the deadline for transfers is reached.
  function withdraw() public {
    // Ensure refunding state can be reached if there is no owner intervention.
    if (state != State.Refunding) {
      require(refunding_deadline <= now);
      enable_refunds_internal();
    }

    // withdrawal = available_refunds * investor's share
    uint withdrawal = available_refunds * balances[msg.sender] / total_investment;
    balances[msg.sender] = 0;
    // Call is made at the end to ensure observable state of the contract is final
    require(msg.sender.call.gas(withdrawal_gas).value(withdrawal)());
  }

  // Convenience function to allow immediate refunds.
  function enable_refunds() public onlyOwner {
    enable_refunds_internal();
  }

  // Implements transition to refunding state.
  function enable_refunds_internal() private {
    state = State.Refunding;
    available_refunds = this.balance;
  }

  // Sets the amount of gas allowed to withdrawers
  function set_withdrawal_gas(uint gas) public onlyOwner {
    withdrawal_gas = gas;
  }

}
