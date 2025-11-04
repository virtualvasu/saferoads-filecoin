// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/IncidentContract.sol";

contract DeployIncidentContract is Script {
    function run() external {
        vm.startBroadcast();

        // Deploy IncidentManager contract
        IncidentManager incidentManager = new IncidentManager();
        console.log("IncidentManager deployed at:", address(incidentManager));

        // Get initial contract info
        console.log("Contract owner:", incidentManager.owner());
        console.log("Initial reward amount:", incidentManager.rewardAmount(), "wei");
        console.log("Contract balance:", incidentManager.getContractBalance(), "wei");

        vm.stopBroadcast();

        console.log("\n=== INCIDENT CONTRACT DEPLOYMENT SUMMARY ===");
        console.log("IncidentManager deployed at:", address(incidentManager));
        console.log("Owner:", incidentManager.owner());
        console.log("Reward amount: 0.05 ether");
        console.log("Contract ready for incident reporting!");
        console.log("\nNext steps:");
        console.log("1. Fund the contract with HBAR for rewards");
        console.log("2. Users can report incidents");
        console.log("3. Owner can verify incidents and pay rewards");
    }
}