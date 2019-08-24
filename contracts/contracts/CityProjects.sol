pragma solidity ^0.5.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";


contract CityProjects is Ownable {

  struct Project {
    string name;
    uint minAmount;
    uint funding;
  }

  Project[] projects;

  function newProject(string memory _name, uint _minAmount) public onlyOwner returns (uint) {
    projects.push(Project(_name, _minAmount, 0));
    return projects.length;
  }

  function getLength() public view returns (uint) {
    return projects.length;
  }

  function editProject(uint _index, string memory _name, uint _minAmount, uint _funding) public onlyOwner {
    require(_index < projects.length, "Index out of bounds");

    projects[_index].name = _name;
    projects[_index].minAmount = _minAmount;
    projects[_index].funding = _funding;
  }

  function getFunding(uint _id) public view returns (uint) {
    require(_id < projects.length, "Id out of bounds");
    return projects[_id].funding;
  }

  function getMinAmount(uint _id) public view returns (uint) {
    require(_id < projects.length, "Id out of bounds");
    return projects[_id].minAmount;
  }

  function addFunds(uint _id, uint _amount) public returns(uint) {
    require(_id < projects.length, "Id out of bounds");
    require(_amount > 0, "Must be > 0");

    projects[_id].funding += _amount;
    return projects[_id].funding;
  }



}
