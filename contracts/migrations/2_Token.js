const GCToken = artifacts.require("GCToken");

module.exports = function(deployer) {
  deployer.deploy(GCToken);
};
