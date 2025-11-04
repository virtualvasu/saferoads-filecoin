// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/IncidentContract.sol";

contract CheckContractStatus is Script {
    function run() external view {
        // Deployed contract address (checksummed)
        address payable contractAddress = payable(0x07Bc74258668113A0116ac51FB3053108a633DaD);
        
        // Get the IncidentManager contract instance
        IncidentManager incidentManager = IncidentManager(contractAddress);
        
        // Get current reward amount
        uint256 rewardAmount = incidentManager.rewardAmount();
        console.log("=== INCIDENT CONTRACT STATUS ===");
        console.log("Contract address:", contractAddress);
        console.log("Reward amount:", rewardAmount, "wei");
        console.log("Reward amount in HBAR:", rewardAmount / 1 ether);
        
        // Calculate funding needed for 20 rewards
        uint256 fundingFor20 = rewardAmount * 20;
        console.log("\n=== FUNDING CALCULATION ===");
        console.log("Funding needed for 20 rewards:", fundingFor20, "wei");
        console.log("Funding needed for 20 rewards in HBAR:", fundingFor20 / 1 ether);
        
        // Check current contract balance
        uint256 currentBalance = incidentManager.getContractBalance();
        console.log("\n=== CURRENT BALANCE ===");
        console.log("Current contract balance:", currentBalance, "wei");
        console.log("Current contract balance in HBAR:", currentBalance / 1 ether);
        
        // Calculate how many rewards can currently be paid
        uint256 currentRewards = currentBalance / rewardAmount;
        console.log("Current rewards that can be paid:", currentRewards);
        
        // Show owner
        address owner = incidentManager.owner();
        console.log("\n=== CONTRACT OWNER ===");
        console.log("Contract owner:", owner);
        
        console.log("\n=== SUMMARY ===");
        console.log("- Each reward: 0.05 HBAR");
        console.log("- For 20 rewards need: 1.0 HBAR");
        console.log("- Current rewards available:", currentRewards);
        if (currentRewards < 20) {
            uint256 additionalNeeded = fundingFor20 - currentBalance;
            console.log("- Additional funding needed:", additionalNeeded / 1 ether, "HBAR");
        } else {
            console.log("- Contract is sufficiently funded for 20+ rewards!");
        }
    }
}