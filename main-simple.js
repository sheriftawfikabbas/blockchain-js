
const { Block } = require('./blockchain-simple');
const { Blockchain } = require('./blockchain-simple');

// b1 = new Block('2023-10-09','Sherif sends $1000 to Ivan');
// b2 = new Block(872387438247327, 'Ivan sends Sherif $100',b1.hash)
// console.log('First block',b1);
// console.log('Second block',b2);

let supercoin = new Blockchain();

supercoin.addBlock(new Block('2023-01-01', 24))
supercoin.addBlock(new Block('2023-01-02', 50))

console.log(supercoin)

supercoin.isChainValid();