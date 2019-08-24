pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";

contract ECOin is ERC20, ERC20Detailed, ERC20Mintable {
  constructor() ERC20Detailed("Greencity token ECOin", "ECO", 18) public {
  }
}
