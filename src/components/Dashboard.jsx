import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { useAuth } from './AuthContext';
import MedicalProfile from './MedicalProfile';
import QRCodeGenerator from './QRCodeGenerator';
import { User, QrCode, Shield, ArrowLeft } from 'lucide-react';

const Dashboard = ({ onBack }) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please sign in to access your dashboard.</p>
          <Button onClick={onBack} variant="outline">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">SafeT-iD Dashboard</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
              <span className="text-gray-900 font-medium">{currentUser.displayName}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Medical Profile</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('qrcode')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'qrcode'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <QrCode className="w-4 h-4" />
                <span>QR Code</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="py-8">
        {activeTab === 'profile' && <MedicalProfile />}
        {activeTab === 'qrcode' && <QRCodeGenerator />}
      </main>
    </div>
  );
};

export default Dashboard;

