/*
Installation requirements:
npm install debug elliptic
*/


const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.genKeyPair();


const {Blockchain, Transaction} = require('./blockchain');

const myChain = new Blockchain();