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

    function init() public returns(uint index) {
        properties.push(Property(250000, 50,
            0x32343220666175626f757267207361696e7420616e746f696e65000000000000,
            0x68656c6c6f20776f726c64000000000000000000000000000000000000000000,
            "appartement avec terrasse",
            0x323032312d30312d31365431333a32333a31315a000000000000000000000000
            )
        );
        return 1;
    }

    function createProperty(
        uint32 price,
        uint16 surface,
        bytes32 name,
        bytes32 addr,
        string memory description,
        bytes32 dateUtc
    ) public {
        properties.push(Property(price, surface, addr, name, description, dateUtc));
        uint id = properties.length + 1;
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
