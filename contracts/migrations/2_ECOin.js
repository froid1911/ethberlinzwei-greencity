const ECOin = artifacts.require('ECOin');
const Greencity = artifacts.require('Greencity');
const CityProjects = artifacts.require('CityProjects');

module.exports = function(deployer) {

  var ecoin, gc, projects;
  deployer.deploy(CityProjects)
    .then(function(instance) {
      projects = instance;
      projects.newProject("Fix bicycle paths", 1000);
      projects.newProject("Build museum", 10000);
      return deployer.deploy(ECOin);
    }).then(function(instance) {
      ecoin = instance;
      return deployer.deploy(Greencity);
    }).then(function(instance) {
      gc = instance;
      return ecoin.addMinter(gc.address);
    }).then(function(res) {
      return gc.setToken(ecoin.address);
  });

};
