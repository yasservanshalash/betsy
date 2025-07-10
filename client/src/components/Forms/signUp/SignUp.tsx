import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface SignUpProps {
  showLogin: boolean;
  showSignup: boolean;
  setShowLogin: (show: boolean) => void;
  setShowSignup: (show: boolean) => void;
}

// Zod schema for form validation
const signUpSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be less than 20 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, "You must agree to the terms and conditions"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp: React.FC<SignUpProps> = ({
  showLogin,
  showSignup,
  setShowLogin,
  setShowSignup,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
            email: "",
      name: "",
            password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const password = watch("password");

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setServerError("");

    try {
      const response = await axios.post('https://betsy-backend.onrender.com/users/', {
        email: data.email,
        name: data.name,
        password: data.password,
      });

      if (response.data.user) {
        setIsSuccess(true);
        setTimeout(() => {
                setShowSignup(false);
                setShowLogin(true);
          reset();
          setIsSuccess(false);
        }, 2000);
      }
    } catch (error: any) {
      if (error.response) {
        setServerError(error.response.data.message || "Registration failed");
            } else {
        setServerError("Network error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShowLogin(false);
    setShowSignup(false);
    setServerError("");
    setIsSuccess(false);
    reset();
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: "", color: "" };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z\d]/.test(password)) score++;

    const levels = [
      { strength: 0, text: "Very Weak", color: "bg-red-500" },
      { strength: 1, text: "Weak", color: "bg-red-400" },
      { strength: 2, text: "Fair", color: "bg-yellow-400" },
      { strength: 3, text: "Good", color: "bg-blue-400" },
      { strength: 4, text: "Strong", color: "bg-green-400" },
      { strength: 5, text: "Very Strong", color: "bg-green-500" },
    ];

    return levels[score];
  };

  const passwordStrength = getPasswordStrength(password);

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        </motion.div>
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">Welcome to Betsy!</h2>
        <p className="text-neutral-600 mb-4">Your account has been created successfully.</p>
        <p className="text-sm text-neutral-500">Redirecting to sign in...</p>
      </motion.div>
    );
  }

        return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto"
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 transition-colors z-10"
      >
        <X className="w-5 h-5 text-neutral-500" />
      </button>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">Create your account</h2>
        <p className="text-neutral-600">Join thousands of sellers and buyers</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="Enter your email"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.email ? "border-red-300" : "border-neutral-300"
              }`}
            />
          </div>
          {errors.email && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.email.message}
            </div>
          )}
        </div>

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              {...register("name")}
              type="text"
              id="name"
              placeholder="Enter your full name"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.name ? "border-red-300" : "border-neutral-300"
              }`}
            />
          </div>
          {errors.name && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.name.message}
            </div>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Create a strong password"
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.password ? "border-red-300" : "border-neutral-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-neutral-400 hover:text-neutral-600" />
              ) : (
                <Eye className="h-5 w-5 text-neutral-400 hover:text-neutral-600" />
              )}
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {password && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-neutral-600">Password strength</span>
                <span className={`font-medium ${passwordStrength.strength >= 3 ? 'text-green-600' : 'text-neutral-600'}`}>
                  {passwordStrength.text}
                </span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                  style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                />
              </div>
            </div>
          )}
          
          {errors.password && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.password.message}
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm your password"
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.confirmPassword ? "border-red-300" : "border-neutral-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-neutral-400 hover:text-neutral-600" />
              ) : (
                <Eye className="h-5 w-5 text-neutral-400 hover:text-neutral-600" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        {/* Terms Checkbox */}
        <div>
          <label className="flex items-start">
            <input
              {...register("terms")}
              type="checkbox"
              className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500 mt-0.5"
            />
            <span className="ml-2 text-sm text-neutral-700">
              I agree to Betsy's{" "}
              <a href="/terms" className="text-primary-600 hover:text-primary-500 font-medium">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary-600 hover:text-primary-500 font-medium">
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.terms && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.terms.message}
            </div>
          )}
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700 text-sm">{serverError}</span>
          </div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting || isLoading}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
            isSubmitting || isLoading
              ? "bg-neutral-400 cursor-not-allowed"
              : "bg-neutral-900 hover:bg-neutral-800 focus:ring-2 focus:ring-neutral-500"
          }`}
          whileHover={!(isSubmitting || isLoading) ? { scale: 1.02 } : {}}
          whileTap={!(isSubmitting || isLoading) ? { scale: 0.98 } : {}}
        >
          {isSubmitting || isLoading ? "Creating account..." : "Sign up"}
        </motion.button>

        {/* Switch to Sign In */}
        <div className="text-center">
          <span className="text-neutral-600">Already have an account? </span>
          <button
            type="button"
                                    onClick={() => {
                setShowSignup(false);
                setShowLogin(true);
            }}
            className="text-primary-600 hover:text-primary-500 font-medium"
          >
            Sign in
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-neutral-500">OR</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/640px-Google_%22G%22_Logo.svg.png"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-neutral-700 font-medium">Continue with Google</span>
          </button>
          
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <img
              src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-facebook_-512.png"
              alt="Facebook"
              className="w-5 h-5"
            />
            <span className="text-neutral-700 font-medium">Continue with Facebook</span>
          </button>
        </div>

        {/* Terms Notice */}
        <div className="text-center">
          <p className="text-xs text-neutral-500 leading-relaxed">
            By signing up, you agree that we may send you communications and you may change your preferences in your account settings. We'll never post without your permission.
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default SignUp;