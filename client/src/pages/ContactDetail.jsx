import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Mail, MapPin, Phone, MessageCircle, HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'avira.tech@zohomail.in',
    description: 'Replies in < 24h',
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91 98793 79605',
    description: 'Mon-Fri, 9AM-6PM IST',
    color: 'from-orange-500/20 to-primary/20'
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: 'Remote / Worldwide',
    description: 'Global Engineering Support',
    color: 'from-purple-500/20 to-pink-500/20'
  }
];

const faqs = [
  {
    question: 'What services does Avira Tech offer?',
    answer: 'We specialize in full-stack web development, cross-platform mobile apps (React Native/Flutter), UI/UX design, and scalable cloud architectures on AWS/Azure.'
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Timelines vary by scope: MVPs usually take 4-8 weeks, while enterprise-grade platforms range from 3-6 months. We work in agile sprints to ensure constant delivery.'
  },
  {
    question: 'Do you offer post-launch support?',
    answer: 'Absolutely. We provide managed maintenance, security patching, and scaling support to ensure your product grows with your user base.'
  },
  {
    question: 'What is your pricing model?',
    answer: 'We offer flexible pricing models including fixed-price for defined scope projects and time-and-materials for evolving requirements.'
  },
  {
    question: 'How do we get started?',
    answer: 'Simply reach out via the form or email. We\'ll schedule a discovery call to understand your vision and provide a detailed technical roadmap.'
  }
];

const ContactDetail = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [focused, setFocused] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // ✅ Update this URL to your hosted backend URL in production
      const response = await fetch('https://portfolio-production-3b6e.up.railway.app/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        // Reset button after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  const inputClasses = (field) => `
    w-full bg-white/[0.03] border transition-all duration-500 rounded-2xl px-5 py-4 text-white outline-none
    ${focused === field ? 'border-primary bg-white/[0.08] shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]' : 'border-white/10 hover:border-white/20'}
  `;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="bg-[#080808] min-h-screen text-white selection:bg-primary/30"
    >
      <Navbar />
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      <main className="relative pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32">
            
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-10">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                  <Sparkles size={14} /> Ready to Build?
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter leading-tight">
                  Let's create <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-yellow-500">
                    something great.
                  </span>
                </h1>
              </motion.div>

              <div className="grid grid-cols-1 gap-4">
                {contactInfo.map((info) => (
                  <div key={info.label} className={`rounded-3xl border border-white/5 bg-gradient-to-br ${info.color} p-6`}>
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-primary"><info.icon size={20} /></div>
                      <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">{info.label}</h3>
                        <p className="text-lg font-medium">{info.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Column */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-7">
              <div className="relative bg-[#111] p-8 md:p-12 rounded-[2.3rem] border border-white/10">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <input
                      required className={inputClasses('name')} placeholder="Your Name"
                      value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                    />
                    <input
                      type="email" required className={inputClasses('email')} placeholder="Email Address"
                      value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                    />
                  </div>
                  <input
                    className={inputClasses('subject')} placeholder="Project Subject"
                    value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)}
                  />
                  <textarea
                    required rows="4" className={`${inputClasses('message')} resize-none`}
                    placeholder="Tell us about your project..."
                    value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                  />
                  <button
                    type="submit" disabled={status === 'submitting'}
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-colors ${
                      status === 'error' ? 'bg-red-500 hover:bg-red-600' : 
                      status === 'success' ? 'bg-green-600' : 'bg-primary hover:bg-primary/90'
                    }`}
                  >
                    {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Message Sent!' : status === 'error' ? 'Try Again' : 'Launch Inquiry'}
                  </button>
                  {status === 'error' && (
                    <p className="text-red-400 text-center mt-4">Failed to send message. Please try again.</p>
                  )}
                </form>
              </div>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <section className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 tracking-tight">Frequently Asked Questions</h2>
              <p className="text-gray-400">Everything you need to know about our workflow and delivery.</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="group">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className={`w-full text-left p-6 md:p-8 rounded-[2rem] border transition-all duration-300 flex items-center justify-between gap-4 ${
                      openFaq === i ? 'bg-white/5 border-primary/50 shadow-[0_0_30px_rgba(var(--primary-rgb),0.05)]' : 'bg-[#111] border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${openFaq === i ? 'bg-primary text-black' : 'bg-white/5 text-gray-500'}`}><HelpCircle size={18} /></div>
                      <span className={`text-lg font-bold transition-colors ${openFaq === i ? 'text-primary' : 'text-white'}`}>{faq.question}</span>
                    </div>
                    <ChevronDown size={20} className={`transition-transform duration-500 ${openFaq === i ? 'rotate-180 text-primary' : 'text-gray-500'}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "circOut" }} className="overflow-hidden">
                        <div className="px-8 md:px-20 pb-8 pt-2 text-gray-400 leading-relaxed text-lg border-x border-white/5 bg-white/[0.01] rounded-b-[2rem]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default ContactDetail;