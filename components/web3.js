import Web3 from 'web3';

let web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('https://rinkeby.infura.io/hKOkGZCgS9FRiX2rUetf'));



export default web3;