pragma solidity ^0.5.0;

import "./GCToken.sol";

contract Greencity {

  enum ChallengeStates {
    STARTED,
    FINISHED,
    CONFIRMED
  }

  struct Challenge {
    ChallengeStates state;
    address person;
    bytes ipfsLink;
    uint prize;
    int confirmed;
  }

  mapping (address => Challenge) challenges;

  event ChallengeStarted(address challenger);
  event ChallengeStopped(address challenger, uint prize, bytes ipfsLink);

  constructor() public {
  }

  function startChallenge() public {
    challenges[msg.sender] = Challenge(ChallengeStates.STARTED, msg.sender, "", 0, 0);
    emit ChallengeStarted(msg.sender);
  }

  function stopChallenge(uint _prize, bytes _ipfsLink) public {
    require (challenges[msg.sender] != null, "No active challenge");
    requrei (challenges[msg.sender].state == ChallengeStates.STARTED, "Challenge not in STARTED state");
    challenges[msg.sender].state = ChallengeStates.FINISHED;
    challenges[msg.sender].prize = _prize;
    challenges[msg.sender].ipfsLink = _ipfsLink;
    challenges[msg.sender].confirmed = 1;

    emit ChallengeStopped(msg.sender, challenges[msg.sender].prize, challenges[msg.sender].ipfsLink)
  }

  function confirmChallange(address challenger) public returns (uint) {
    challenges[msg.sender].confirmed += 1;
    return challenges[msg.sender].confirmed;
  }

  function rejectChallenge(address challenger) public returns (uint) {
    challenges[msg.sender].confirmed -= 1;
    return challenges[msg.sender].confirmed;
  }

}
