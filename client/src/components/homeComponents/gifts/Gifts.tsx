import React from 'react'
import { motion } from 'framer-motion'
import GiftItem from './GiftItem'
import { staggerChildren, fadeInUp } from '../../../lib/utils'

const Gifts = () => {
  return (
    <section className="my-12 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-2">
            Gifts by Categories
          </h2>
          <p className="text-neutral-600">Find the perfect gift for any occasion</p>
        </motion.div>

        {/* Gift Items Grid */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center"
        >
          <motion.div variants={fadeInUp}>
            <GiftItem 
              categoryImage="https://hips.hearstapps.com/hmg-prod/images/most-popular-video-games-of-2022-1642612227.png"
              categoryTitle="For Gamers"
              category="gaming"
            />
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <GiftItem 
              categoryImage="https://media.istockphoto.com/id/1196974664/nl/foto/set-van-huishoudelijke-keuken-apparaten-in-de-kamer-op-de-achtergrond-van-de-muur.jpg?s=612x612&w=0&k=20&c=T74rNC_UQh6CWGhYYtwOWJz0bgkbJIO6gTNvgjEcSWI="
              categoryTitle="Stay at Home Parent?"
              category="home"
            />
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <GiftItem 
              categoryImage="https://audiocommand.com/images/easyblog_articles/102/b2ap3_large_how-to-enjoy-a-customized-home-entertainment-system.jpg"
              categoryTitle="Netflix and Chill"
              category="entertainment"
            />
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <GiftItem 
              categoryImage="https://d1dmo9iwh0r4qt.cloudfront.net/~/media/ai/main/images/publications/blog/onlinephotonov/photographyphoto.ashx?modified=20181123034155&la=en&hash=061F51B0825AEC249CED44DB5E32432D3FEA05C2"
              categoryTitle="Capture Every Moment"
              category="photography"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Gifts