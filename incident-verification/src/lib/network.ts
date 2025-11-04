// Network Configuration
// This file contains network settings for the incident verification app

export interface NetworkConfig {
  chainId: number;
  chainIdHex: string;
  name: string;
  rpcUrl: string;
  blockExplorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

// Filecoin Calibration Testnet Configuration
export const FILECOIN_CALIBRATION: NetworkConfig = {
  chainId: 314159,
  chainIdHex: '0x4cb2f',
  name: 'Filecoin Calibration Testnet',
  rpcUrl: 'https://api.calibration.node.glif.io/rpc/v1',
  blockExplorerUrl: 'https://calibration.filscan.io',
  nativeCurrency: {
    name: 'Testnet Filecoin',
    symbol: 'tFIL',
    decimals: 18,
  },
};

// Filecoin Mainnet Configuration
export const FILECOIN_MAINNET: NetworkConfig = {
  chainId: 314,
  chainIdHex: '0x13a',
  name: 'Filecoin Mainnet',
  rpcUrl: 'https://api.node.glif.io/rpc/v1',
  blockExplorerUrl: 'https://filscan.io',
  nativeCurrency: {
    name: 'Filecoin',
    symbol: 'FIL',
    decimals: 18,
  },
};

// Default network (currently Filecoin Calibration Testnet)
export const DEFAULT_NETWORK = FILECOIN_CALIBRATION;

// Helper function to add/switch network in MetaMask
export const addNetworkToMetaMask = async (network: NetworkConfig): Promise<boolean> => {
  if (!window.ethereum) {
    console.error('MetaMask is not installed');
    return false;
  }

  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: network.chainIdHex,
          chainName: network.name,
          rpcUrls: [network.rpcUrl],
          blockExplorerUrls: [network.blockExplorerUrl],
          nativeCurrency: network.nativeCurrency,
        },
      ],
    });
    return true;
  } catch (error) {
    console.error('Failed to add network to MetaMask:', error);
    return false;
  }
};

// Helper function to switch to a specific network
export const switchToNetwork = async (network: NetworkConfig): Promise<boolean> => {
  if (!window.ethereum) {
    console.error('MetaMask is not installed');
    return false;
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: network.chainIdHex }],
    });
    return true;
  } catch (error: any) {
    // If the network is not added, try to add it
    if (error.code === 4902) {
      return addNetworkToMetaMask(network);
    }
    console.error('Failed to switch network:', error);
    return false;
  }
};

// Helper function to check if user is on the correct network
export const isCorrectNetwork = async (): Promise<boolean> => {
  if (!window.ethereum) {
    return false;
  }

  try {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    return chainId === DEFAULT_NETWORK.chainIdHex;
  } catch (error) {
    console.error('Failed to check network:', error);
    return false;
  }
};

// Helper function to ensure user is on correct network
export const ensureCorrectNetwork = async (): Promise<boolean> => {
  const isCorrect = await isCorrectNetwork();
  if (!isCorrect) {
    return await switchToNetwork(DEFAULT_NETWORK);
  }
  return true;
};