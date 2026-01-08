import { motion } from 'framer-motion';
import { Check, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const plans = [
  {
    name: 'Basic',
    price: '$999',
    description: 'Perfect for small businesses and startups.',
    features: [
      'Responsive Website (5 Pages)',
      'Basic SEO Optimization',
      'Contact Form Integration',
      'Social Media Integration',
      '1 Month Support'
    ],
    recommended: false
  },
  {
    name: 'Pro',
    price: '$2,499',
    description: 'Ideal for growing businesses needing more features.',
    features: [
      'Responsive Website (10 Pages)',
      'Advanced SEO Optimization',
      'CMS Integration',
      'Blog Setup',
      'Google Analytics',
      '3 Months Support'
    ],
    recommended: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large-scale applications and custom solutions.',
    features: [
      'Custom Web Application',
      'E-commerce Functionality',
      'Database Integration',
      'User Authentication',
      'API Development',
      '12 Months Support'
    ],
    recommended: false
  }
];

const Pricing = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-dark min-h-screen text-white"
    >
      <SEO 
        title="Pricing Plans"
        description="Transparent pricing plans for web development, mobile apps, and digital solutions. Choose the package that fits your business needs."
        keywords="web development pricing, app development cost, website packages, freelance rates"
        url="https://aviratech.com/pricing"
      />
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8 group">
              <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Simple, Transparent <span className="text-primary">Pricing</span>
              </h1>
              <p className="text-gray-400 text-lg">
                Choose the plan that best fits your needs. No hidden fees.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative bg-card rounded-2xl p-8 border ${
                  plan.recommended ? 'border-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]' : 'border-gray-800'
                } flex flex-col`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-black font-bold py-1 px-4 rounded-full text-sm">
                    Recommended
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-white mb-2">{plan.price}</div>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  to="/request-quote"
                  className={`block w-full text-center py-3 rounded-lg font-bold transition-all ${
                    plan.recommended 
                      ? 'bg-primary text-black hover:bg-white' 
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Pricing;
