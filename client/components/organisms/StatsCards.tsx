"use client";

import { motion } from "framer-motion";
import { Database, CheckCircle, RefreshCcw, AlertCircle } from "lucide-react";

interface Props {
  total: number;
  newJobs: number;
  updated: number;
  failed: number;
}

export default function StatsCards({ total, newJobs, updated, failed }: Props) {
  const cards = [
    {
      label: "Total Jobs",
      value: total,
      icon: <Database size={18} />,
      color: "text-blue-500",
    },
    {
      label: "New",
      value: newJobs,
      icon: <CheckCircle size={18} />,
      color: "text-green-500",
    },
    {
      label: "Updated",
      value: updated,
      icon: <RefreshCcw size={18} />,
      color: "text-yellow-500",
    },
    {
      label: "Failed",
      value: failed,
      icon: <AlertCircle size={18} />,
      color: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {card.label}
              </p>
              <h3 className="text-xl text-black font-bold mt-1 dark:text-white">
                {card.value}
              </h3>
            </div>
            <div className={card.color}>{card.icon}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
