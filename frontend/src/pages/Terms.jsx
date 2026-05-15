import React from "react";
import {
  FileCheck,
  Shield,
  Sparkles,
  UserCheck,
  RefreshCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
} from 'lucide-react'

const Terms = () => {
    const navigate =useNavigate()
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] text-[#0F172A] dark:text-white transition-colors duration-300">

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-gray-200 dark:border-white/10">

        {/* Background Blur */}
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

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-500/10 border border-purple-300 dark:border-purple-500/20 text-sm font-medium text-purple-700 dark:text-purple-300 mb-6">
                <FileCheck size={16} />
                Terms & Conditions
              </div>

              <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
                Fair Usage. <br />
                Transparent Rules.
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                These terms outline the responsibilities, acceptable use,
                and platform policies for using Predicta Work.
              </p>
            </div>

            {/* Right Card */}
            <div className="w-full max-w-md">

              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl">

                <div className="space-y-6">

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-500/10">
                      <Shield className="text-blue-600 dark:text-blue-400" />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">
                        Responsible Usage
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Users must comply with legal and ethical platform usage.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-yellow-100 dark:bg-yellow-500/10">
                      <Sparkles className="text-yellow-600 dark:text-yellow-300" />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">
                        AI Transparency
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        AI-generated insights are recommendations, not decisions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-green-100 dark:bg-green-500/10">
                      <UserCheck className="text-green-600 dark:text-green-400" />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">
                        Account Protection
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Users are responsible for account security and credentials.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 lg:px-20 py-20">

        <div className="space-y-10">

          {/* Intro */}
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-lg">

            <h2 className="text-3xl font-bold mb-4">
              Agreement to Terms
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              By accessing or using Predicta Work, you agree to follow these
              Terms & Conditions and all applicable laws and regulations.
            </p>
          </div>

          {/* Acceptable Usage */}
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-lg">

            <h2 className="text-3xl font-bold mb-6">
              Acceptable Usage
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">

              {[
                "Use the platform legally",
                "Respect employee privacy",
                "Avoid harmful activities",
                "Follow workplace regulations",
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-lg">

            <h2 className="text-3xl font-bold mb-4">
              AI Recommendations
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              AI-generated productivity insights are designed to assist teams
              and managers. They should not replace professional judgment,
              performance reviews, or human decision-making.
            </p>
          </div>

          {/* Account Responsibility */}
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-lg">

            <h2 className="text-3xl font-bold mb-4">
              Account Responsibility
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Users are responsible for maintaining account confidentiality,
              securing login credentials, and ensuring authorized access only.
            </p>
          </div>

          {/* Service Availability */}
          <div className="bg-linear-to-br from-purple-600 to-yellow-400 rounded-3xl p-px">

            <div className="bg-white dark:bg-[#0B1120] rounded-3xl p-8">

              <div className="flex items-center gap-3 mb-4">
                <RefreshCcw className="text-purple-500" />

                <h2 className="text-3xl font-bold">
                  Service Availability
                </h2>
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Predicta Work may improve, modify, or update platform features
                and services at any time to enhance reliability, security,
                and user experience.
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Terms;