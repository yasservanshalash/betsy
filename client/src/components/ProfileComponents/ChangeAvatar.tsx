import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, AlertCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { editAvatar } from '../../redux/thunks/users';

const ChangeAvatar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatchThunk = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setAvatarUrl("");
    setError("");
  };

  const handleClose = () => {
    setOpen(false);
    setAvatarUrl("");
    setError("");
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return url.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i) !== null;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!avatarUrl.trim()) {
      setError("Please enter an avatar URL");
      return;
    }

    if (!validateUrl(avatarUrl)) {
      setError("Please enter a valid image URL (jpg, png, gif, svg, webp)");
      return;
    }

    setIsLoading(true);
    try {
      await dispatchThunk(editAvatar(user, avatarUrl));
      handleClose();
    } catch (err) {
      setError("Failed to update avatar. Please try again.");
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
        Change avatar
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
                    <Camera className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-neutral-800">
                    Change Avatar
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
                  <label htmlFor="avatar-url" className="block text-sm font-medium text-neutral-700 mb-2">
                    Avatar Image URL
                  </label>
                  <input
                    id="avatar-url"
                    type="url"
                    value={avatarUrl}
                    onChange={(e) => {
                      setAvatarUrl(e.target.value);
                      setError("");
                    }}
                    placeholder="https://example.com/avatar.jpg"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      error ? "border-red-300" : "border-neutral-300"
                    }`}
                    autoFocus
                  />
                  {error && (
                    <div className="flex items-center mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {error}
                    </div>
                  )}
                </div>

                {/* Preview */}
                {avatarUrl && validateUrl(avatarUrl) && (
                  <div className="text-center">
                    <p className="text-sm text-neutral-600 mb-2">Preview:</p>
                    <img
                      src={avatarUrl}
                      alt="Avatar preview"
                      className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-neutral-200"
                      onError={() => setError("Unable to load image from this URL")}
                    />
                  </div>
                )}
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
                  disabled={isLoading || !avatarUrl.trim()}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    isLoading || !avatarUrl.trim()
                      ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                      : "bg-primary-600 text-white hover:bg-primary-700"
                  }`}
                  whileHover={!(isLoading || !avatarUrl.trim()) ? { scale: 1.02 } : {}}
                  whileTap={!(isLoading || !avatarUrl.trim()) ? { scale: 0.98 } : {}}
                >
                  {isLoading ? "Updating..." : "Update Avatar"}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChangeAvatar;