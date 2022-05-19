const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "upper meat six language worth cable stumble humor dog stadium ball keep",
  "https://rinkeby.infura.io/v3/ef5de846f30b48a4b6a8ea9ace59d601",
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account " + accounts[0]);

  const deployedContract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Contract initialized."] })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deployed to: ", deployedContract.options.address);
  provider.engine.stop()
};
deploy();
