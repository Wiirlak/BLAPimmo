const Migrations = artifacts.require("./Migrations");
const PropertyFactory = artifacts.require("./PropertyFactory");
const PropertyOwnership = artifacts.require("./PropertyOwnership");
const ownable = artifacts.require("./librairies/Ownable");
const safeMath = artifacts.require("./librairies/SafeMath");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(PropertyFactory);
  deployer.deploy(PropertyOwnership);
  deployer.deploy(ownable);
  deployer.deploy(safeMath);
};
