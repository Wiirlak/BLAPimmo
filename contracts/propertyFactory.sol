// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16;

import "./libraries/ownable.sol";
import "./libraries/safeMath.sol";

contract PropertyFactory is Ownable {

    using SafeMath for uint256;

    event NewProperty(uint propertyId, uint price);

    struct Property {
        uint price;
        string addr;
        string description;
        string addrSeller;
        string dateUtc;
    }

    Property[] public properties;

    mapping (uint => address) public PropertyToOwner;
    mapping (address => uint) ownerPropertyCount;

    function createProperty(uint price, string memory addr, string memory description, string memory addrSeller, string memory dateUtc) public {
        properties.push(Property(price, addr, description, addrSeller, dateUtc));
        uint id = properties.length + 1;
        PropertyToOwner[id] = msg.sender;
        ownerPropertyCount[msg.sender] = ownerPropertyCount[msg.sender].add(1);
        emit NewProperty(id, price);
    }

}
