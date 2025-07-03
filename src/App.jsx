import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Shield, QrCode, Clock, Users } from 'lucide-react'
import { AuthProvider, useAuth } from './components/AuthContext'
import LoginModal from './components/LoginModal'
import Dashboard from './components/Dashboard'
import './App.css'

function AppContent() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const { currentUser } = useAuth();

  const handleGetStarted = () => {
    if (currentUser) {
      setShowDashboard(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    setShowDashboard(true);
  };

  if (showDashboard) {
    return <Dashboard onBack={() => setShowDashboard(false)} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">SafeT-iD</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-700">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-700">Privacy</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="hidden sm:inline-flex"
                onClick={() => setIsLoginModalOpen(true)}
              >
                {currentUser ? currentUser.displayName || 'Account' : 'Login'}
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
                HIPAA Compliant
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Medical Information,{' '}
              <span className="text-blue-600">Accessible When Needed</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              SafeT-iD securely stores your health information and makes it accessible through a unique QR code - putting you in control of your medical data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
                onClick={handleGetStarted}
              >
                {currentUser ? 'Access Your SafeT-iD' : 'Create Your SafeT-iD'}
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3">
                Learn More
              </Button>
            </div>
            {currentUser && (
              <div className="mt-4 text-sm text-green-600">
                Welcome back, {currentUser.displayName}!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Health Information, Secured
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SafeT-iD provides a comprehensive, secure solution for storing and sharing your medical information.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Medical Information</h3>
              <p className="text-gray-600">Your health data is encrypted and stored securely, compliant with HIPAA standards.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">QR Code Access</h3>
              <p className="text-gray-600">Share your medical information instantly via a unique QR code, protected by your access code.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Immediate Access</h3>
              <p className="text-gray-600">Healthcare providers can access your critical information in seconds during emergencies.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Proxy Accounts</h3>
              <p className="text-gray-600">Allow family members or caregivers controlled access to your medical information.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How SafeT-iD Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, secure, and designed with your privacy in mind.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Your Account</h3>
              <p className="text-gray-600 mb-6">Register and fill in your comprehensive medical profile with all your important health information.</p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleGetStarted}
              >
                Get Started →
              </Button>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Receive Your QR Code</h3>
              <p className="text-gray-600 mb-6">Get a unique QR code and 5-digit access code to securely share your medical information.</p>
              <Button variant="outline">
                View Demo →
              </Button>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Share When Needed</h3>
              <p className="text-gray-600 mb-6">Allow healthcare providers to scan your QR code and enter your access code to view your information.</p>
              <Button variant="outline">
                Learn More →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to take control of your medical information?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Create your SafeT-iD account today and ensure your critical health information is always accessible when needed.
          </p>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
            onClick={handleGetStarted}
          >
            {currentUser ? 'Access Your Account' : 'Get Started Now'}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">SafeT-iD</span>
              </div>
              <p className="text-gray-600">
                Secure, HIPAA-compliant health information storage and sharing.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">PLATFORM</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Create Account</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Login</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">View Medical Info</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">LEGAL</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">HIPAA Compliance</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">CONTACT</h3>
              <ul className="space-y-2">
                <li><a href="mailto:support@safet-id.com" className="text-gray-600 hover:text-gray-900">support@safet-id.com</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Help Center</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center">
            <p className="text-gray-600">© 2025 SafeT-iD. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App

