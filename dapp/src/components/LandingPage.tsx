import { FileText, Shield, ArrowRight, BarChart3, Award } from 'lucide-react';

interface LandingPageProps {
  onReportIncident: () => void;
  onViewDashboard: () => void;
  onViewRewards: () => void;
}

export default function LandingPage({ onReportIncident, onViewDashboard, onViewRewards }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Filecoin Incident Management
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A decentralized application for reporting, tracking, and managing road incidents with tamper-proof records on the Filecoin network.

            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What would you like to do?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from the options below to either report a new incident or search for details of a previously reported incident.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Report New Incident */}
          <div className="bg-white rounded-lg shadow-lg border-2 border-red-200 p-8 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            <div className="text-center flex-grow">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Report on Filecoin</h3>
              <p className="text-gray-600 mb-6">
                Create tamper-proof incident reports secured by Filecoin's blockchain consensus and earn FIL rewards.
              </p>

              {/* Features */}
              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-full"></div>
                  <span className="text-sm text-gray-700">Immutable Filecoin blockchain storage</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-full"></div>
                  <span className="text-sm text-gray-700">Earn FIL tokens for verified reports</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-full"></div>
                  <span className="text-sm text-gray-700">Enterprise-grade PDF generation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-full"></div>
                  <span className="text-sm text-gray-700">Decentralized storage integration</span>
                </div>
              </div>
            </div>

            <button
              onClick={onReportIncident}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:ring-4 focus:ring-red-300 flex items-center justify-center space-x-2 mt-auto"
            >
              <span>Start Filecoin Report</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* View Dashboard */}
          <div className="bg-white rounded-lg shadow-lg border-2 border-green-200 p-8 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            <div className="text-center flex-grow">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Incident Dashboard</h3>
              <p className="text-gray-600 mb-6">
                Explore incidents stored immutably on Filecoin blockchain with fast query capabilities.
              </p>

              {/* Features */}
              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-full"></div>
                  <span className="text-sm text-gray-700">Real-time Filecoin network data</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-full"></div>
                  <span className="text-sm text-gray-700">Instant search with blockchain speed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-full"></div>
                  <span className="text-sm text-gray-700">Immutable verification status</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-full"></div>
                  <span className="text-sm text-gray-700">Real-time blockchain updates</span>
                </div>
              </div>
            </div>

            <button
                onClick={onViewDashboard}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:ring-4 focus:ring-green-300 flex items-center justify-center space-x-2 mt-auto"
              >
                <span>Explore Filecoin Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </button>
          </div>

          {/* View My Hedera Rewards */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-lg border-2 border-purple-200 p-8 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            <div className="text-center flex-grow">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">My Filecoin Rewards</h3>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Native FIL Tokens
                </span>
              </div>
              <p className="text-gray-700 mb-6">
                Track your native FIL earnings from verified incident reports on the Filecoin network
              </p>

              {/* Enhanced Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-medium">Native FIL token rewards</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-medium">Secure blockchain transactions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-medium">Decentralized storage rewards</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-medium">Web3 storage integration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-medium">Enterprise-grade security</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-medium">Real-time reward tracking</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onViewRewards}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:ring-4 focus:ring-purple-300 flex items-center justify-center space-x-2 mt-auto"
            >
              <span>View My Filecoin Rewards</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center space-y-2">
            <div>© 2025 Incident Management System - Secure • Decentralized • Professional</div>
            <div className="flex items-center space-x-2">
              <span>Powered by</span>
              <span className="font-semibold text-blue-600">Filecoin Network</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}