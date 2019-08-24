const ECOin = artifacts.require('ECOin');
const Greencity = artifacts.require('Greencity');
const BikingProject = artifacts.require('BikingProject');

module.exports = function(deployer) {

  var ecoin, gc, project;

  deployer.deploy(ECOin)
    .then(function(instance) {
      ecoin = instance;
      return deployer.deploy(Greencity);
    }).then(function(instance) {
      gc = instance;
      return deployer.deploy(BikingProject, "Bike the city", 10000, ecoin.address);
    }).then(function(instance) {
      project = instance;
      return ecoin.addMinter(gc.address);
    }).then(function(res) {
      return gc.setToken(ecoin.address);
    }).then(function(res) {
      return gc.setProject(project.address);
    });


};
