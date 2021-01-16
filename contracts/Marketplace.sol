// SPDX-License-Identifier: MIT
pragma solidity = 0.8.0;

import "./PropertyFactory.sol";


contract Marketplace is PropertyFactory {
    using SafeMath for uint256;

    modifier onlyPropertyForSale(uint _propertyId) {
        require(IndexOf(_propertyId) >= 0);
        require(msg.value == properties[_propertyId].price);
        _;
    }

    event newSale(uint propertyId);
    event deletedSale(uint propertyId);

    uint[] public marketPlace;

    function addProperty(uint propertyId) public onlyOwnerOf(propertyId) {
        marketPlace.push(propertyId);
        emit newSale(propertyId);
    }

    function isForSale(uint propertyId) public view returns (bool _isForSale) {
        return IndexOf(propertyId) >= 0;
    }

    function getMarketPlace() public view returns (uint[] memory _marketPlace) {
        return marketPlace;
    }

    function removeProperty(uint propertyId) public onlyOwnerOf(propertyId) {
        int index = IndexOf(propertyId);
        if (index >= 0) {
            emit deletedSale(uint(propertyId));
            delete marketPlace[uint256(index)];
        }
    }

    function transaction(uint256 _tokenId) public payable onlyPropertyForSale(_tokenId) {
        address payable _from = payable(propertyToOwner[_tokenId]);
        _from.transfer(msg.value);
        ownerPropertyCount[_from] = ownerPropertyCount[_from].sub(1);
        ownerPropertyCount[msg.sender] = ownerPropertyCount[msg.sender].add(1);
        propertyToOwner[_tokenId] = msg.sender;
        removeProperty(_tokenId);
    }

    function IndexOf(uint value) private view returns(int) {
        for(uint index = 0; index < marketPlace.length; index++) {
            if (marketPlace[index] == value) {
                return int(index);
            }
        }
        return -1;
    }
}
