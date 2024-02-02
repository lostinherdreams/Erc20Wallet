import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";

import { BigNumber, ethers } from "ethers";

let abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

let contract;
let account;
let warns = 0;

async function setup() {
  let accounts = await ethereum.request({
    method: "eth_requestAccounts",
    params: [],
  });
  account = accounts[0];
  let contractAddress = "0xe12b7d60edbffae448b8451abad4ed799f54a388";
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, abi, signer);
}

export async function balance() {
  await setup();
  let result = await contract.balanceOf(account);
  document.getElementById(
    "balance_txt"
  ).innerText = `Your balance is: ${beautifulize(result)} MAH`;
}

window.ethereum.on("accountsChanged", async () => {
  await setup();
  await balance();
});

function beautifulize(number) {
  let s = String(number);
  return s.substring(0, s.length - 18) + "." + s.substring(s.length - 17);
}

async function checkWarning(input) {
  if (input.value === "") {
    let warningInput = document.getElementById("warning");

    warningInput.style.visibility = "visible";
    input.style.background = "rgb(249 196 175)";
    warns++;
    return false;
  } else {
    if (warns == 0) {
      let warningInput = document.getElementById("warning");
      warningInput.style.visibility = "hidden";
    }
    input.style.background = "#ececec";
    return true;
  }
}

export async function transfer() {
  let button = document.getElementById("transfer");
  button.style.background = "#0077b6";

  let loader = document.getElementById("loader");
  loader.style.visibility = "visible";
  await setup();
  warns = 0;
  let amountInput = document.getElementById("amount");
  let amount = String(amountInput.value);

  let transfertoInput = document.getElementById("to");
  let transferto = transfertoInput.value;

  if (
    !(await checkWarning(amountInput)) ||
    !(await checkWarning(transfertoInput))
  ) {
    loader.style.visibility = "hidden";
    return;
  }

  let balances = String(await contract.balanceOf(account));
  amount = String(amount);

  if (BigNumber.from(amount).gt(BigNumber.from(balances))) {
    let warningInput = document.getElementById("warning");
    if (warningInput.innerText == "") {
      warningInput.innerText = "You dont have enough Mah in your account !";
      warningInput.style.fontSize = "15px";
      warningInput.style.color = "#c84444";
      warningInput.style.visibility = "visible";
    }
    loader.style.visibility = "hidden";
    return;
  }

  try {
    let result = await contract.transfer(transferto, amount);
    loader.style.visibility = "hidden";
    button.style.background = "#0d9644";
    console.log(result);

    setTimeout(function () {
      alert(`transaction hash: ${result.hash}`);
    }, 2000);

    balance();
  } catch (error) {
    console.error("Error:", error.message);
    alert(`Error: ${error.message}`);
    loader.style.visibility = "hidden";
    alert("SOMTHING WENT WRONG!");
  }
}

document.getElementById("balance").addEventListener("click", balance);
document.getElementById("transfer").addEventListener("click", transfer);
