import React from "react";
import { motion } from "framer-motion";
import { HelpCircle, Shield, Users, Heart } from "lucide-react";

const PreFooter = () => {
  const features = [
    {
      icon: Users,
      title: "Support independent creators",
      description: "No Betsy warehouse exists; instead, millions of people are selling the items they cherish. We simplify the process by putting you in touch with makers directly to find something exceptional."
    },
    {
      icon: Heart,
      title: "A community doing good",
      description: "A global online marketplace called Betsy brings individuals together to create, promote, purchase, and collect one-of-a-kind goods. As a community, we work to promote improvements for people, the environment, and small businesses."
    },
    {
      icon: Shield,
      title: "Peace of mind",
      description: "Our devoted team's top goal is protecting your privacy. We stand by to offer support if you ever require it."
    }
  ];

  return (
    <section className="bg-orange-50 py-16">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            What is Betsy?
          </h2>
          <p className="text-lg text-neutral-600 font-light">
            An Etsy clone of course!
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-primary-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Q&A Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-white rounded-2xl p-8 shadow-soft border border-neutral-100"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
            <HelpCircle className="w-6 h-6 text-blue-600" />
          </div>
          
          <h3 className="text-xl font-semibold text-neutral-800 mb-4">
            Have a question?
          </h3>
          
          <p className="text-neutral-600 mb-6">
            A Q and A feature will be added soon
          </p>
          
          <button
            disabled
            className="px-6 py-3 bg-neutral-200 text-neutral-500 rounded-lg font-medium cursor-not-allowed"
          >
            Q and A coming soon
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PreFooter;
