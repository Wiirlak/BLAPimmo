// SPDX-License-Identifier: MIT
pragma solidity = 0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/PropertyOwnership.sol";

contract TestPropertyOwnership {

  function testItStoresAValue() public {
    PropertyOwnership propertyOwnership = PropertyOwnership(DeployedAddresses.PropertyOwnership());
    uint test = propertyOwnership.init();
    uint16 expectedSurface = 12030;

    Assert.equal(uint(propertyOwnership.getProperty(1).surface), uint(expectedSurface), "It should store the value 89.");
  }

}
