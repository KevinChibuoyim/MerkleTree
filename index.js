const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const { connect } = require("http2");

//Entering our addresses to whitelist. I'm whitelisting
// all 38 Web3Bridge cohort VII Students😄😃

const WhitelistedAddresses = [
  "0x2431d6E089d0D5230109F4824d656eBC648a319F",
  "0x4924Fb92285Cb10BC440E6fb4A53c2B94f2930c5",
  "0x4e9776985f2780c3c99Ff2D69C9AebD583F00ECE",
  "0x59b91DFDcd67408f7066B2B43aC77214b1EE1574",
  "0x617cd3DB0CbF26F323D5b72975c5311343e09115",
  "0xf4E32dA381e22d42cbB37EDfFBEdFf58ec9aDF59",
  "0xe3a5E5AaF23ce3e285950a81C663B1ae10de965a",
  "0x3CE75ACCAc8A648e1B2d405e3E14d8B2dA5f7656",
  "0xB632cAf3119860599ce162Fad8753fc4198037b4",
  "0xcb6f72152DB12546b21ef0dD5F614Ca532531838",
  "0x9A360d4aa258F55FcC7F7bC99E14A51f5F59093a",
  "0x7A3E0DFf9B53fA0d3d1997903A48677399b22ce7",
  "0xe61E4D6A5Bd95DD6384B0bfd6425616a16AF4AF1",
  "0xa5c63a3539756f4183Fc74DD94280Ad7517105CA",
  "0x52f519f0e80453673495ECa6898750936C39e6D3",
  "0x3B2200b3DfA63D121D475f6a406A0D6d205251B6",
  "0x88538EE7D25d41a0B823A7354Ea0f2F252AD0fAf",
  "0x321dde5a6eAE32EFf02F18acAb89e317AB5500A2",
  "0x3cE192073f8E5dbedd0ba821ceb66230581fF18c",
  "0xF0ccc8B440Bf013a37ef722530B1e4727a785CfA",
  "0xA03c6D5A1897e8D1fAD538AD13F32C9842b2Cfe9",
  "0xAeFf54F14693216fb9C6642af54095A6DA167710",
  "0x3669162D8794542b2D362FDb3a8CF3a61Cc69c14",
  "0x98eE8afbE8D362A762862c5CE00dd48Cbdd9CEfc",
  "0x097563363b7214A1b102073E19fd5e692CaB6381",
  "0xa68214f2FAEd1F227E99c3758969a05e2c64c550",
  "0x21c1229D4b781F4F7A95dEb4022B57f346af4CEF",
  "0xbBd2F1cDAe4C773478445Fd09772F88DDDe4BC88",
  "0x68a8bB406838f31fEe0aB89398355E71160fD11B",
  "0x87cB32C9aDa22321e1c02781C4d9A6B87eF02527",
  "0xB6E63c79B4dF12DF083f6Ca8AD56D655b63653b7",
  "0xC4fb5765AF541cFB525c9a5E2Ac3d34bcbf55636",
  "0xba4D0B07564F68777646E79A8a6fbc634ba70820",
  "0x6EaCc549C6378CA0506452899a1210060Ee71C20",
  "0x20497F37a8169c8C9fA09411F8c2CFB7c90dE5d1",
  "0x2DBdd859D9551b7d882e9f3801Dbb83b339bFFD7",
  "0xCb3416Fc84c0e9f72F169DD8e53dBc06220591BF",
  "0x049C780d7fa94AA70194eFC88ee109781eaeE1C2",
];

// Getting Our Respective Leaves by hashing Our Whitelisted Addresses.
// Going Forward to get our Roothash from the Merkle Tree too.

const leaves = WhitelistedAddresses.map((addr) => keccak256(addr));
const merkletree = new MerkleTree(leaves, keccak256, { sortPairs: true });
const MerkleRootHash = merkletree.getRoot().toString("hex");
console.log(merkletree.toString());

// Server-side of things
// Getting the Proof (Neighbor leaf hash and Parent Node hash needed for Verification)

const AddressToClaim = WhitelistedAddresses[0];
const HexProof = merkletree.getHexProof(AddressToClaim);
console.log(HexProof);

// verify the proof

const proofVerification = merkletree.verify(
  HexProof,
  AddressToClaim,
  MerkleRootHash
);
console.log(proofVerification);
