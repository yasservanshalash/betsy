import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { User, Camera, MapPin, Save } from "lucide-react";
import ChangeAvatar from "../components/ProfileComponents/ChangeAvatar";
import ChangeName from "../components/ProfileComponents/ChangeName";
import { RootState } from "../redux/store";

const EditProfile = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [city, setCity] = useState("");
  const [isSavingCity, setIsSavingCity] = useState(false);

  const saveCity = async () => {
    if (!city.trim()) return;
    
    setIsSavingCity(true);
    // Add your city save logic here
    setTimeout(() => {
      setIsSavingCity(false);
      setCity("");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary-100 rounded-lg">
              <User className="w-6 h-6 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-800">Public Profile</h1>
          </div>
          <p className="text-neutral-600">Manage your public profile information</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-soft border border-neutral-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="space-y-8">
            
            {/* Profile Picture Section */}
            <div className="flex flex-col md:flex-row md:items-start gap-6 pb-8 border-b border-neutral-200">
              <div className="flex-shrink-0">
                <h3 className="text-lg font-semibold text-neutral-800 mb-4">
                  Profile Picture
                </h3>
              </div>
              <div className="flex-1">
                <div className="flex flex-col items-start gap-4">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-soft"
                    />
                    <div className="absolute bottom-2 right-2">
                      <div className="p-2 bg-primary-100 rounded-full">
                        <Camera className="w-4 h-4 text-primary-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <ChangeAvatar />
                    <p className="text-sm text-neutral-500 max-w-md">
                      Preferably be a .jpg, .gif or .png file smaller than 10MB and at
                      least 400px by 400px.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Name Section */}
            <div className="flex flex-col md:flex-row md:items-center gap-6 pb-8 border-b border-neutral-200">
              <div className="flex-shrink-0 md:w-48">
                <h3 className="text-lg font-semibold text-neutral-800">
                  Your name
                </h3>
              </div>
              <div className="flex-1 flex items-center gap-4">
                <span className="text-neutral-700 font-medium">{user.name}</span>
                <ChangeName />
              </div>
            </div>

            {/* City Section */}
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-shrink-0 md:w-48">
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                  City
                </h3>
                <div className="flex items-center gap-2 text-neutral-500">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Your location</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex gap-3 max-w-md">
                  <input
                    type="text"
                    placeholder="Enter your city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                  <motion.button
                    onClick={saveCity}
                    disabled={!city.trim() || isSavingCity}
                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                      city.trim() && !isSavingCity
                        ? "bg-primary-600 text-white hover:bg-primary-700"
                        : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                    }`}
                    whileHover={city.trim() && !isSavingCity ? { scale: 1.02 } : {}}
                    whileTap={city.trim() && !isSavingCity ? { scale: 0.98 } : {}}
                  >
                    {isSavingCity ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EditProfile;
