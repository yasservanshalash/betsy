import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { cartActions } from "../redux/slices/cart";
import { favoriteActions } from "../redux/slices/favorite";
import { AppDispatch, RootState } from "../redux/store";
import { addToCartThunk } from "../redux/thunks/cart";
import { addToFavoritesThunk } from "../redux/thunks/favorite";
import { Product } from "../types/types";
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Calendar, 
  Package, 
  Truck,
  Shield,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  MapPin,
  Award,
  Clock,
  Globe,
  Users,
  ThumbsUp,
  ChevronDown,
  Share2,
  Flag,
  RotateCcw,
  Info
} from "lucide-react";

const ProductDetails = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const user = useSelector((state: RootState) => state.user.user);
  const favorite = useSelector((state: RootState) => state.favorites.favorites);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const { id } = useParams();
  
  const product: Product = products.find((item: Product) => item._id === id) || {} as Product;
  
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToFav, setIsAddingToFav] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedTab, setSelectedTab] = useState('details');

  const dispatch = useDispatch();
  const thunkDispatch = useDispatch<AppDispatch>();

  const isInFavorites = favorite.products.find((item) => item.name === product.name);
  const isInCart = cart.products.find((item) => item.name === product.name);

  // Mock data for demonstration
  const productImages = [product.image, product.image, product.image, product.image];
  const relatedProducts = products.slice(0, 12);
  
  const mockReviews = [
    {
      id: 1,
      user: "Sarah M.",
      rating: 5,
      date: "Jul 8, 2024",
      text: "Excellent department store quality product supported by thousands of miles. Perfect item well packaged and accurately delivered.",
      helpful: 12,
      avatar: "SM"
    },
    {
      id: 2,
      user: "Mike Johnson",
      rating: 5,
      date: "Jul 2, 2024", 
      text: "Excellent customer service, packaged very well and arrived on time. Perfect item well packaged and accurately delivered.",
      helpful: 8,
      avatar: "MJ"
    },
    {
      id: 3,
      user: "Emma Wilson",
      rating: 4,
      date: "Jun 28, 2024",
      text: "Good quality item, exactly as described. Fast shipping and great customer service. Highly recommend!",
      helpful: 5,
      avatar: "EW"
    }
  ];

  const addToFav = async () => {
    if (isInFavorites) return;
    
    setIsAddingToFav(true);
    
    try {
      if (user._id === "") {
        dispatch(favoriteActions.addToFavorites(product));
      } else {
        dispatch(favoriteActions.addToFavorites(product));
        await thunkDispatch(addToFavoritesThunk(user._id, favorite, product));
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    } finally {
      setIsAddingToFav(false);
    }
  };

  const addToCart = async () => {
    if (isInCart || product.quantityLeft <= 0) return;
    
    setIsAddingToCart(true);
    
    try {
      if (user._id === "") {
        dispatch(cartActions.addTocart(product));
      } else {
        dispatch(cartActions.addTocart(product));
        await thunkDispatch(addToCartThunk(user._id, cart, product));
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const renderStars = (rating: number, size: string = "w-4 h-4") => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`${size} ${
          index < rating
            ? "fill-yellow-400 text-yellow-400"
            : "text-neutral-300"
        }`}
      />
    ));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product._id) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-2">Product not found</h2>
          <p className="text-neutral-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Link to="/" className="hover:text-primary-600">Homepage</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary-600">All Categories</Link>
            <span>/</span>
            <span className="text-neutral-800">{product.category}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Image Gallery */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-neutral-50 rounded-xl overflow-hidden">
                <img
                  src={productImages[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                
                {/* Image Navigation */}
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : productImages.length - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-medium hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev < productImages.length - 1 ? prev + 1 : 0)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-medium hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Favorite Button */}
                <button
                  onClick={addToFav}
                  disabled={isAddingToFav}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-medium hover:bg-white transition-colors"
                >
                  <Heart className={`w-5 h-5 ${isInFavorites ? "fill-red-500 text-red-500" : "text-neutral-600"}`} />
                </button>
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-2 overflow-x-auto">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? "border-primary-600" : "border-neutral-200"
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Only 1 left in 2 carts */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <p className="text-sm font-medium text-orange-800">Only 1 left in 2 carts</p>
            </div>

            {/* Price */}
            <div>
              <div className="text-3xl font-bold text-neutral-800 mb-2">
                €{product.price?.toFixed(2)}
              </div>
              <p className="text-sm text-neutral-600">
                Sale ends in <span className="font-medium">23 hours</span> - Free shipping eligible
              </p>
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-2xl font-semibold text-neutral-800 leading-tight mb-2">
                {product.name}
              </h1>
              <p className="text-neutral-600">{product.brand}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-neutral-600">
                {product.rating} ({mockReviews.length} reviews)
              </span>
            </div>

            {/* Key Features */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Ships from {product.seller || "Netherlands"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>Usually ships within 24 hours</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="w-4 h-4 text-purple-500" />
                <span>Vintage from the 1960s</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-green-500" />
                <span>Made from a small business in The Netherlands</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Package className="w-4 h-4 text-orange-500" />
                <span>Materials: {product.category}, clay</span>
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Quantity</label>
              <div className="flex items-center gap-3">
                <select className="border border-neutral-300 rounded-lg px-3 py-2 bg-white">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
                <span className="text-sm text-neutral-600">
                  {product.quantityLeft} available
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={addToCart}
              disabled={isAddingToCart || !!isInCart || product.quantityLeft < 1}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                isInCart
                  ? "bg-green-100 text-green-600 border border-green-300 cursor-not-allowed"
                  : product.quantityLeft < 1
                  ? "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                  : isAddingToCart
                  ? "bg-primary-400 text-white cursor-not-allowed"
                  : "bg-primary-600 text-white hover:bg-primary-700"
              }`}
            >
              {isAddingToCart ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding to cart...
                </>
              ) : isInCart ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Added to cart
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Add to cart
                </>
              )}
            </button>

            {/* Secondary Actions */}
            <div className="flex gap-2">
              <button className="flex-1 py-2 px-4 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                <MessageCircle className="w-4 h-4 mx-auto" />
              </button>
              <button className="flex-1 py-2 px-4 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                <Share2 className="w-4 h-4 mx-auto" />
              </button>
              <button className="flex-1 py-2 px-4 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                <Flag className="w-4 h-4 mx-auto" />
              </button>
            </div>

            {/* Shipping Info */}
            <div className="bg-neutral-50 rounded-lg p-4 space-y-3">
              <h3 className="font-medium text-neutral-800">Shipping and return policies</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-neutral-500" />
                  <span>Order today to get by Jul 15-25</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-neutral-500" />
                  <span>Ships from The Netherlands</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-neutral-500" />
                  <span>Returns & exchanges accepted within 30 days</span>
                </div>
              </div>
            </div>

            {/* Meet your seller */}
            <div className="bg-neutral-50 rounded-lg p-4">
              <h3 className="font-medium text-neutral-800 mb-3">Meet your seller</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  VR
                </div>
                <div>
                  <h4 className="font-medium text-neutral-800">VintageRetroVases</h4>
                  <div className="flex items-center gap-1">
                    {renderStars(5, "w-3 h-3")}
                    <span className="text-xs text-neutral-600 ml-1">(5.0 reviews)</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-neutral-600">Star seller</span>
                </div>
                <div>
                  <span className="text-neutral-600">Speedy replies</span>
                </div>
                <div>
                  <span className="text-neutral-600">Joined in Miranda Sommer</span>
                </div>
                <div>
                  <span className="text-neutral-600">1,847 sales</span>
                </div>
              </div>
              <button className="w-full mt-3 py-2 border border-neutral-300 rounded-lg hover:bg-white transition-colors text-sm">
                Message seller
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12 border-t border-neutral-200">
          <div className="flex border-b border-neutral-200">
            {[
              { id: 'details', label: 'Item details' },
              { id: 'shipping', label: 'Shipping and return policies' },
              { id: 'reviews', label: `Reviews (${mockReviews.length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  selectedTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-neutral-600 hover:text-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-6">
            {selectedTab === 'details' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-medium text-neutral-800 mb-3">Highlights</h3>
                    <ul className="space-y-2 text-sm text-neutral-600">
                      <li>• Handmade</li>
                      <li>• Materials: {product.category}, clay</li>
                      <li>• Width: 6 inches; Height: 8 inches</li>
                      <li>• Vintage from the 1960s</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-800 mb-3">Description</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {product.description || "This beautiful vintage piece is perfect for any home. Handcrafted with care and attention to detail, it brings a unique charm to any space."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'shipping' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-medium text-neutral-800 mb-3">Processing time</h3>
                    <p className="text-sm text-neutral-600">
                      Ready to ship in 1-2 business days from The Netherlands
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-800 mb-3">Shipping cost</h3>
                    <p className="text-sm text-neutral-600">
                      Free shipping on orders over €35
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-neutral-800">
                    {product.rating}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {renderStars(product.rating)}
                    </div>
                    <p className="text-sm text-neutral-600">
                      Based on {mockReviews.length} reviews
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border-b border-neutral-200 pb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center text-sm font-medium">
                          {review.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-neutral-800">{review.user}</span>
                            <div className="flex items-center gap-1">
                              {renderStars(review.rating, "w-3 h-3")}
                            </div>
                            <span className="text-sm text-neutral-500">{review.date}</span>
                          </div>
                          <p className="text-sm text-neutral-600 mb-2">{review.text}</p>
                          <button className="flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-700">
                            <ThumbsUp className="w-3 h-3" />
                            Helpful ({review.helpful})
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-neutral-800 mb-6">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct._id}
                to={`/products/${relatedProduct._id}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-medium transition-all">
                  <div className="aspect-square bg-neutral-100 overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm text-neutral-800 line-clamp-2 mb-1">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-1">
                      {renderStars(relatedProduct.rating, "w-3 h-3")}
                    </div>
                    <p className="font-bold text-neutral-800">€{relatedProduct.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Gift Guide Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">
            Gifts by interest for the best gifts!
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "The Retro Diner", color: "bg-purple-500" },
              { name: "The Retro Diner Lover", color: "bg-orange-500" },
              { name: "The Incredible Sandwich", color: "bg-green-500" },
              { name: "The Incredible", color: "bg-red-500" },
              { name: "The Minimalist", color: "bg-blue-500" }
            ].map((gift, index) => (
              <div key={index} className={`${gift.color} text-white rounded-lg p-4 text-center`}>
                <h3 className="font-medium text-sm">{gift.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Related Searches */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-neutral-800 mb-6">Explore related searches</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
            {[
              "vintage vase", "ceramic pottery", "retro decor", "handmade ceramics",
              "vintage pottery", "home decor", "collectible vase", "danish modern",
              "mid century", "vintage home", "ceramic art", "decorative vase"
            ].map((search, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-neutral-200 rounded-full mb-2 mx-auto"></div>
                <span className="text-xs text-neutral-600">{search}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
