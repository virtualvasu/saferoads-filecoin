<p align="center">
    <img src="dapp/public/logo.png" alt="SafeRoads Filecoin Logo" width="90" height="90" />
</p>

# SafeRoads Filecoin

<p align="center">
    <strong>Part of the <a href="https://github.com/aspiringsecurity/EthTransport">EthTransport</a> ecosystem</strong>
    <br>
    <em>A comprehensive blockchain-powered transportation safety and management platform</em>
</p>

## Table of Contents

- [About EthTransport](#-about-ethtransport)
- [Problem](#problem)
- [Solution](#solution)
- [Deployment & Demo](#deployment--demo)
- [Smart Contracts on Filecoin Testnet](#smart-contracts-on-filecoin-testnet)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Decentralized Storage with Storacha](#decentralized-storage-with-storacha)

> Turning "why should I report?" into "heck yes, I'll report!" — powered by Filecoin

SafeRoads Filecoin is a decentralized platform built on **Filecoin** that rewards citizens for reporting real road incidents — potholes, accidents, or other road hazards — and stores them **on-chain for transparency**.  
Once verified, reporters earn **FIL tokens** for their contribution to safer cities.

## 🚀 About EthTransport

SafeRoads Filecoin is developed as part of the **[EthTransport](https://github.com/aspiringsecurity/EthTransport)** ecosystem - a comprehensive blockchain-powered transportation safety and management platform. EthTransport leverages multiple blockchain networks to create innovative solutions for:

- **🛣️ Road Safety Management** - Incident reporting and verification systems (this project)
- **🚗 Vehicle Tracking & Analytics** - Blockchain-based vehicle monitoring and data analysis
- **🎫 Smart Ticketing Systems** - Decentralized transportation payment solutions
- **📊 Traffic Analytics** - Data-driven insights for urban planning and safety improvements

This SafeRoads implementation specifically focuses on **Filecoin's decentralized storage capabilities** combined with **Storacha** for permanent, tamper-proof incident documentation. It demonstrates how Filecoin's unique storage-focused blockchain can solve real-world transportation challenges while incentivizing civic participation.

**🔗 Explore the full EthTransport ecosystem:** [https://github.com/aspiringsecurity/EthTransport](https://github.com/aspiringsecurity/EthTransport)

## Problem

In busy metro cities like **New Delhi**, road issues are everywhere — but no one reports them.  
People don't have time, there's no incentive, and existing systems lack transparency.  
As a result, governments don't get reliable data, and citizens stop caring.

---

## Solution

SafeRoads Filecoin makes civic participation **rewarding and verifiable**.

- Citizens report road incidents through a simple **dApp** (location + image + description).  
- Reports are recorded on the **Filecoin blockchain**, ensuring public visibility and immutability.  
- Verified reports earn **FIL token rewards**.  
- Fast blockchain performance with Filecoin's robust network infrastructure.

---

## Deployment & Demo

- **Deployment link of main dapp:**  
    [Coming Soon - Filecoin Deployment]

- **Demo screencasts of the dapp:**  
    [Demo Links Coming Soon]

---

## Smart Contracts on Filecoin Testnet

SafeRoads Filecoin uses a smart contract deployed on the Filecoin Calibration testnet:

### 1. IncidentContract
- **Contract Address:** `0xE1a2345FAD5080440AeDcf1616a043E93747eeD5`
- **Block Explorer:** [https://calibration.filscan.io/en/address/0xE1a2345FAD5080440AeDcf1616a043E93747eeD5/](https://calibration.filscan.io/en/address/0xE1a2345FAD5080440AeDcf1616a043E93747eeD5/)
- **Purpose:** This is the main contract for the dApp. It manages the full lifecycle of incident reporting: accepting new reports, storing incident data, keeping a record of reporters, and distributing FIL rewards to verified users. All actions are recorded on-chain for transparency and auditability with Filecoin's reliable blockchain infrastructure.

---

## Key Features

### ⚡ Filecoin Benefits
- **Decentralized Storage**: Built-in decentralized storage capabilities with IPFS integration
- **EVM Compatibility**: Full Ethereum Virtual Machine compatibility for seamless dApp development  
- **Robust Network**: Secure and reliable blockchain infrastructure
- **Web3 Storage**: Native integration with decentralized storage solutions

### 🏗️ Three-Component Architecture
1. **Citizen Reporter Interface** (`/dapp`) - For reporting new incidents
2. **Incident Verification Dashboard** (`/incident-verification`) - For authorities to verify and reward reports  
3. **Smart Contract System** (`/contracts`) - Managing incidents and rewards on Filecoin blockchain

### 📱 User Experience
- **Wallet Integration** - Connect MetaMask to Filecoin Calibration testnet
- **Incident Wizard** - Step-by-step guided reporting process
- **PDF Generation** - Professional incident reports with embedded metadata
- **IPFS Storage** - Decentralized document storage via Storacha
- **Real-time Dashboard** - Track incident status and earnings
- **Authority Portal** - Streamlined verification interface for officials

---

## Getting Started

### Prerequisites
- Node.js 18+
- Foundry/Forge for smart contracts
- MetaMask wallet configured for Filecoin Calibration testnet
- Storacha account for IPFS storage

### Quick Setup

```bash
# Clone the repo
git clone https://github.com/virtualvasu/road-incident-dapp-hedera.git
cd road-incident-dapp-hedera

# Deploy smart contracts
cd contracts
forge build
forge script script/Deploy.s.sol --rpc-url https://api.calibration.node.glif.io/rpc/v1 --broadcast

# Install and run citizen dapp
cd ../dapp
npm install
npm run dev
# Opens at http://localhost:5173

# Install and run verification portal
cd ../incident-verification
npm install  
npm run dev
# Opens at http://localhost:5174
```

### Filecoin Testnet Configuration
Add Filecoin Calibration testnet to your wallet:
- **Network Name**: Filecoin Calibration Testnet
- **RPC URL**: `https://api.calibration.node.glif.io/rpc/v1`
- **Chain ID**: 314159
- **Currency Symbol**: tFIL
- **Block Explorer**: `https://calibration.filscan.io/`

---

## Technology Stack

- **Blockchain**: Filecoin (Calibration Testnet)
- **Smart Contracts**: Solidity ^0.8.28 with Foundry
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS 4.1
- **Web3**: Ethers.js 6.14 for blockchain interaction
- **Storage**: IPFS via Storacha (@web3-storage/w3up-client)
- **PDF Generation**: pdf-lib for document creation
- **Icons**: Lucide React

---

## Decentralized Storage with Storacha

SafeRoads leverages **Storacha** (formerly web3.storage) for enterprise-grade decentralized storage of incident evidence files on IPFS.

### 📁 How We Use Storacha

**Professional Document Storage Pipeline:**
1. **PDF Generation**: Each incident report automatically generates a professional PDF with embedded metadata, timestamps, and location data
2. **IPFS Upload**: Documents are uploaded to IPFS via Storacha's reliable infrastructure
3. **Hash Storage**: IPFS content hashes are stored on-chain in the smart contract for permanent reference
4. **Global Accessibility**: Files become accessible globally through IPFS network with built-in redundancy

### 🔐 Benefits of Storacha Integration

- **Permanent Storage**: Files stored on IPFS remain accessible forever through content addressing
- **Enterprise Reliability**: Storacha provides enterprise-grade IPFS pinning with guaranteed availability
- **Cost Effective**: Decentralized storage eliminates expensive cloud storage fees
- **Legal Compliance**: Cryptographically verifiable documents suitable for court proceedings
- **Censorship Resistant**: No single point of failure or control over stored evidence files

### 💡 Technical Implementation

```typescript
// Upload incident PDF to IPFS via Storacha
const uploadToIPFS = async (pdfBlob: Blob) => {
  const client = await w3up.create();
  const space = await client.createSpace('incident-reports');
  const file = new File([pdfBlob], 'incident-report.pdf');
  const cid = await client.uploadFile(file);
  return `https://${cid}.ipfs.w3s.link`;
};
```

This ensures all incident evidence is stored immutably and remains accessible even if the dApp frontend goes offline.

---

## User Workflows

### 👥 Citizen Reporting Flow
1. **Connect Wallet** - Link MetaMask to Filecoin Calibration testnet
2. **Report Incident** - Fill out incident details, location, photos
3. **Generate Documentation** - System creates professional incident reports
4. **IPFS Upload** - Documents stored on decentralized storage
5. **Blockchain Record** - Incident submitted to Filecoin smart contract
6. **Track & Earn** - Monitor verification status and earn FIL rewards

### 🏛️ Authority Verification Flow
1. **Owner Access** - Connect as contract owner/authorized verifier
2. **Review Dashboard** - Browse all unverified incident reports
3. **Evidence Analysis** - Review details, documentation, and proof
4. **Verification Decision** - Mark legitimate incidents as verified
5. **Automatic Rewards** - System distributes FIL rewards to reporters

---

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Built with ⚡ on Filecoin for safer roads*