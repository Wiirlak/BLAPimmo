const Migrations = artifacts.require("./Migrations");
const PropertyOwnership = artifacts.require("./PropertyOwnership");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(PropertyOwnership);
};
