import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { QrCode, Download, RefreshCw, Eye, EyeOff } from 'lucide-react';

const QRCodeGenerator = () => {
  const { currentUser } = useAuth();
  const [qrData, setQrData] = useState(null);
  const [accessCode, setAccessCode] = useState('');
  const [showAccessCode, setShowAccessCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (currentUser) {
      loadQRData();
    }
  }, [currentUser]);

  const generateAccessCode = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const loadQRData = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, 'qrCodes', currentUser.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setQrData(data);
        setAccessCode(data.accessCode);
      }
    } catch (error) {
      console.error('Error loading QR data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateQRCode = async () => {
    try {
      setGenerating(true);
      const newAccessCode = generateAccessCode();
      const qrUrl = `${window.location.origin}/medical-info/${currentUser.uid}`;
      
      const qrCodeData = {
        userId: currentUser.uid,
        accessCode: newAccessCode,
        qrUrl: qrUrl,
        createdAt: new Date().toISOString(),
        isActive: true
      };

      const docRef = doc(db, 'qrCodes', currentUser.uid);
      await setDoc(docRef, qrCodeData);
      
      setQrData(qrCodeData);
      setAccessCode(newAccessCode);
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Error generating QR code. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const downloadQRCode = () => {
    // Create a simple QR code representation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;
    
    // Simple QR code placeholder (in a real app, you'd use a QR code library)
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 200, 200);
    ctx.fillStyle = '#fff';
    ctx.fillRect(10, 10, 180, 180);
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.fillText('SafeT-iD QR', 70, 100);
    ctx.fillText(currentUser.uid.substring(0, 8), 60, 120);
    
    // Download the canvas as an image
    const link = document.createElement('a');
    link.download = 'safet-id-qr-code.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  if (!currentUser) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please sign in to generate your QR code.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading your QR code...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <QrCode className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Your SafeT-iD QR Code</h2>
        </div>

        {qrData ? (
          <div className="space-y-6">
            {/* QR Code Display */}
            <div className="text-center">
              <div className="inline-block p-4 bg-gray-100 rounded-lg">
                <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                  {/* Placeholder QR Code */}
                  <div className="w-40 h-40 bg-black relative">
                    <div className="absolute inset-2 bg-white"></div>
                    <div className="absolute inset-4 bg-black flex items-center justify-center">
                      <div className="text-white text-xs text-center">
                        <div>SafeT-iD</div>
                        <div className="mt-1">{currentUser.uid.substring(0, 8)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Access Code */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">5-Digit Access Code</h3>
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <input
                    type={showAccessCode ? 'text' : 'password'}
                    value={accessCode}
                    readOnly
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md font-mono text-lg text-center"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAccessCode(!showAccessCode)}
                >
                  {showAccessCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Share this code with healthcare providers along with your QR code for secure access.
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">How to Use</h3>
              <ol className="text-sm text-gray-700 space-y-1">
                <li>1. Show your QR code to healthcare providers</li>
                <li>2. Provide your 5-digit access code when requested</li>
                <li>3. They can scan the code to access your medical information</li>
                <li>4. Generate a new code anytime for enhanced security</li>
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={downloadQRCode}
                variant="outline"
                className="flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download QR Code</span>
              </Button>
              <Button
                onClick={generateQRCode}
                disabled={generating}
                className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{generating ? 'Generating...' : 'Generate New Code'}</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              You don't have a QR code yet. Generate one to start sharing your medical information securely.
            </p>
            <Button
              onClick={generateQRCode}
              disabled={generating}
              className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center space-x-2"
            >
              <QrCode className="w-4 h-4" />
              <span>{generating ? 'Generating...' : 'Generate QR Code'}</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;

