const { Web3 } = require("web3");
const { toBigInt } = require("web3-utils");

const web3 = new Web3("http://127.0.0.1:9545/");

const decimal = 10 ** 18;
const example1 = 1000 * decimal;
const example2 = 1000000 * decimal;

function getBigNumberEx(num1, num2) {
  const value1 = toBigInt(BigInt(num1));
  console.log("value1:", value1.toString());
  const value2 = toBigInt(BigInt(num2));
  console.log("value2:", value2.toString());

  const add = value1 + value2;
  console.log("Sum:", add.toString());
}

getBigNumberEx(example1, example2);
