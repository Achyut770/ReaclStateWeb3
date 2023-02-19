// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
contract ERC721Token is ERC721URIStorage {
  using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Achyut", "AA")  { }

    function MintNft(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    function totalSupply()external view returns(uint){
      return _tokenIds.current();
    }
    
}