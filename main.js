/*
Installation requirements:
npm install debug elliptic
*/
const { Blockchain, Transaction } = require('./blockchain');


const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

let myKey = ec.genKeyPair();
let friendKey = ec.genKeyPair();

let myWalletAddress = myKey.getPublic('hex');
let friendWalletAddress = friendKey.getPublic('hex');

// Display the keys:
console.log('Public key:', myKey.getPublic('hex'));
console.log('Private key:', myKey.getPrivate('hex'));


// Create the blockchain
let myChain = new Blockchain();

// How much is in my wallet?
console.log('Wallet initial balance:',myChain.getBalanceOfAddress(myWalletAddress));

// What are the pending transactions?
console.log('Pending transactions',myChain.getAllTransactionsForWallet(myWalletAddress));

// Mine a new block, plance the reward in a transaction
// Otherwise, there will be no balance

myChain.minePendingTransactions(myWalletAddress);

//Create and add a transaction to send 10 BTC to friend's wallet

let tx = new Transaction(myWalletAddress, friendWalletAddress, 10);
tx.sign(myKey);

myChain.addTransaction(tx);

//Create a block for the new transaction
myChain.minePendingTransactions(myWalletAddress);

// How much is in my wallet?
console.log('My wallet balance after transaction:',myChain.getBalanceOfAddress(myWalletAddress));
console.log('Friend\'s wallet balance after transaction:',myChain.getBalanceOfAddress(friendWalletAddress));

// Let friend send money to my wallet

tx = new Transaction(friendWalletAddress, myWalletAddress, 5);
tx.sign(friendKey);

myChain.addTransaction(tx);

//Create a block for the new transaction
myChain.minePendingTransactions(friendWalletAddress);

// How much is in my wallet?
console.log('My wallet balance after transaction:',myChain.getBalanceOfAddress(myWalletAddress));
console.log('Friend\'s wallet balance after transaction:',myChain.getBalanceOfAddress(friendWalletAddress));


