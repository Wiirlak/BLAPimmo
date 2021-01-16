const PropertyOwnership = artifacts.require("PropertyOwnership");
const ethers = require("ethers");

contract("PropertyOwnership", accounts => {
  it("...should store the value 89.", async () => {
    const propertyOwnershipInstance = await PropertyOwnership.deployed();
    console.log(ethers.utils.formatBytes32String("hello world"));
    console.log(ethers.utils.formatBytes32String("242 faubourg saint antoine"));
    console.log(ethers.utils.formatBytes32String("grand appartement avec terrasse"));
    console.log(ethers.utils.formatBytes32String("2021-01-16T13:23:11Z"));
    // Set value of 89
    await propertyOwnershipInstance.createProperty(
      89, 12030, ethers.utils.formatBytes32String("hello world"),
      ethers.utils.formatBytes32String("242 faubourg saint antoine"),
      ethers.utils.formatBytes32String("grand appartement avec terrasse"),
      ethers.utils.formatBytes32String("2021-01-16T13:23:11Z"),
      { from: accounts[0], gas: 8000000 }
    );

    // Get stored value
    const storedData = await propertyOwnershipInstance.getProperty(1).call();
    console.log(storedData)
    assert.equal(storedData.surface, 12030);
  });
});
