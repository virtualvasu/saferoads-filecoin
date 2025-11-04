import React from 'react';
import { ArrowRight, Github, FileCode, Sparkles, Shield, Coins, CheckCircle, MapPin } from 'lucide-react';

interface ProjectIntroPageProps {
  onContinue: () => void;
}

export default function ProjectIntroPage({ onContinue }: ProjectIntroPageProps) {

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">SafeRoads Filecoin</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/aspiringsecurity/EthTransport"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-blue-600 rounded-lg transition-all text-gray-700 hover:text-blue-600"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">EthTransport</span>
            </a>
            <a
              href="https://github.com/virtualvasu/road-incident-dapp-hedera"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-purple-600 rounded-lg transition-all text-gray-700 hover:text-purple-600"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">This Repo</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1 bg-purple-50 rounded-full border border-purple-200">
            <span className="text-purple-700 text-sm font-medium">Built on Filecoin</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Report Road Incidents.
            <br />
            <span className="text-purple-600">Earn FIL Rewards.</span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            A decentralized platform powered by Filecoin's blockchain that rewards citizens for reporting real road incidents with tamper-proof transparency and decentralized storage. Making civic participation rewarding and verifiable.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
            <p className="text-amber-800 text-sm font-medium">
              💡 The Problem: In busy metro cities, road issues are everywhere — but no one reports them. People don't have time, there's no incentive, and existing systems lack transparency.
            </p>
          </div>

          <button
            onClick={onContinue}
            className="group px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 rounded-lg font-semibold text-white shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2 mx-auto"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* How It Works - Flow Diagram */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
          How It Works
        </h2>
        
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            {[
              { icon: Shield, title: 'Connect Wallet', subtitle: 'MetaMask' },
              { icon: MapPin, title: 'Report Incident', subtitle: 'Location + Photo' },
              { icon: CheckCircle, title: 'Filecoin Consensus', subtitle: 'Tamper-proof Storage' },
              { icon: Coins, title: 'Earn FIL', subtitle: 'Instant Rewards' }
            ].map((item, index) => (
              <React.Fragment key={index}>
                <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 w-44 text-center hover:border-purple-400 transition-all">
                  <item.icon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                  <p className="text-xs text-gray-600">{item.subtitle}</p>
                </div>
                {index < 3 && (
                  <ArrowRight className="hidden md:block w-6 h-6 text-purple-600 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* DAO Impact & Benefits */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Why SafeRoads Filecoin Matters
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                For Citizens
              </h3>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>• <strong>Civic Engagement:</strong> Easy way to report road hazards and incidents</li>
                <li>• <strong>Financial Incentive:</strong> Earn FIL for verified reports</li>
                <li>• <strong>Professional Documentation:</strong> Court-admissible incident reports</li>
                <li>• <strong>Transparency:</strong> Track report status on blockchain</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                For Authorities
              </h3>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>• <strong>Crowd-Sourced Reporting:</strong> Leverage citizen network for monitoring</li>
                <li>• <strong>Data Integrity:</strong> Immutable blockchain records prevent tampering</li>
                <li>• <strong>Efficient Processing:</strong> Streamlined verification and reward system</li>
                <li>• <strong>Cost Effective:</strong> Automated reward distribution reduces overhead</li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-3">For Society</h3>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700 text-sm">
              <div>
                <strong>Road Safety:</strong> Faster identification and response to road hazards
              </div>
              <div>
                <strong>Data Collection:</strong> Valuable traffic incident data for urban planning
              </div>
              <div>
                <strong>Decentralization:</strong> No single point of failure or control
              </div>
              <div>
                <strong>Innovation:</strong> Practical blockchain application for civic good
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three-Component Architecture */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Complete Ecosystem
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-purple-400 transition-all text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Citizen Reporter Interface</h3>
              <p className="text-gray-600 text-sm">Easy-to-use dApp for reporting incidents with step-by-step wizard, PDF generation, and IPFS storage</p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-purple-400 transition-all text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Verification Dashboard</h3>
              <p className="text-gray-600 text-sm">Authority interface for reviewing incidents, verifying reports, and triggering automatic FIL rewards</p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-purple-400 transition-all text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Smart Contract System</h3>
              <p className="text-gray-600 text-sm">Filecoin-based contracts managing incident lifecycle, data storage, and automated reward distribution</p>
            </div>
          </div>
        </div>
      </section>

      {/* Storacha Integration */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Decentralized Storage with Storacha
          </h2>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold">📁</div>
                    <div className="text-xs mt-1">IPFS Storage</div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Professional Document Storage on IPFS
                </h3>
                <p className="text-gray-700 mb-4">
                  Every incident report generates a professional PDF document that's stored immutably on IPFS via Storacha. 
                  This ensures your evidence files are permanently accessible and tamper-proof.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="font-semibold text-gray-900">PDF Generation</span>
                    </div>
                    <p className="text-gray-600 text-xs">Auto-generated professional incident reports with embedded metadata</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="font-semibold text-gray-900">IPFS Upload</span>
                    </div>
                    <p className="text-gray-600 text-xs">Documents stored on decentralized IPFS network via Storacha</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="font-semibold text-gray-900">Permanent Access</span>
                    </div>
                    <p className="text-gray-600 text-xs">Files remain accessible forever through IPFS hash references</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="font-semibold text-gray-900">Court Admissible</span>
                    </div>
                    <p className="text-gray-600 text-xs">Cryptographically verifiable documents for legal proceedings</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-bold">💡</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Why Storacha + IPFS?</p>
                  <p className="text-gray-700 text-xs">
                    Storacha provides enterprise-grade IPFS storage with built-in redundancy, ensuring your incident evidence 
                    files are stored across multiple nodes globally for maximum reliability and permanent accessibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Contracts */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6">
          Smart Contracts on Filecoin Testnet
        </h2>
        
        <div className="max-w-4xl mx-auto flex justify-center">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:border-purple-400 transition-all max-w-md">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">IncidentContract</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Manages incident reporting lifecycle, tamper-proof storage, and FIL reward distribution
                </p>
              </div>
              <FileCode className="w-7 h-7 text-purple-600 flex-shrink-0" />
            </div>
            <div className="text-purple-600 font-mono text-xs">
              Deployed on Filecoin Calibration Testnet
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Decentralized Storage',
                description: 'Built-in IPFS integration for storing incident evidence files'
              },
              {
                title: 'EVM Compatible',
                description: 'Full Ethereum Virtual Machine compatibility for seamless development'
              },
              {
                title: 'Web3 Storage',
                description: 'Native support for decentralized storage and retrieval'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center border-2 border-gray-200 rounded-lg p-5 hover:border-purple-400 transition-all">
                <div className="w-2 h-2 bg-purple-600 rounded-full mx-auto mb-3"></div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 border-t border-gray-200 mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-gray-900 font-semibold text-sm">SafeRoads Filecoin</div>
                <div className="text-gray-600 text-xs">Filecoin-powered road safety reporting</div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <a
                href="https://github.com/aspiringsecurity/EthTransport"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-gray-300 hover:border-blue-600 rounded-lg transition-all"
                aria-label="EthTransport"
              >
                <Github className="w-5 h-5 text-gray-600" />
              </a>
              <a
                href="https://github.com/virtualvasu/road-incident-dapp-hedera"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-gray-300 hover:border-purple-600 rounded-lg transition-all"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-gray-600" />
              </a>
              <a
                href="https://filecoin.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-gray-300 hover:border-purple-600 rounded-lg transition-all"
                aria-label="Filecoin"
              >
                <Sparkles className="w-5 h-5 text-gray-600" />
              </a>
            </div>
          </div>
          
          <div className="text-center mt-4 text-gray-500 text-xs">
            Built with ⨎ on Filecoin
          </div>
        </div>
      </footer>
    </div>
  );
}