'use strict';
const crypto = require('crypto');

class Block {
    /**
     * @param {number} timestamp
     * @param {data} data
     * @param {string} previousHash
     */
    constructor(timestamp, data, previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }

    /**
     * For more cryptography algorithms:
     * https://emn178.github.io/online-tools
     * 
     * @returns {string}
     */
    calculateHash() {
        return crypto
            .createHash('sha256')
            .update(
                this.previousHash +
                this.timestamp +
                this.data +
                this.nonce
            )
            .digest('hex');
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        console.log('Creating genesis block')
        return new Block(Date.parse('2017-01-01'), [], '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(block) {
        block.previousHash = this.getLatestBlock().hash;
        block.hash = block.calculateHash();
        this.chain.push(block);
        console.log('Added new block:', block.hash)
    }

    isChainValid() {
        console.log('Checking chain validity..')
        let realGenesis = JSON.stringify(this.createGenesisBlock());

        if (realGenesis !== JSON.stringify(this.chain[0])) {
            return false;
        }

        for (let i = 1; i < this.chain.length; i++) {
            let currentBlock = this.chain[i];
            let previousBlock = this.chain[i - 1];

            if (previousBlock.hash !== currentBlock.previousHash) {
                console.log('Hash of prev block not the same as previousHash of current block at block number', i)
                return false;
            }

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                console.log('Current block has is not reproducible at block number', i)
                return false;
            }
        }
        console.log('** Chain is valid **')
        return true;
    }
}

module.exports.Blockchain = Blockchain;
module.exports.Block = Block;
