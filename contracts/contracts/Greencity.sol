pragma solidity ^0.5.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./CityProjects.sol";
import "./ECOin.sol";

contract Greencity is Ownable {

  uint constant VERIFICATION_PERIOD = 2;
  uint constant VERIFICATION_REWARD = 2;

  enum ChallengeStates {
    STARTED,
    FINISHED,
    CONFIRMED
  }

  struct Challenge {
    ChallengeStates state;
    address person;
    uint prize;
    int confirmations;
    uint stopTime;
  }

  mapping (address => Challenge) challenges;

  ECOin ecoin;
  CityProjects cp;

  event ChallengeStarted(address challenger);
  event ChallengeStopped(address challenger, uint prize);
  event ChallengeVerfied(address verifier, address challenger, int confirmations, bool confirmed);
  event ChallengePayout(address challenger, uint prize);
  event TokenSet(address tokenContract);

  constructor() public {
  }

  function setToken(address _tokenContract) public onlyOwner {
    ecoin = ECOin(_tokenContract);
    // ecoin.addMinter(address(this));
    emit TokenSet(_tokenContract);
  }

  function startChallenge() public {
    challenges[msg.sender] = Challenge(ChallengeStates.STARTED, msg.sender, 0, 0, block.number);
    emit ChallengeStarted(msg.sender);
  }

  function stopChallenge(uint _prize) public {
    require (challenges[msg.sender].state == ChallengeStates.STARTED, "Challenge not in STARTED state");

    challenges[msg.sender].state = ChallengeStates.FINISHED;
    challenges[msg.sender].prize = _prize;
    challenges[msg.sender].confirmations = 1;
    challenges[msg.sender].stopTime = block.number;

    emit ChallengeStopped(msg.sender, challenges[msg.sender].prize);
  }

  function confirmChallange(address _challenger) public returns (int) {
    require(ecoin != ECOin(0), "Token contract not set");
    require(ecoin.isMinter(address(this)), "Not a minter");
    require (challenges[_challenger].state == ChallengeStates.FINISHED, "Challenge not in FINISHED state");

    challenges[_challenger].confirmations += 1;
    ecoin.mint(msg.sender, VERIFICATION_REWARD);
    emit ChallengeVerfied(msg.sender, _challenger, challenges[_challenger].confirmations, true);
    return challenges[_challenger].confirmations;
  }

  function rejectChallenge(address _challenger) public returns (int) {
    require(ecoin != ECOin(0), "Token contract not set");
    require(ecoin.isMinter(address(this)), "Not a minter");
    require (challenges[_challenger].state == ChallengeStates.FINISHED, "Challenge not in FINISHED state");

    challenges[_challenger].confirmations -= 1;
    ecoin.mint(msg.sender, VERIFICATION_REWARD);
    emit ChallengeVerfied(msg.sender, _challenger, challenges[_challenger].confirmations, false);
    return challenges[_challenger].confirmations;
  }

  function payoutChallenge() public {
    require(ecoin != ECOin(0), "Token contract not set");
    require(ecoin.isMinter(address(this)), "Not a minter");
    require(challenges[msg.sender].person != address(0), "No challenge");
    require (challenges[msg.sender].stopTime + VERIFICATION_PERIOD < block.number, "Verification period not elapsed");

    if (challenges[msg.sender].confirmations > 0) {
      ecoin.mint(msg.sender, challenges[msg.sender].prize);
      emit ChallengePayout(msg.sender, challenges[msg.sender].prize);
    } else {
      emit ChallengePayout(msg.sender, 0);
    }
    delete(challenges[msg.sender]);
  }

  function fundProject(uint _id, uint _amount) public {
    // require (_amount < ecoin.balanceOf(msg.sender), "Not enough funds");
    require (_amount < ecoin.allowance(msg.sender, address(this)), "Not enough allowance.");

    ecoin.burnFrom(msg.sender, _amount);
    cp.addFunds(_id, _amount);
  }


}
