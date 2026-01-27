import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Zap, Star, Clock, Shield, ChevronRight, Send, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const pricingPlans = [
  {
    name: "Basic",
    description: "Perfect for small businesses and startups getting started",
    price: "₹49,999",
    priceNote: "One-time payment",
    color: "from-gray-500/20 to-gray-600/10",
    borderColor: "border-gray-600/30",
    buttonColor: "bg-gray-600 hover:bg-gray-500",
    popular: false,
    features: [
      "5-page responsive website",
      "Modern UI/UX design",
      "Contact form integration",
      "Basic SEO optimization",
      "Mobile-friendly layout",
      "Social media links",
      "30 days support",
      "Source code delivery"
    ],
    notIncluded: [
      "Custom functionality",
      "Backend development",
      "E-commerce integration",
      "CMS admin panel"
    ]
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses needing more features",
    price: "₹1,49,999",
    priceNote: "One-time payment",
    color: "from-primary/20 to-orange-500/10",
    borderColor: "border-primary/50",
    buttonColor: "bg-primary hover:bg-orange-600",
    popular: true,
    features: [
      "10-page responsive website",
      "Advanced UI/UX design",
      "Custom functionality",
      "Backend API development",
      "CMS admin panel",
      "E-commerce integration (up to 50 products)",
      "Payment gateway integration",
      "Advanced SEO & analytics",
      "60 days support",
      "Source code delivery"
    ],
    notIncluded: [
      "Mobile app development",
      "Third-party integrations"
    ]
  },
  {
    name: "Enterprise",
    description: "Complete solution for large-scale applications",
    price: "Custom",
    priceNote: "Based on requirements",
    color: "from-purple-500/20 to-pink-500/10",
    borderColor: "border-purple-500/50",
    buttonColor: "bg-gradient-to-r from-primary to-purple-500 hover:opacity-90",
    popular: false,
    features: [
      "Unlimited pages",
      "Custom full-stack application",
      "Mobile app development (iOS/Android)",
      "Third-party API integrations",
      "Advanced security features",
      "Database design & optimization",
      "Cloud deployment (AWS/Azure)",
      "CI/CD pipeline setup",
      "Dedicated project manager",
      "12 months support & maintenance",
      "Source code delivery"
    ],
    notIncluded: []
  }
];

const addOns = [
  { name: "Additional Pages", price: "₹5,000/page" },
  { name: "E-commerce Products", price: "₹100/product" },
  { name: "Premium SEO Package", price: "₹25,000" },
  { name: "Social Media Integration", price: "₹15,000" },
  { name: "Speed Optimization", price: "₹20,000" },
  { name: "Annual Maintenance", price: "₹30,000/year" }
];

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept bank transfers, UPI, and major credit/debit cards. For enterprise projects, we offer flexible payment schedules."
  },
  {
    question: "How long does a typical project take?",
    answer: "Basic projects take 2-3 weeks, Professional projects take 4-6 weeks, and Enterprise projects vary based on scope and complexity."
  },
  {
    question: "Do you provide post-launch support?",
    answer: "Yes! All our packages include dedicated support. We also offer extended maintenance packages for long-term partnerships."
  },
  {
    question: "Can I customize a package?",
    answer: "Absolutely! Our pricing is flexible. We can customize packages based on your specific requirements and budget."
  },
  {
    question: "Do you offer discounts for startups?",
    answer: "Yes! We offer special pricing for early-stage startups. Contact us to discuss your project and budget."
  }
];

const PricingDetail = () => {
  const [billingCycle, setBillingCycle] = useState('onetime');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-dark min-h-screen text-white"
    >
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Pricing</span> Plans
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Transparent pricing with no hidden costs. Choose the perfect plan for your business needs and budget.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-[2.5rem] border ${plan.borderColor} bg-gradient-to-br ${plan.color} p-8 flex flex-col hover:scale-[1.02] transition-transform duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>

                <div className="text-center mb-8">
                  <div className="text-5xl font-bold mb-2">
                    {plan.price}
                  </div>
                  <p className="text-gray-500 text-sm">{plan.priceNote}</p>
                </div>

                <div className="flex-1 space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm">
                      <Check size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm opacity-40">
                      <span className="flex-shrink-0 mt-0.5">×</span>
                      <span className="text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/contact"
                  className={`w-full py-4 ${plan.buttonColor} text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group`}
                >
                  Get Started
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Add-ons Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Additional <span className="text-primary">Add-ons</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {addOns.map((addon, i) => (
                <motion.div
                  key={addon.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:border-primary/50 transition-colors"
                >
                  <p className="font-semibold text-sm mb-1">{addon.name}</p>
                  <p className="text-primary font-bold">{addon.price}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                >
                  <details className="group">
                    <summary className="cursor-pointer px-6 py-5 flex items-center justify-between font-semibold">
                      {faq.question}
                      <ChevronRight className="group-open:rotate-90 transition-transform text-primary" />
                    </summary>
                    <div className="px-6 pb-5 text-gray-400">
                      {faq.answer}
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/20 rounded-3xl p-8 md:p-12 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Not sure which plan is right for you?</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Book a free consultation call and we'll help you choose the perfect solution for your business needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-4 bg-primary hover:bg-orange-600 text-white font-bold rounded-2xl transition-colors flex items-center gap-2"
              >
                <Clock size={18} /> Book Free Consultation
              </Link>
              <a
                href="tel:+919879379605"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold rounded-2xl transition-colors flex items-center gap-2"
              >
                <Shield size={18} /> Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default PricingDetail;

