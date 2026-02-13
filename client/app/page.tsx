"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Database, Zap, BarChart3, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 
    dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
            Scalable Job Import System
          </h1>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A Redis-powered queue-based background processing system 
            that imports job feeds, tracks history, and ensures 
            scalable upsert operations in MongoDB.
          </p>

          <Link
            href="/import-history"
            className="inline-flex items-center gap-2 mt-10 px-6 py-3 
            bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
            transition shadow-md"
          >
            Go to Import Dashboard
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Feature Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">

          <FeatureCard
            icon={<Database size={20} />}
            title="MongoDB Upsert"
            description="Efficiently handles millions of records with indexed upsert logic and deduplication."
          />

          <FeatureCard
            icon={<Zap size={20} />}
            title="Redis Queue"
            description="Uses BullMQ with concurrency control and retry logic for scalable background processing."
          />

          <FeatureCard
            icon={<BarChart3 size={20} />}
            title="Import Tracking"
            description="Tracks total fetched, new, updated, and failed jobs with detailed history logs."
          />

        </div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-24 text-center"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            How It Works
          </h2>

          <div className="mt-8 text-gray-600 text-left pl-32 dark:text-gray-400 max-w-xl mx-auto space-y-4">
            <p>1️⃣ Fetch XML job feeds from external APIs.</p>
            <p>2️⃣ Convert XML to JSON format.</p>
            <p>3️⃣ Push jobs into Redis queue.</p>
            <p>4️⃣ Workers process jobs concurrently.</p>
            <p>5️⃣ Import logs are stored and visualized in dashboard.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* Feature Card Component */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md 
      border border-gray-100 dark:border-gray-700 transition"
    >
      <div className="flex items-center gap-3 text-blue-600 mb-4">
        {icon}
        <h3 className="text-lg font-semibold dark:text-white">
          {title}
        </h3>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm">
        {description}
      </p>
    </motion.div>
  );
}
