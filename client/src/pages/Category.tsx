import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
import ProductItem from '../components/productsComponents/ProductItem'
import { RootState } from '../redux/store'
import { Product } from '../types/types'
import { Grid, Package } from 'lucide-react'

const Category = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const { category } = useParams();
  const navigate = useNavigate();
  
  // Available categories for navigation
  const categories = [
    { url: 'visual', name: 'Art & Images', icon: '🎨' },
    { url: 'sound', name: 'Sound & Audio', icon: '🔊' },
    { url: 'computers', name: 'Computers & Tech', icon: '💻' },
    { url: 'gaming', name: 'Gaming', icon: '🎮' },
    { url: 'photography', name: 'Photography', icon: '📸' },
    { url: 'appliances', name: 'Appliances', icon: '🏠' },
  ];
  
  // Map URL categories to exact category names and search terms
  const getCategoryInfo = (urlCategory: string) => {
    switch (urlCategory?.toLowerCase()) {
      case 'visual':
        return {
          exactCategories: ['art', 'images', 'visual', 'art & images'],
          searchTerms: ['art', 'image', 'visual', 'photo', 'picture', 'design', 'graphic']
        }
      case 'sound':
        return {
          exactCategories: ['sound', 'audio', 'music'],
          searchTerms: ['sound', 'audio', 'music', 'speaker', 'headphone', 'microphone']
        }
      case 'computers':
        return {
          exactCategories: ['computers', 'computer', 'tech', 'technology'],
          searchTerms: ['computer', 'laptop', 'desktop', 'pc', 'tech', 'technology']
        }
      case 'gaming':
        return {
          exactCategories: ['gaming', 'games', 'console', 'consoles'],
          searchTerms: ['game', 'gaming', 'console', 'controller', 'playstation', 'xbox']
        }
      case 'photography':
        return {
          exactCategories: ['photography', 'camera', 'cameras'],
          searchTerms: ['photo', 'camera', 'lens', 'photography', 'picture']
        }
      case 'appliances':
        return {
          exactCategories: ['appliances', 'appliance', 'kitchen', 'home appliances'],
          searchTerms: ['appliance', 'kitchen', 'home', 'electric', 'device']
        }
      default:
        return {
          exactCategories: [urlCategory?.toLowerCase() || ''],
          searchTerms: [urlCategory?.toLowerCase() || '']
        }
    }
  }

  const categoryInfo = getCategoryInfo(category || '')
  
  const filteredProducts = products.filter((item: Product) => {
    const productCategory = item.category.toLowerCase()
    const productText = `${item.name} ${item.description}`.toLowerCase()
    
    // First try exact category matching
    const exactMatch = categoryInfo.exactCategories.some(cat => 
      productCategory.includes(cat) || cat.includes(productCategory)
    )
    
    if (exactMatch) return true
    
    // If no exact match, try broader search terms in name and description
    return categoryInfo.searchTerms.some(term => 
      productText.includes(term) && !productCategory.includes('appliance') // Avoid appliance cross-matching
    )
  });

  // Get display name for category
  const getCategoryDisplayName = (urlCategory: string) => {
    switch (urlCategory?.toLowerCase()) {
      case 'visual':
        return 'Art & Images'
      case 'sound':
        return 'Sound & Audio'
      case 'computers':
        return 'Computers & Tech'
      case 'gaming':
        return 'Gaming'
      case 'photography':
        return 'Photography'
      case 'appliances':
        return 'Appliances'
      default:
        return urlCategory?.charAt(0).toUpperCase() + urlCategory?.slice(1)
    }
  }

  const categoryName = getCategoryDisplayName(category || '')

  // Debug logging to help troubleshoot
  console.log('Category URL:', category)
  console.log('Category Info:', categoryInfo)
  console.log('Filtered Products:', filteredProducts.map(p => ({ name: p.name, category: p.category })))

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50">
      
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-3 bg-primary-100 rounded-xl">
              <Package className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-800 mb-2">
                {categoryName}
              </h1>
              <p className="text-neutral-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <motion.div
            className="flex gap-2 overflow-x-auto scrollbar-hide"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {categories.map((cat, index) => (
              <motion.div
                key={cat.url}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/c/${cat.url}`}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap
                    ${category === cat.url 
                      ? 'bg-primary-100 text-primary-700 shadow-sm border border-primary-200' 
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-800'
                    }
                  `}
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span className="font-medium text-sm">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {filteredProducts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {filteredProducts.map((item: Product, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductItem product={item} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 p-6 bg-neutral-100 rounded-full">
              <Grid className="w-full h-full text-neutral-400" />
            </div>
            <h2 className="text-2xl font-semibold text-neutral-800 mb-2">
              No products found
            </h2>
            <p className="text-neutral-600 mb-6">
              We couldn't find any products in the {categoryName} category.
            </p>
            <motion.a
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Package className="w-5 h-5" />
              Browse All Products
            </motion.a>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Category