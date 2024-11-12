# Metacrafters ETH + AVAX Proof: Intermediate EVM Course Assessment - Smart Contract Management

This Solidity program is part of the assessment for the Metacrafter's ETH + AVAX Proof: Intermediate EVM Course. The purpose of this project is to create a simple contract with basic functionalities and display the values of its functions in the frontend application.

## Description

The contract allows users to update and purchase items in stock. Each item is stored with a unique ID, name, and stock quantity. The frontend displays current stock information, updates, and purchase actions, providing a user-friendly interface to interact with the contract functions.

# Getting Started

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: ```npm i```
2. Open two additional terminals in your VS code
3. In the second terminal type: ```npx hardhat node```
4. In the third terminal, type: ```npx hardhat run --network localhost scripts/deploy.js```
5. Back in the first terminal, type ```npm run dev``` to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

Afterwards, connect your MetaMask wallet, and interact with the contract through the provided interface.
* Use **Update Stock** with an item ID and stock quantity to set a new stock level.
* Use **Purchase Item** with an item ID and quantity to purchase items.

## Authors

[@noawhaha](https://github.com/noooooahh)

***SCM-Starter Template from: [@MetacrafterChris](https://github.com/MetacrafterChris)***
