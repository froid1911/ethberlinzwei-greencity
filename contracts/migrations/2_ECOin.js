const ECOin = artifacts.require('ECOin');
const Greencity = artifacts.require('Greencity');

module.exports = function(deployer) {
//   deployer.deploy(ECOin);
  // deployer.deploy(ECOin).then(function() {
  //   let ecoin = ECOin.deployed();
  //   let greencity = deployer.deploy(Greencity);
  //   ecoin.addMinter(Greencity.address);
  //
  //   return greencity;
  // });

  var ecoin, gc;
  deployer.then(function() {
    // Create a new version of A
    return deployer.deploy(ECOin);
  }).then(function(instance) {
    ecoin = instance;
    // Get the deployed instance of B
    return deployer.deploy(Greencity);
  }).then(function(instance) {
    gc = instance;
    // Set the new instance of A's address on B via B's setA() function.
    return ecoin.addMinter(gc.address);
  }).then(function(res) {
    return gc.setToken(ecoin.address);
  });

};
