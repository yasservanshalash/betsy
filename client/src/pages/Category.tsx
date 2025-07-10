import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ProductItem from '../components/productsComponents/ProductItem'
import { RootState } from '../redux/store'
import { Product } from '../types/types'
import { Grid, Package } from 'lucide-react'

const Category = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const { category } = useParams();
  const navigate = useNavigate();
  const filteredProducts = products.filter((item: Product) => 
    item.category.toLowerCase().includes((category as string)?.toLowerCase())
  );

  useEffect(() => {
    if (filteredProducts.length === 0 && products.length > 0) {
      navigate('/404');
    }
  }, [filteredProducts.length, products.length, navigate]);

  // Capitalize category name
  const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1);

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
                {categoryName || 'Category'}
              </h1>
              <p className="text-neutral-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
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
              We couldn't find any products in this category.
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