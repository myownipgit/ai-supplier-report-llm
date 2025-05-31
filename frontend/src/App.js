import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChatBubbleBottomCenterTextIcon, ChartBarIcon, BuildingOfficeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import './App.css';

// Components
import ChatInterface from './components/ChatInterface';
import Dashboard from './components/Dashboard';
import SupplierManagement from './components/SupplierManagement';
import RiskAssessment from './components/RiskAssessment';
import Navigation from './components/Navigation';
import VoiceUXInfo from './components/VoiceUXInfo';

// Services
import { apiService } from './services/apiService';

function App() {
  const [currentRoute, setCurrentRoute] = useState('/chat');
  const [systemHealth, setSystemHealth] = useState({ status: 'unknown' });
  const [showVoiceInfo, setShowVoiceInfo] = useState(false);

  useEffect(() => {
    checkSystemHealth();
  }, []);

  const checkSystemHealth = async () => {
    try {
      const health = await apiService.checkHealth();
      setSystemHealth(health);
    } catch (error) {
      console.error('Health check failed:', error);
      setSystemHealth({ status: 'unhealthy', error: error.message });
    }
  };

  const navigationItems = [
    {
      name: 'AI Chat',
      href: '/chat',
      icon: ChatBubbleBottomCenterTextIcon,
      description: 'Natural language procurement queries'
    },
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: ChartBarIcon,
      description: 'Analytics and insights overview'
    },
    {
      name: 'Suppliers',
      href: '/suppliers',
      icon: BuildingOfficeIcon,
      description: 'Supplier management and data'
    },
    {
      name: 'Risk Assessment',
      href: '/risk',
      icon: ExclamationTriangleIcon,
      description: 'Risk analysis and monitoring'
    }
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <h1 className="text-xl font-bold text-gray-900">
                    AI Supplier Report
                  </h1>
                  <p className="text-xs text-gray-500">LLM-Powered Analytics</p>
                </div>
                
                {/* System Health Indicator */}
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    systemHealth.status === 'healthy' ? 'bg-green-400' :
                    systemHealth.status === 'unhealthy' ? 'bg-red-400' : 'bg-yellow-400'
                  }`}></div>
                  <span className="text-xs text-gray-600">
                    {systemHealth.status === 'healthy' ? 'System Online' :
                     systemHealth.status === 'unhealthy' ? 'System Error' : 'Checking...'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Voice UX Info Button */}
                <button
                  onClick={() => setShowVoiceInfo(true)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  🎤 Voice UX (Coming Soon)
                </button>
                
                <button
                  onClick={checkSystemHealth}
                  className="text-sm text-gray-600 hover:text-gray-700"
                >
                  Refresh Status
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar Navigation */}
          <Navigation 
            items={navigationItems} 
            currentRoute={currentRoute}
            onRouteChange={setCurrentRoute}
          />

          {/* Main Content */}
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/chat" replace />} />
              <Route 
                path="/chat" 
                element={
                  <div>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">AI-Powered Procurement Chat</h2>
                      <p className="text-gray-600 mt-1">
                        Ask questions about suppliers, spending, risks, and consolidation opportunities in natural language.
                      </p>
                    </div>
                    <ChatInterface />
                  </div>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <div>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Procurement Dashboard</h2>
                      <p className="text-gray-600 mt-1">
                        Overview of your procurement analytics and key metrics.
                      </p>
                    </div>
                    <Dashboard />
                  </div>
                } 
              />
              <Route 
                path="/suppliers" 
                element={
                  <div>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Supplier Management</h2>
                      <p className="text-gray-600 mt-1">
                        Manage your supplier database and view detailed analytics.
                      </p>
                    </div>
                    <SupplierManagement />
                  </div>
                } 
              />
              <Route 
                path="/risk" 
                element={
                  <div>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Risk Assessment</h2>
                      <p className="text-gray-600 mt-1">
                        Monitor and assess supplier risks across your portfolio.
                      </p>
                    </div>
                    <RiskAssessment />
                  </div>
                } 
              />
            </Routes>
          </main>
        </div>

        {/* Voice UX Information Modal */}
        {showVoiceInfo && (
          <VoiceUXInfo onClose={() => setShowVoiceInfo(false)} />
        )}
      </div>
    </Router>
  );
}

export default App;
