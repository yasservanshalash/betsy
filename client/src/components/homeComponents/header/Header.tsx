import React from "react";
import { motion } from "framer-motion";
import HeaderItem from "./HeaderItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import computers from "../../../assets/computers.jpeg"
import images from "../../../assets/images.webp"
import sound from "../../../assets/sound.jpeg"
import consoles from "../../../assets/consoles.jpeg"
import photography from "../../../assets/photography.webp"
import appliances from "../../../assets/appliances.webp"

const Header = () => {
  const user = useSelector((state: RootState) => state.user.user)
  
  const categories = [
    { title: "Computers", image: computers },
    { title: "Art & Images", image: images },
    { title: "Sound", image: sound },
    { title: "Gaming", image: consoles },
    { title: "Photography", image: photography },
    { title: "Appliances", image: appliances },
  ]

  return (
    <section className="relative w-full">
      {/* Hero Background with Gradient */}
      <div className={`
        relative min-h-[60vh] md:min-h-[50vh] 
        ${user.email !== "" 
          ? "bg-gradient-to-br from-primary-100 via-primary-50 to-accent-cream/30" 
          : "bg-gradient-to-br from-accent-sage/40 via-neutral-50 to-accent-mint/20"
        }
        border-t border-neutral-200/50
      `}>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-primary-200/20 rounded-full blur-lg"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-accent-mint/20 rounded-full blur-md"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 py-12 md:py-16">
          
          {/* Welcome Message */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-light text-neutral-800 mb-4 leading-tight">
              {user.email !== "" 
                ? (
                  <>
                    Welcome back,{" "}
                    <span className="text-primary-600 font-medium">{user.name}!</span>
                  </>
                ) 
                : (
                  <>
                    Find things you'll{" "}
                    <span className="text-primary-600 font-medium">love</span>
                    <br className="hidden md:block" />
                    Support independent{" "}
                    <span className="text-primary-600 font-medium">sellers</span>
                    <br className="hidden md:block" />
                    Only on{" "}
                    <span className="font-minister font-medium logo-betsy">Betsy</span>
                  </>
                )
              }
            </h1>
            
            {!user.email && (
              <p className="text-lg md:text-xl text-neutral-600 font-light max-w-2xl mx-auto">
                Discover unique, handcrafted items from creators around the world
              </p>
            )}
          </motion.div>

          {/* Categories Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 max-w-6xl mx-auto"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1 * index,
                  ease: "easeOut"
                }}
              >
                <HeaderItem 
                  title={category.title} 
                  image={category.image}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Fade Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>
    </section>
  );
};

export default Header;
