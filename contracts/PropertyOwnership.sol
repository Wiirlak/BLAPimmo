// SPDX-License-Identifier: MIT
pragma solidity = 0.8.0;

import "./librairies/ERC721.sol";
import "./librairies/SafeMath.sol";
import "./Marketplace.sol";


contract PropertyOwnership is Marketplace, ERC721 {

    using SafeMath for uint256;

    mapping (uint => address) saleApprovals;

    function balanceOf(address _owner) public override view returns (uint256 _balance) {
        return ownerPropertyCount[_owner];
    }

    function ownerOf(uint256 _tokenId) public override view returns (address _owner) {
        return propertyToOwner[_tokenId];
    }

    function transfer(address _to, uint256 _tokenId) public override onlyOwnerOf(_tokenId) {
        _transfer(msg.sender, _to, _tokenId);
    }

    function approve(address _to, uint256 _tokenId) public override onlyOwnerOf(_tokenId) {
        saleApprovals[_tokenId] = _to;
        emit Approval(msg.sender, _to, _tokenId);
    }

    function takeOwnership(uint256 _tokenId) public override {
        require(saleApprovals[_tokenId] == msg.sender);
        address owner = ownerOf(_tokenId);
        _transfer(owner, msg.sender, _tokenId);
    }

    function _transfer(address _from, address _to, uint256 _tokenId) private {
        ownerPropertyCount[_to] = ownerPropertyCount[_to].add(1);
        ownerPropertyCount[msg.sender] = ownerPropertyCount[msg.sender].sub(1);
        propertyToOwner[_tokenId] = _to;
        emit Transfer(_from, _to, _tokenId);
    }
}
