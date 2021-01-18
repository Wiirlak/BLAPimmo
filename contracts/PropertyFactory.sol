// SPDX-License-Identifier: MIT
pragma solidity = 0.8.0;

import "./librairies/Ownable.sol";
import "./librairies/SafeMath.sol";

contract PropertyFactory is Ownable {

    using SafeMath for uint256;

    modifier onlyOwnerOf(uint _propertyId) {
        require(msg.sender == propertyToOwner[_propertyId]);
        _;
    }

    struct Property {
        uint32 price;
        uint16 surface;
        bytes32 addr;
        bytes32 name;
        string description;
        bytes32 dateUtc;
    }

    Property[] public properties;

    mapping (uint => address) public propertyToOwner;
    mapping (address => uint[]) public ownerToProperties;
    mapping (address => uint) ownerPropertyCount;

    function createProperty(
        uint32 price,
        uint16 surface,
        bytes32 name,
        bytes32 addr,
        string memory description,
        bytes32 dateUtc
    ) public {
        properties.push(Property(price, surface, addr, name, description, dateUtc));
        uint id = properties.length;
        propertyToOwner[id] = msg.sender;
        ownerToProperties[msg.sender].push(id);
        ownerPropertyCount[msg.sender] = ownerPropertyCount[msg.sender].add(1);
    }

    function getProperty(uint propertyId) public view returns (Property memory _property) {
        require(properties.length > propertyId);
        return properties[propertyId];
    }

    function getPropertiesByOwner() public view returns (uint[] memory _properties) {
        return ownerToProperties[msg.sender];
    }

}
