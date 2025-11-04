// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/IncidentContract.sol";

contract FundIncidentContract is Script {
    function run() external {
        // Deployed contract address (checksummed)
        address payable contractAddress = payable(0x07Bc74258668113A0116ac51FB3053108a633DaD);
        
        vm.startBroadcast();

        // Get the IncidentManager contract instance
        IncidentManager incidentManager = IncidentManager(contractAddress);
        
        // Get current reward amount
        uint256 rewardAmount = incidentManager.rewardAmount();
        console.log("Current reward amount:", rewardAmount, "wei");
        console.log("Current reward amount in ether:", rewardAmount / 1 ether, "HBAR");
        
        // Calculate funding for 20 rewards
        uint256 fundingAmount = rewardAmount * 20;
        console.log("Funding amount for 20 rewards:", fundingAmount, "wei");
        console.log("Funding amount in ether:", fundingAmount / 1 ether, "HBAR");
        
        // Check current contract balance
        uint256 currentBalance = incidentManager.getContractBalance();
        console.log("Current contract balance:", currentBalance, "wei");
        
        // Fund the contract
        (bool success, ) = payable(contractAddress).call{value: fundingAmount}("");
        require(success, "Failed to fund contract");
        
        // Verify new balance
        uint256 newBalance = incidentManager.getContractBalance();
        console.log("New contract balance:", newBalance, "wei");
        console.log("New contract balance in ether:", newBalance / 1 ether, "HBAR");
        
        // Calculate how many rewards can be paid
        uint256 totalRewards = newBalance / rewardAmount;
        console.log("Total rewards that can be paid:", totalRewards);

        vm.stopBroadcast();

        console.log("\n=== CONTRACT FUNDING SUMMARY ===");
        console.log("Contract address:", contractAddress);
        console.log("Reward amount: 0.05 HBAR");
        console.log("Funded amount:", fundingAmount / 1 ether, "HBAR");
        console.log("Total available rewards:", totalRewards);
        console.log("Contract successfully funded!");
    }
}