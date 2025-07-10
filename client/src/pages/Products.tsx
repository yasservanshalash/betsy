import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { fetchProductData } from '../redux/thunks/product'
import { Link } from 'react-router-dom'
import { Product } from '../types/types'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  Heart, 
  ShoppingCart,
  SlidersHorizontal,
  X,
  ChevronDown,
  MapPin,
  Truck,
  Award,
  Clock
} from 'lucide-react'

const Products = () => {
  const dispatch = useDispatch()
  const { products } = useSelector((state: RootState) => state.products)
  const [loading, setLoading] = useState(true)
  
  // State for filters and search
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState('relevance')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const [freeShipping, setFreeShipping] = useState(false)
  
  // Categories from products
  const categories = useMemo(() => {
    if (!products || products.length === 0) return ['All']
    const cats = products.map((p: Product) => p.category).filter(Boolean)
    return ['All', ...Array.from(new Set(cats))]
  }, [products])

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return []
    
    let filtered = products.filter((product: Product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesRating = selectedRating === 0 || product.rating >= selectedRating
      // For now, assume free shipping for demonstration
      const matchesShipping = !freeShipping || Math.random() > 0.5
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesShipping
    })

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        // Assuming newer products have higher IDs
        filtered.sort((a, b) => (b._id || '').localeCompare(a._id || ''))
        break
      default:
        // Keep original order for relevance
        break
    }

    return filtered
  }, [products, searchTerm, selectedCategory, priceRange, sortBy, selectedRating, freeShipping])

  useEffect(() => {
    dispatch(fetchProductData() as any)
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
  }, [dispatch])

  const FilterSidebar = () => (
    <motion.div
      className="w-80 bg-white rounded-xl shadow-soft p-6 h-fit sticky top-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-neutral-800">Filters</h3>
        <button
          onClick={() => setShowFilters(false)}
          className="lg:hidden p-2 hover:bg-neutral-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium text-neutral-700 mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-neutral-700 mb-3">Price Range</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-20 px-2 py-1 text-sm border border-neutral-300 rounded"
              placeholder="Min"
            />
            <span className="text-neutral-500">-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-20 px-2 py-1 text-sm border border-neutral-300 rounded"
              placeholder="Max"
            />
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full"
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-neutral-700 mb-3">Customer Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map(rating => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={selectedRating === rating}
                onChange={(e) => setSelectedRating(Number(e.target.value))}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
              />
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating ? "fill-yellow-400 text-yellow-400" : "text-neutral-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-neutral-600 ml-1">& up</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <div className="mb-6">
        <h4 className="font-medium text-neutral-700 mb-3">Special Offers</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={freeShipping}
              onChange={(e) => setFreeShipping(e.target.checked)}
              className="w-4 h-4 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-neutral-700">Free shipping</span>
          </label>
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          setSelectedCategory('All')
          setPriceRange([0, 1000])
          setSelectedRating(0)
          setFreeShipping(false)
          setSearchTerm('')
        }}
        className="w-full py-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
      >
        Clear all filters
      </button>
    </motion.div>
  )

  const ProductCard = ({ product }: { product: Product }) => (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all group cursor-pointer"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Link to={`/products/${product._id}`}>
        <div className="aspect-square bg-neutral-100 relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart className="w-4 h-4 text-neutral-600 hover:text-red-500 transition-colors" />
          </div>
          {Math.random() > 0.7 && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Bestseller
            </div>
          )}
          {Math.random() > 0.8 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Sale
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-neutral-800 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-neutral-300"
                }`}
              />
            ))}
            <span className="text-xs text-neutral-500 ml-1">({Math.floor(Math.random() * 1000)})</span>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-lg text-neutral-800">€{product.price.toFixed(2)}</span>
            {Math.random() > 0.5 && (
              <span className="text-xs text-green-600 font-medium">FREE shipping</span>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-xs text-neutral-500">
            <MapPin className="w-3 h-3" />
            <span>Netherlands</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )

  const ProductListItem = ({ product }: { product: Product }) => (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all group cursor-pointer"
      whileHover={{ y: -1 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Link to={`/products/${product._id}`} className="flex gap-4 p-4">
        <div className="w-32 h-32 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-neutral-300"
                }`}
              />
            ))}
            <span className="text-xs text-neutral-500 ml-1">({Math.floor(Math.random() * 1000)})</span>
          </div>
          
          <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg text-neutral-800">€{product.price.toFixed(2)}</span>
            <div className="flex items-center gap-4">
              {Math.random() > 0.5 && (
                <span className="text-xs text-green-600 font-medium">FREE shipping</span>
              )}
              <div className="flex items-center gap-1 text-xs text-neutral-500">
                <MapPin className="w-3 h-3" />
                <span>Netherlands</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search for anything"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-full hover:bg-neutral-50"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-neutral-600 hover:bg-neutral-100'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-neutral-600 hover:bg-neutral-100'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="relevance">Most relevant</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Results Info */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-neutral-600">
              {filteredProducts.length} results {searchTerm && `for "${searchTerm}"`}
            </p>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Award className="w-4 h-4" />
              <span>Etsy's Pick</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Mobile Filter Overlay */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                className="lg:hidden fixed inset-0 bg-black/50 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowFilters(false)}
              >
                <motion.div
                  className="absolute left-0 top-0 h-full w-80 bg-white"
                  initial={{ x: -320 }}
                  animate={{ x: 0 }}
                  exit={{ x: -320 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FilterSidebar />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden shadow-soft animate-pulse">
                    <div className="aspect-square bg-neutral-200"></div>
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-neutral-200 rounded"></div>
                      <div className="h-3 bg-neutral-200 rounded w-3/4"></div>
                      <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                  : "space-y-4"
              }>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {viewMode === 'grid' ? (
                      <ProductCard product={product} />
                    ) : (
                      <ProductListItem product={product} />
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">No results found</h3>
                <p className="text-neutral-600 mb-4">Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('All')
                    setPriceRange([0, 1000])
                    setSelectedRating(0)
                    setFreeShipping(false)
                  }}
                  className="px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
