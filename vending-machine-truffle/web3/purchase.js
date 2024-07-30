const fs = require("fs");
const { Web3 } = require("web3");

const web3 = new Web3("http://127.0.0.1:9545/");

const contractABI = JSON.parse(
  fs.readFileSync("./build/contracts/VendingMachine.json")
).abi;
const contractAddress = "0x36B12844eF34316d304D916F46ba488AAA2FD756";

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function purchase() {
  try {
    const accounts = await web3.eth.getAccounts();
    const receiver = accounts[2];
    const amount = 1;
    const value = amount * 10 ** 18;

    await contract.methods
      .purchase(amount)
      .send({ from: receiver, value })
      .on("transactionHash", function (hash) {
        console.log("tx hash >>", hash);
      })
      .on("receipt", function (receipt) {
        console.log("tx receipt >>", receipt);
      })
      .on("error", console.error);

    const contractBalance = await contract.methods
      .cupcakeBalances(contractAddress)
      .call();

    const receiverBalance = await contract.methods
      .cupcakeBalances(receiver)
      .call();

    console.log(`contract : ${contractAddress} >> ${contractBalance}`);
    console.log(`receiver : ${receiver} >> ${receiverBalance}`);
  } catch (e) {
    console.log(e);
  }
}

purchase();
