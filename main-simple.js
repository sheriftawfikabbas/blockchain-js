
const { Block } = require('./blockchain-simple');
const { Blockchain } = require('./blockchain-simple');

let supercoin = new Blockchain();

supercoin.addBlock(new Block('2023-01-01', 24))
supercoin.addBlock(new Block('2023-01-02', 50))

supercoin.isChainValid();