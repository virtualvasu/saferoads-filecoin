import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Wallet, TrendingUp, Award, ArrowLeft, RefreshCw, DollarSign, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { INCIDENT_MANAGER_ADDRESS, INCIDENT_MANAGER_ABI } from '../lib/contract';
import { ensureCorrectNetwork, DEFAULT_NETWORK } from '../lib/network';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface RewardedIncident {
  id: number;
  description: string;
  timestamp: Date;
  rewardAmount: string; // in FIL
  txHash?: string;
}

interface UserIncident {
  id: number;
  description: string;
  reportedBy: string;
  timestamp: Date;
  verified: boolean;
}

interface RewardsTrackerProps {
  onBack: () => void;
}

export default function RewardsTracker({ onBack }: RewardsTrackerProps) {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  
  const [rewardedIncidents, setRewardedIncidents] = useState<RewardedIncident[]>([]);
  const [totalRewards, setTotalRewards] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  
  const [userIncidents, setUserIncidents] = useState<UserIncident[]>([]);
  const [verifiedCount, setVerifiedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [currentRewardAmount, setCurrentRewardAmount] = useState<string>('0.05'); // Default fallback

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("Please install MetaMask to continue");
      return;
    }

    setIsConnectingWallet(true);
    setError('');
    try {
      // First ensure user is on the correct network
      const networkSwitched = await ensureCorrectNetwork();
      if (!networkSwitched) {
        setError(`Please switch to ${DEFAULT_NETWORK.name} (Chain ID: ${DEFAULT_NETWORK.chainId}) in MetaMask`);
        setIsConnectingWallet(false);
        return;
      }

      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await browserProvider.send("eth_requestAccounts", []);
      const signer = await browserProvider.getSigner();
      const contractInstance = new ethers.Contract(INCIDENT_MANAGER_ADDRESS, INCIDENT_MANAGER_ABI, signer);
      
      setContract(contractInstance);
      setWalletAddress(accounts[0]);
      setWalletConnected(true);
    } catch (error) {
      console.error('Wallet connection error:', error);
      setError("Failed to connect wallet. Please try again and ensure you're on Filecoin Calibration testnet.");
    } finally {
      setIsConnectingWallet(false);
    }
  };

  const fetchUserRewards = async () => {
    if (!contract || !walletAddress) return;

    setIsLoading(true);
    setError('');
    
    try {
      // Create a read-only provider for view calls to avoid gas estimation issues
      const readOnlyProvider = new ethers.JsonRpcProvider(DEFAULT_NETWORK.rpcUrl);
      const readOnlyContract = new ethers.Contract(INCIDENT_MANAGER_ADDRESS, INCIDENT_MANAGER_ABI, readOnlyProvider);

      // First check if contract has sufficient balance for operations
      let contractBalance;
      try {
        contractBalance = await readOnlyContract.getContractBalance();
        console.log('Contract Balance:', contractBalance.toString());
      } catch (balanceError) {
        console.error('Error getting contract balance:', balanceError);
        setError('Unable to connect to contract. Please check your network connection and ensure you are on Filecoin Calibration testnet.');
        setIsLoading(false);
        return;
      }

      // Get total number of incidents with retry logic
      let lastIncidentId;
      let totalIncidents;
      try {
        lastIncidentId = await readOnlyContract.getLastIncidentId();
        totalIncidents = Number(lastIncidentId);
      } catch (incidentError) {
        console.error('Error getting incident count:', incidentError);
        setError('Failed to fetch incident data. The contract may be experiencing issues or you may not be connected to Filecoin Calibration testnet.');
        setIsLoading(false);
        return;
      }
      
      console.log('=== DEBUGGING REWARDS ===');
      console.log('Wallet Address:', walletAddress);
      console.log('Total Incidents:', totalIncidents);
      console.log('Contract Balance:', contractBalance.toString());
      
      const userIncidentsList: UserIncident[] = [];
      const rewardedIncidentsList: RewardedIncident[] = [];
      let totalRewardsSum = 0;
      let verified = 0;
      let pending = 0;

      // Check all incidents to find ones reported by this user
      for (let i = 1; i <= totalIncidents; i++) {
        try {
          const incident = await readOnlyContract.getIncident(i);
          const [id, description, reportedBy, timestamp, isVerified] = incident;
          
          console.log(`Incident ${i}:`, {
            reportedBy: reportedBy,
            reportedBy_lower: reportedBy.toLowerCase(),
            walletAddress: walletAddress,
            walletAddress_lower: walletAddress.toLowerCase(),
            match: reportedBy.toLowerCase() === walletAddress.toLowerCase(),
            verified: isVerified
          });
          
          // Check if this incident was reported by the current user
          if (reportedBy.toLowerCase() === walletAddress.toLowerCase()) {
            const incidentData = {
              id: Number(id),
              description,
              reportedBy,
              timestamp: new Date(Number(timestamp) * 1000),
              verified: isVerified
            };
            
            userIncidentsList.push(incidentData);
            
            if (isVerified) {
              verified++;
                // Get reward amount from contract (with error handling)
                try {
                  const rewardAmount = await readOnlyContract.rewardAmount();
                  // Convert from wei to FIL (divide by 10^18)
                  const rewardInFil = (Number(rewardAmount) / 1000000000000000000).toString();
                  totalRewardsSum += Number(rewardInFil);
                  
                  // Store the current reward amount for display
                  setCurrentRewardAmount(rewardInFil);                rewardedIncidentsList.push({
                    id: Number(id),
                    description,
                    timestamp: new Date(Number(timestamp) * 1000),
                    rewardAmount: rewardInFil
                  });
              } catch (rewardError) {
                console.error('Error getting reward amount:', rewardError);
                // Continue without reward calculation
              }
            } else {
              pending++;
            }
          }
        } catch (incidentError) {
          console.error(`Error fetching incident ${i}:`, incidentError);
          // Check if this is a critical error that should stop processing
          if (incidentError instanceof Error && incidentError.message.includes('INSUFFICIENT_PAYER_BALANCE')) {
            setError('Contract has insufficient balance for operations. Please contact the contract owner to fund the contract.');
            break;
          }
          // Continue with next incident for other errors
        }
      }

      setUserIncidents(userIncidentsList);
      setRewardedIncidents(rewardedIncidentsList);
      setTotalRewards(totalRewardsSum.toString());
      setVerifiedCount(verified);
      setPendingCount(pending);

      console.log('=== FINAL RESULTS ===');
      console.log('User Incidents Found:', userIncidentsList.length);
      console.log('Verified Count:', verified);
      console.log('Pending Count:', pending);
      console.log('Total Rewards:', totalRewardsSum);
      console.log('User Incidents List:', userIncidentsList);

    } catch (error) {
      console.error('Error fetching rewards:', error);
      setError('Failed to fetch rewards data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    if (walletConnected) {
      fetchUserRewards();
    }
  };

  // Auto-fetch rewards when wallet is connected
  useEffect(() => {
    if (walletConnected && contract && walletAddress) {
      fetchUserRewards();
    }
  }, [walletConnected, contract, walletAddress]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Filecoin Rewards</h1>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Native FIL Tokens
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                  Filecoin Network
                </span>
              </div>
              <p className="text-gray-600">Earn native Filecoin FIL tokens for verified incident reports</p>
            </div>

            <div className="w-24"> {/* Spacer for centering */}</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Wallet Connection */}
        {!walletConnected ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Connect Your Wallet</h2>
              <p className="text-gray-600 mb-4">
                Connect your wallet to view your incident rewards and earnings history.
              </p>
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Make sure you're connected to <strong>Filecoin Calibration Testnet</strong> (Chain ID: 314159) in MetaMask.
                </p>
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-700">{error}</span>
                  </div>
                </div>
              )}

              <button
                onClick={connectWallet}
                disabled={isConnectingWallet}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {isConnectingWallet ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5" />
                    <span>Connect Wallet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Connected Wallet Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Wallet Connected</h3>
                    <p className="text-sm text-gray-600">
                      {walletAddress}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={refreshData}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 rounded-lg transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-700">{error}</span>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your rewards data...</p>
              </div>
            )}

            {/* Rewards Summary */}
            {!isLoading && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  {/* Total Rewards */}
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-sm border-2 border-purple-200 p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-purple-700">Total Earned</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-2xl font-bold text-gray-900">{totalRewards} FIL</p>
                          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">
                            Native Filecoin
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Verified Incidents */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Verified</p>
                        <p className="text-2xl font-bold text-gray-900">{verifiedCount}</p>
                      </div>
                    </div>
                  </div>

                  {/* Pending Incidents */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Pending</p>
                        <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
                      </div>
                    </div>
                  </div>

                  {/* Total Reports */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Reports</p>
                        <p className="text-2xl font-bold text-gray-900">{userIncidents.length}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Incidents List */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Your Incident Reports</h3>
                    <p className="text-gray-600">Track the status and rewards of your submitted incidents</p>
                  </div>

                  {userIncidents.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Incidents Found</h3>
                      <p className="text-gray-600 mb-4">You haven't reported any incidents yet.</p>
                      <button
                        onClick={onBack}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        Report Your First Incident
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {userIncidents.map((incident) => (
                        <div key={incident.id} className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <span className="text-sm font-medium text-gray-900">
                                  Incident #{incident.id}
                                </span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  incident.verified 
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {incident.verified ? 'Verified & Rewarded' : 'Pending Verification'}
                                </span>
                              </div>
                              
                              <p className="text-gray-700 mb-3">{incident.description}</p>
                              
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{formatDate(incident.timestamp)}</span>
                                </div>
                              </div>
                            </div>

                            {incident.verified && (
                              <div className="ml-6 text-right">
                                <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-3 py-2 rounded-lg">
                                  <div className="text-lg font-bold">
                                    +{rewardedIncidents.find(r => r.id === incident.id)?.rewardAmount || '0'} FIL
                                  </div>
                                  <div className="text-xs opacity-90">Native Filecoin Token</div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Filecoin Reward Info */}
                <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">⨎</span>
                    </div>
                    <div className="text-sm">
                      <p className="font-bold text-purple-900 mb-2 text-lg">🚀 Powered by Filecoin</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-purple-800 mb-1">Native FIL Rewards</p>
                          <ul className="space-y-1 text-purple-700 text-sm">
                            <li>• Instant payouts in native Filecoin FIL tokens</li>
                            <li>• Current reward: {currentRewardAmount} FIL per verified incident</li>
                            <li>• Decentralized storage integration</li>
                            <li>• Web3 storage capabilities</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-purple-800 mb-1">Filecoin Advantages</p>
                          <ul className="space-y-1 text-purple-700 text-sm">
                            <li>• Built-in decentralized storage with IPFS</li>
                            <li>• EVM compatibility for seamless dApp development</li>
                            <li>• Robust and secure blockchain infrastructure</li>
                            <li>• Global decentralized storage network</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
                        <p className="font-medium text-purple-800 mb-1">💡 Why Filecoin for Incident Management?</p>
                        <p className="text-purple-700 text-sm">
                          Filecoin's combination of blockchain consensus and decentralized storage ensures 
                          immutable incident records with native support for storing evidence files on IPFS.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}