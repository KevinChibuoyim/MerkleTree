// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.9;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleTree {
    bytes32 public rootHash = 0x440b5b33ad7b21a8621c2c587ca0457d97145b5b588c34be4928a4d7dd90d6eb;

    mapping (address => bool) HaveClaimed;

    function VerifyIsWhitelistedAndClaim(bytes32[] calldata merkleproof) public{

        require(!HaveClaimed[msg.sender], "You have already claimed");

        // hash the caller's address and verify if it is part of our merkle tree and roothash
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleTree.verify(merkleproof,rootHash, leaf), "Invalid Proof, You Likely weren't whitelisted")

        // Mark an address that has claimed
        HaveClaimed[msg.sender] = true;
        
    }
}