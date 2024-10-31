# Metacrafters ETH + AVAX Proof: Intermediate EVM Course Assessment - Smart Contract Management

This project provides a Solidity smart contract and a React-based front end for tracking and adjusting a weight value on the blockchain. Users can add or remove weight and check if it falls within a specified range. This program was developed as part of the assessment for Metacrafter's ETH + AVAX Proof: Intermediate EVM Course, focusing on exploring Solidity and integrating front-end with ethers.js.

## Description

This Solidity smart contract allows users to set and manage a weight value in kilograms. The app allows users to add or remove weight, view the current weight, and verify whether it falls within the range of 90 to 110 kg. This application demonstrates the integration of smart contract functions with a front end, with MetaMask enabling users to connect their Ethereum accounts.

# Getting Started

## Requirements
* Node.js and npm
* MetaMask installed in your browser.
* Deploy the Solidity contract on a test network (e.g., using Remix or Hardhat).

## Setup and Installation

1. Clone this repository.
```
git clone https://github.com/noooooahh/MetacraftersEthAvaxAssessment2.git
```
2. Inside the project directory, in the terminal type: ```npm i```
4. Open two additional terminals in your VS code
5. In the second terminal type: ```npx hardhat node```
6. In the third terminal, type: ```npx hardhat run --network localhost scripts/deploy.js```
7. Back in the first terminal, type ```npm run dev``` to launch the front-end.

After this, the project will be running on your localhost. Typically at http://localhost:3000/

## Using the Application

1. **Connect Wallet:** Click "Please connect your MetaMask wallet" to connect your MetaMask account.
2. **Interact with Contract Functions:**
* **Add Weight:** Enter a value and click "Add Weight" to increase the weight.
* **Remove Weight:** Enter a value and click "Remove Weight" to decrease the weight.
* **Check Weight Status:** The app will display whether the weight falls within the range of 90 kg to 110 kg.

## Authors

[@noawhaha](https://github.com/noooooahh)


*Project Template by:* [@MetacrafterChris](https://github.com/MetacrafterChris)
