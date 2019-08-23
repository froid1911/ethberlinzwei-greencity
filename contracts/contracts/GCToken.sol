pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";

contract GCToken is ERC20, ERC20Detailed, ERC20Mintable {
  constructor() ERC20Detailed("Greencity token", "GCT", 18) public {
  }
}
