// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16;

import "./librairies/Ownable.sol";
import "./librairies/SafeMath.sol";

contract PropertyFactory is Ownable {

    using SafeMath for uint256;

    modifier onlyOwnerOf(uint _propertyId) {
        require(msg.sender == propertyToOwner[_propertyId]);
        _;
    }

    event NewProperty(uint propertyId, uint price);

    struct Property {
        uint price;
        string addr;
        string description;
        string addrSeller;
        string dateUtc;
    }

    Property[] public properties;

    mapping (uint => address) public propertyToOwner;
    mapping (address => uint) ownerPropertyCount;

    function createProperty(
        uint price,
        string memory addr,
        string memory description,
        string memory addrSeller,
        string memory dateUtc
    ) public {
        properties.push(Property(price, addr, description, addrSeller, dateUtc));
        uint id = properties.length + 1;
        propertyToOwner[id] = msg.sender;
        ownerPropertyCount[msg.sender] = ownerPropertyCount[msg.sender].add(1);
        emit NewProperty(id, price);
    }

}
