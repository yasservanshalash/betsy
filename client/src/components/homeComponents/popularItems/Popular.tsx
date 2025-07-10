import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Product } from "../../../types/types";
import PopularItem from "./PopularItem";
import { PopularItemSkeleton } from "../../ui/skeleton";
import { fadeInUp, staggerChildren } from "../../../lib/utils";

interface PopularProps {
  products: Product[]
}

const Popular: React.FC<PopularProps> = ({ products }) => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      setNewProducts([...products]);
      setIsLoading(false);
    }
  }, [products]);

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-white to-neutral-50/50">
      <div className="container mx-auto max-w-7xl">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-neutral-800 mb-4">
            Popular gifts{" "}
            <span className="text-primary-600">right now</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover what's trending with our community of creators and shoppers
          </p>
          
          {/* Decorative underline */}
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-primary-400 to-accent-mint mx-auto rounded-full"></div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {isLoading ? (
            // Loading Skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <PopularItemSkeleton />
              </motion.div>
            ))
          ) : (
            // Actual Products
            newProducts?.slice(3, 7)?.map((product, index) => (
              <motion.div 
                key={product._id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <PopularItem product={product} />
              </motion.div>
            ))
          )}
        </motion.div>

        {/* View All Button */}
        {!isLoading && newProducts.length > 4 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <motion.a
              href="/products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-medium rounded-full hover:bg-primary-700 transition-colors duration-300 shadow-medium hover:shadow-large focus-visible-ring"
            >
              View All Products
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Popular;
