import React from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Clock3,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'

import {
  ArrowLeft,
} from 'lucide-react'

const Contact = () => {
    const navigate =useNavigate()
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] text-[#0F172A] dark:text-white overflow-hidden transition-colors duration-300">

      {/* Hero Section */}
      <div className="relative border-b border-gray-200 dark:border-white/10 overflow-hidden">

        {/* Gradient Blurs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-400/20 blur-3xl rounded-full"></div>

        <div className="relative max-w-6xl mx-auto px-6 lg:px-20 py-24">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

            {/* Left Content */}
            <div className="max-w-2xl">
              <motion.button
                     type='button'
               whileHover={{ x: -4 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => navigate('/')}
               className="
                 mb-6
                 flex items-center gap-2
                 text-gray-300
                 hover:text-white
                 bg-white/5
                 border border-white/10
                 px-5 py-3
                 rounded-2xl
                 backdrop-blur-xl
                 transition-all
                 hover:border-indigo-500/40
                 hover:bg-indigo-500/10
               "
             >
               <ArrowLeft size={18} />
             
               Back
             </motion.button>
             
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-300 dark:border-indigo-500/20 text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-6">
                <MessageSquare size={16} />
                Contact Predicta Work
              </div>

              <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
                Let’s Start a <br />
                Conversation.
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Have questions, feedback, or partnership ideas?
                Our team is here to help you build healthier and
                smarter remote work environments.
              </p>

            </div>

            {/* Contact Quick Card */}
            <div className="w-full max-w-md">

              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl">

                <div className="space-y-6">

                  <div className="flex items-start gap-4">

                    <div className="p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10">
                      <Clock3 className="text-indigo-600 dark:text-indigo-300" />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">
                        Response Time
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Usually within 24 hours on business days.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">

                    <div className="p-3 rounded-2xl bg-yellow-100 dark:bg-yellow-500/10">
                      <Send className="text-yellow-600 dark:text-yellow-300" />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">
                        Support Availability
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Dedicated support for teams and organizations.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-6xl mx-auto px-6 lg:px-20 py-20">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Email */}
          <div className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-4xl p-8 backdrop-blur-2xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

            <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center mb-6">
              <Mail className="text-indigo-600 dark:text-indigo-300" size={30} />
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Email
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Reach out anytime for support and inquiries.
            </p>

            <p className="font-medium text-lg">
              support@predictawork.com
            </p>

          </div>

          {/* Phone */}
          <div className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-4xl p-8 backdrop-blur-2xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center mb-6">
              <Phone className="text-violet-600 dark:text-violet-300" size={30} />
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Phone
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Talk directly with our support team.
            </p>

            <p className="font-medium text-lg">
              +91 98765 43210
            </p>

          </div>

          {/* Location */}
          <div className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-4xl p-8 backdrop-blur-2xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

            <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mb-6">
              <MapPin className="text-emerald-600 dark:text-emerald-300" size={30} />
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Location
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Proudly building from India.
            </p>

            <p className="font-medium text-lg">
              Kerala, India
            </p>

          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-20">

          <div className="bg-linear-to-r from-purple-600 to-yellow-400 rounded-[36px] p-px">

            <div className="bg-white dark:bg-[#0B1120] rounded-[36px] px-8 py-14 text-center">

              <h2 className="text-4xl font-black mb-4">
                Need Help?
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                Whether you're exploring Predicta Work or already using it,
                we’re always ready to assist you.
              </p>

              <button className="px-8 py-4 rounded-2xl bg-linear-to-r from-purple-600 to-yellow-400 text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-xl">
                Contact Support
              </button>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;