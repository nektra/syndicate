pragma solidity ^0.4.19;

import "./Ownable.sol";

contract TariInvestment is Ownable {

  // Address of the target contract
  address public investmentAddress = 0x33eFC5120D99a63bdF990013ECaBbd6c900803CE;
  // Major partner address
  address public majorPartnerAddress = 0x8f0592bDCeE38774d93bC1fd2c97ee6540385356;
  // Minor partner address
  address public minorPartnerAddress = 0xC787C3f6F75D7195361b64318CE019f90507f806;
  // Record balances to allow refunding
  mapping(address => uint) public balances;
  // Total received. Used for refunding.
  uint public totalInvestment;
  // Available refunds. Used for refunding.
  uint public availableRefunds;
  // Deadline when refunding starts.
  uint public refundingDeadline;
  // Gas used for withdrawals.
  uint public withdrawal_gas;
  // States: Open for investments - allows investments and transfers,
  //         Refunding investments - any state can transition to refunding state
  enum State{Open, Refunding}


  State public state = State.Open;

  function TariInvestment() public {
    refundingDeadline = now + 4 days;
    set_withdrawal_gas(3000);
  }

  // Payments to this contract require a bit of gas. 100k should be enough.
  function() payable public {
    // Reject any value transfers once we have finished sending the balance to the target contract.
    require(state == State.Open);
    balances[msg.sender] += msg.value;
    totalInvestment += msg.value;
  }

  // Transfer some funds to the target investment address.
  function execute_transfer(uint transfer_amount, uint gas_amount) public onlyOwner {
    // Transferral of funds shouldn't be possible during refunding.
    require(state == State.Open);

    // Major fee is 1,50% = 15 / 1000
    uint major_fee = transfer_amount * 15 / 1000;
    // Minor fee is 1% = 10 / 1000
    uint minor_fee = transfer_amount * 10 / 1000;
    majorPartnerAddress.transfer.gas(gas_amount)(major_fee);
    minorPartnerAddress.transfer.gas(gas_amount)(minor_fee);

    // Send the rest
    investmentAddress.transfer.gas(gas_amount)(transfer_amount - major_fee - minor_fee);
  }

  // Convenience function to transfer all available balance.
  function execute_transfer_all() public onlyOwner {
    execute_transfer(this.balance);
  }

  // Refund an investor when he sends a withdrawal transaction.
  // Only available once refunds are enabled or the deadline for transfers is reached.
  function withdraw() public {
    if (state != State.Refunding) {
      require(refundingDeadline <= now);
      state = State.Refunding;
      availableRefunds = this.balance;
    }

    // withdrawal = availableRefunds * investor's share
    uint withdrawal = availableRefunds * balances[msg.sender] / totalInvestment;
    balances[msg.sender] = 0;
    msg.sender.transfer.gas(withdrawal_gas)(withdrawal);
  }

  // Convenience function to allow immediate refunds.
  function enable_refunds() public onlyOwner {
    state = State.Refunding;
  }

  // Sets the amount of gas allowed to withdrawers
  function set_withdrawal_gas(uint gas_amount) public onlyOwner {
    require(gas_amount >= 3000);
    withdrawal_gas = gas_amount;
  }

}
