import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { addProductThunk } from '../redux/thunks/product'
import { Product } from '../types/types'
import { Plus, Package } from 'lucide-react'

const Admin = () => {
  const thunkDispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [quantityLeft, setQuantityLeft] = useState(100);
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addProduct = async () => {
    if (!name || !image || !price || !brand || !category) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    const product: Product = {
      name: name,
      image: image,
      price: price,
      rating: rating,
      description: description,
      brand: brand,
      quantity: 1,
      quantityLeft: quantityLeft,
      category: category
    };
    
    try {
      await thunkDispatch(addProductThunk(product));
      // Reset form
      setName("");
      setImage("");
      setPrice(0);
      setRating(0);
      setDescription("");
      setBrand("");
      setQuantityLeft(100);
      setCategory("");
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all";
  const labelClasses = "block text-sm font-medium text-neutral-700 mb-2";

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary-100 rounded-full">
              <Package className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">Admin Panel</h1>
          <p className="text-neutral-600">Add new products to the store</p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-soft border border-neutral-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="space-y-6">
            
            {/* Product Name */}
            <div>
              <label className={labelClasses}>Product Name *</label>
              <input
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClasses}
              />
            </div>

            {/* Image URL */}
            <div>
              <label className={labelClasses}>Image URL *</label>
              <input
                type="text"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className={inputClasses}
              />
              {image && (
                <div className="mt-2">
                  <img
                    src={image}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg border"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Price and Rating */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Price (€) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={price || ''}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  placeholder="5"
                  value={rating || ''}
                  onChange={(e) => setRating(parseInt(e.target.value) || 0)}
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Brand and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Brand *</label>
                <input
                  type="text"
                  placeholder="Enter brand name"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>Category *</label>
                <input
                  type="text"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className={labelClasses}>Quantity in Stock</label>
              <input
                type="number"
                min="0"
                placeholder="100"
                value={quantityLeft || ''}
                onChange={(e) => setQuantityLeft(parseInt(e.target.value) || 0)}
                className={inputClasses}
              />
            </div>

            {/* Description */}
            <div>
              <label className={labelClasses}>Description</label>
              <textarea
                rows={4}
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`${inputClasses} resize-none`}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              onClick={addProduct}
              disabled={isSubmitting || !name || !image || !price || !brand || !category}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                isSubmitting || !name || !image || !price || !brand || !category
                  ? "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                  : "bg-primary-600 text-white hover:bg-primary-700 shadow-soft"
              }`}
              whileHover={
                !isSubmitting && name && image && price && brand && category
                  ? { scale: 1.02 }
                  : {}
              }
              whileTap={
                !isSubmitting && name && image && price && brand && category
                  ? { scale: 0.98 }
                  : {}
              }
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding Product...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Add Product
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Admin
