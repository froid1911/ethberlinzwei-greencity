pragma solidity ^0.5.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./ECOin.sol";


contract BikingProject is Ownable {

  string public name;
  uint public minAmount;

  ECOin ecoin;

  constructor(string memory _name, uint _minAmount, address _tokenContract) public {
    name = _name;
    minAmount = _minAmount;
    ecoin = ECOin(_tokenContract);
  }

  function isFunded() public view returns(bool) {
    return ecoin.balanceOf(address(this)) > minAmount;
  }

  function burn() public onlyOwner returns (bool) {
    ecoin.burn(ecoin.balanceOf(address(this)));
    return true;
  }

}
