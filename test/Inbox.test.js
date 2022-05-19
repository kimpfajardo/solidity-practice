const assert = require("assert");

const ganache = require("ganache-cli");

const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require("../compile");

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const initMessage = await inbox.methods.message().call();
    assert.equal(initMessage, "Hi there!");
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("Goodbye!").send({ from: accounts[0] });
    console.log("accounts[0]", accounts[0]);
    assert.equal(message, "Goodbye!");
  });
});

// class Car {
//   park() {
//     return "stopped";
//   }

//   drive() {
//     return "vroom";
//   }
// }

// let car;

// beforeEach(() => {
//   car = new Car();
// });

// describe("Car class", () => {
//   it("can park", () => {
//     assert.equal(car.park(), "stopped");
//   });

//   it("can drive", () => {
//     assert.equal(car.drive(), "vroom");
//   });
// });
