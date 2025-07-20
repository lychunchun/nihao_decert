// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "forge-std/Script.sol";
import "../src/MyToken.sol"; // Adjust path if your contract is in a different location

contract DeployMyTokenScript is Script {
    function run() public returns (MyToken) {
        // Load your private key from an environment variable for security
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting transactions from your address
        vm.startBroadcast(deployerPrivateKey);

        // Deploy your MyToken contract with a name and symbol
        MyToken myToken = new MyToken("MyAwesomeToken", "MAT");

        // Stop broadcasting
        vm.stopBroadcast();

        console.log("MyToken deployed to:", address(myToken));
        return myToken;
    }
}