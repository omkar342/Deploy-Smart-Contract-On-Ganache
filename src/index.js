const solc = require("solc");
const fs = require("fs");
const Web3 = require("web3");

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545"));

const fileContent = fs
  .readFileSync(
    "C:/Complete Blockchain Development Bootcammp/Compiling Solidity Code on Local/src/hello.sol"
  )
  .toString();

console.log(fileContent);

const input = {
  language: "Solidity",
  sources: {
    "hello.sol": {
      content: fileContent,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const compoledContract = JSON.parse(solc.compile(JSON.stringify(input)));

console.log(compoledContract.contracts);

const ABI = compoledContract.contracts["hello.sol"]["SimpleContract"].abi;

const bytecode =
  compoledContract.contracts["hello.sol"]["SimpleContract"].evm.bytecode.object;

console.log("abi is", ABI);

console.log("Bytecode is", bytecode);

const contract = new web3.eth.Contract(ABI);

let defaultAccount;

web3.eth.getAccounts().then((account) => {
  console.log("Accounts:", account);
  defaultAccount = account[0];
  console.log("Default Account is ", defaultAccount);
});

contract
  .deploy({ data: bytecode })
  .send({ from: "0xfCFBeFb8aa9BfB132C0F27ae73A9184B081e1418", gas: 2000000 })
  .on("receipt", (receipt) => {
    console.log("Contract Address is ", receipt.contractAddress);
  });
//   .then((helloContract) => {
//     helloContract.methods.getNumber().call((err, data) => {
//       console.log(data);
//     });
//   });
