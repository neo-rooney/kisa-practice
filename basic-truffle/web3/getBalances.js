const fs = require("fs");
const { Web3 } = require("web3");

const web3 = new Web3("http://127.0.0.1:9545/");

const contractABI = JSON.parse(
  fs.readFileSync("./build/contracts/MetaCoin.json")
).abi;
const contractAddress = "0x2A3660c9Bd08de390C01182FF15f6d6043de012b";

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function getBalance() {
  const accounts = await web3.eth.getAccounts();
  const defaultAccount = accounts[0];
  const balanceBigInt = await contract.methods
    .getBalance(defaultAccount)
    .call();
  const balanceNumber = Number(balanceBigInt);
  console.log("balance >>", balanceNumber);
}

getBalance();
