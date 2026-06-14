import React from "react";
import { ShieldCheck, Lock, EyeOff, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'

import {
  ArrowLeft,
} from 'lucide-react'

const Privacy = () => {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] text-[#0F172A] dark:text-white transition-colors duration-300">


       


      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-gray-200 dark:border-white/10">



       

        {/* Gradient Blur */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full"></div>

        <div className="relative max-w-6xl mx-auto px-6 lg:px-20 py-24">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

            {/* Left */}
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

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-500/10 border border-yellow-300 dark:border-yellow-500/20 text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-6">
                <ShieldCheck size={16} />
                Privacy First Platform
              </div>

              <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
                Your Privacy <br />
                Matters Most.
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Predicta Work is built with ethical productivity tracking.
                We prioritize transparency, trust, and employee well-being —
                without invasive monitoring.
              </p>
            </div>

            {/* Right Card */}
            <div className="w-full max-w-md">

              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl">

                <div className="space-y-6">

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-green-100 dark:bg-green-500/10">
                      <EyeOff className="text-green-600 dark:text-green-400" />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">
                        No Spy Monitoring
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No screenshots, webcam access, or keystroke logging.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-yellow-100 dark:bg-yellow-500/10">
                      <Lock className="text-yellow-600 dark:text-yellow-300" />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">
                        Secure Data Storage
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Protected using industry-standard encryption practices.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-500/10">
                      <Database className="text-purple-600 dark:text-purple-300" />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">
                        Minimal Data Collection
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        We collect only what’s needed to improve productivity insights.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 lg:px-20 py-20">

        <div className="space-y-10">

          {/* Section Card */}
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-lg">

            <h2 className="text-3xl font-bold mb-4">
              Data We Collect
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We only collect productivity-related information required
              to provide analytics and AI-powered insights.
            </p>

            <ul className="grid sm:grid-cols-2 gap-4">

              {[
                "Task completion data",
                "Focus session duration",
                "Productivity analytics",
                "AI-generated work insights",
              ].map((item, index) => (
                <li
                  key={index}
                  className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Never Collect */}
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-lg">

            <h2 className="text-3xl font-bold mb-4">
              Data We Never Collect
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Predicta Work is intentionally designed to avoid invasive surveillance methods.
            </p>

            <ul className="grid sm:grid-cols-2 gap-4">

              {[
                "Screenshots",
                "Webcam recordings",
                "Keystroke logging",
                "Personal messages",
              ].map((item, index) => (
                <li
                  key={index}
                  className="bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 rounded-2xl px-5 py-4 text-red-700 dark:text-red-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Security */}
          <div className="bg-linear-to-br from-purple-600 to-yellow-400 rounded-3xl p-px">

            <div className="bg-white dark:bg-[#0B1120] rounded-3xl p-8">

              <h2 className="text-3xl font-bold mb-4">
                Security & Protection
              </h2>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                All data is securely stored using encrypted infrastructure and
                modern security standards. We continuously improve our systems
                to ensure reliability, confidentiality, and protection against
                unauthorized access.
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Privacy;