import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, AlertCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { editNameThunk } from '../../redux/thunks/users';

const ChangeName: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatchThunk = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setName(user.name || "");
    setError("");
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setError("");
  };

  const validateName = (name: string) => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (name.trim().length > 50) return "Name must be less than 50 characters";
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) return "Name can only contain letters and spaces";
    return "";
  };

  const handleSubmit = async () => {
    const validationError = validateName(name);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    try {
      await dispatchThunk(editNameThunk(user, name.trim()));
      handleClose();
    } catch (err) {
      setError("Failed to update name. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={handleClickOpen}
        className="text-sm text-primary-600 hover:text-primary-500 underline cursor-pointer transition-colors"
      >
        Change name
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-100 rounded-full">
                    <User className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-neutral-800">
                    Change Name
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-500" />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                    Display Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your name"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      error ? "border-red-300" : "border-neutral-300"
                    }`}
                    autoFocus
                    maxLength={50}
                  />
                  {error && (
                    <div className="flex items-center mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {error}
                    </div>
                  )}
                </div>

                {/* Character Count */}
                <div className="text-right">
                  <span className={`text-xs ${name.length > 45 ? 'text-red-500' : 'text-neutral-400'}`}>
                    {name.length}/50
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={handleSubmit}
                  disabled={isLoading || !name.trim() || name.trim() === user.name}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    isLoading || !name.trim() || name.trim() === user.name
                      ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                      : "bg-primary-600 text-white hover:bg-primary-700"
                  }`}
                  whileHover={!(isLoading || !name.trim() || name.trim() === user.name) ? { scale: 1.02 } : {}}
                  whileTap={!(isLoading || !name.trim() || name.trim() === user.name) ? { scale: 0.98 } : {}}
                >
                  {isLoading ? "Updating..." : "Update Name"}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChangeName;