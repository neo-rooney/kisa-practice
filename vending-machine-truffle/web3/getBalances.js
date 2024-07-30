const fs = require("fs");
const { Web3 } = require("web3");

const web3 = new Web3("http://127.0.0.1:9545/");

const contractABI = JSON.parse(
  fs.readFileSync("./build/contracts/VendingMachine.json")
).abi;
const contractAddress = "0x36B12844eF34316d304D916F46ba488AAA2FD756";

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function getBalance() {
  const balanceBigInt = await contract.methods
    .cupcakeBalances(contractAddress)
    .call();
  const balanceNumber = Number(balanceBigInt);
  console.log("balance >>", balanceNumber);
}

getBalance();
