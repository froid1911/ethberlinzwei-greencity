pragma solidity ^0.5.0;

import "./GCToken.sol";

contract Greencity {

  enum ChallengeStates {
    STARTED,
    FINISHED,
    CONFIRMED
  }

  struct Challenge {
    uint id;
    ChallengeStates state;
    address person;
  }

  mapping (address => Challenge) challenges;
  uint nextId;

  event ChallengeStarted(uint id);

  constructor() public {
    nextId = 1;
  }

  function startChallenge() public returns (uint id) {
    id = nextId;
    challenges[msg.sender] = Challenge(id, ChallengeStates.STARTED, msg.sender);
    nextId++;
    emit ChallengeStarted(id);
  }

}
