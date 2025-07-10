import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../redux/slices/user";
import { favoriteActions } from "../../../redux/slices/favorite";
import { fetchFavorites } from "../../../redux/thunks/favorite";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchCart } from "../../../redux/thunks/cart";
import { cartActions } from "../../../redux/slices/cart";
import { fetchOrders } from "../../../redux/thunks/orders";
import { Product } from "../../../types/types";

interface SignInProps {
  showLogin: boolean;
  showSignup: boolean;
  setShowLogin: (show: boolean) => void;
  setShowSignup: (show: boolean) => void;
  setChoice: (choice: boolean) => void;
}

// Zod schema for form validation
const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be less than 20 characters"),
  rememberMe: z.boolean().optional(),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignIn: React.FC<SignInProps> = ({
  showLogin,
  showSignup,
  setShowLogin,
  setShowSignup,
  setChoice,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const thunkDispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    setServerError("");

    try {
      const response = await axios.post(
        "https://betsy-backend.onrender.com/users/login",
        {
          email: data.email,
          password: data.password,
        }
      );

      const token = response.data.token;
      const user = JSON.stringify(response.data.user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      
      dispatch(userActions.logIn(JSON.parse(user)));
      
      // Fetch user data
      thunkDispatch(
        fetchFavorites(
          "https://betsy-backend.onrender.com/favorites/" + response.data.user._id
        )
      );
      thunkDispatch(
        fetchCart(
          "https://betsy-backend.onrender.com/art/" + response.data.user._id
        )
      );
      thunkDispatch(fetchOrders(response.data.user._id));
      
      dispatch(favoriteActions.clearFavorites());
      dispatch(cartActions.addFromLocalStorage());
      
      navigate("/");
      setShowLogin(false);
      setShowSignup(false);
      setChoice(true);
      reset();
    } catch (error: any) {
      if (error.response) {
        setServerError(error.response.data.message || "Login failed");
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
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-6 relative"
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 transition-colors"
      >
        <X className="w-5 h-5 text-neutral-500" />
      </button>

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">Welcome back</h2>
        <p className="text-neutral-600">Sign in to your account</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
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
              placeholder="Enter your password"
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
          {errors.password && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.password.message}
            </div>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              {...register("rememberMe")}
              type="checkbox"
              className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-neutral-700">Stay signed in</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-primary-600 hover:text-primary-500 font-medium"
          >
            Forgot password?
          </Link>
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
          {isSubmitting || isLoading ? "Signing in..." : "Sign in"}
        </motion.button>

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

        {/* Switch to Sign Up */}
        <div className="text-center">
          <span className="text-neutral-600">Don't have an account? </span>
          <button
            type="button"
            onClick={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
            className="text-primary-600 hover:text-primary-500 font-medium"
          >
            Sign up
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default SignIn;
