import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { User, Heart, Pill, AlertTriangle, Phone, Save } from 'lucide-react';

const MedicalProfile = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({
    personalInfo: {
      fullName: '',
      dateOfBirth: '',
      bloodType: '',
      height: '',
      weight: '',
      emergencyContact: '',
      emergencyPhone: ''
    },
    medicalConditions: '',
    medications: '',
    allergies: '',
    additionalNotes: ''
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (currentUser) {
      loadProfile();
    }
  }, [currentUser]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, 'medicalProfiles', currentUser.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        // Initialize with user's display name if available
        setProfile(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            fullName: currentUser.displayName || ''
          }
        }));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    try {
      setSaving(true);
      const docRef = doc(db, 'medicalProfiles', currentUser.uid);
      await setDoc(docRef, {
        ...profile,
        lastUpdated: new Date().toISOString(),
        userId: currentUser.uid
      });
      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePersonalInfoChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const handleFieldChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!currentUser) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please sign in to access your medical profile.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading your medical profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Medical Profile</h2>
        </div>

        <div className="space-y-8">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.personalInfo.fullName}
                  onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={profile.personalInfo.dateOfBirth}
                  onChange={(e) => handlePersonalInfoChange('dateOfBirth', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blood Type
                </label>
                <select
                  value={profile.personalInfo.bloodType}
                  onChange={(e) => handlePersonalInfoChange('bloodType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={profile.personalInfo.height}
                  onChange={(e) => handlePersonalInfoChange('height', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={profile.personalInfo.weight}
                  onChange={(e) => handlePersonalInfoChange('weight', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  value={profile.personalInfo.emergencyContact}
                  onChange={(e) => handlePersonalInfoChange('emergencyContact', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emergency Phone
                </label>
                <input
                  type="tel"
                  value={profile.personalInfo.emergencyPhone}
                  onChange={(e) => handlePersonalInfoChange('emergencyPhone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Medical Conditions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2" />
              Medical Conditions
            </h3>
            <textarea
              value={profile.medicalConditions}
              onChange={(e) => handleFieldChange('medicalConditions', e.target.value)}
              placeholder="List any chronic conditions, past surgeries, or ongoing medical issues..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Current Medications */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Pill className="w-5 h-5 mr-2" />
              Current Medications
            </h3>
            <textarea
              value={profile.medications}
              onChange={(e) => handleFieldChange('medications', e.target.value)}
              placeholder="List all current medications, dosages, and frequency..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Allergies */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Allergies & Adverse Reactions
            </h3>
            <textarea
              value={profile.allergies}
              onChange={(e) => handleFieldChange('allergies', e.target.value)}
              placeholder="List any known allergies to medications, foods, or other substances..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Additional Notes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Additional Notes
            </h3>
            <textarea
              value={profile.additionalNotes}
              onChange={(e) => handleFieldChange('additionalNotes', e.target.value)}
              placeholder="Any other important medical information, preferences, or instructions..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={saveProfile}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Profile'}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalProfile;

