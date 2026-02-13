import { ImportLog } from "@/types/import";
import Badge from "../atoms/Badge";
import { Rss } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  log: ImportLog;
}

export default function ImportRow({ log }: Props) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
    >
      <td className="px-6 py-4 font-semibold text-gray-800 dark:text-white flex items-center gap-2">
        <Rss size={16} className="text-blue-500" />
        {log.fileName}
      </td>

      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
        {new Date(log.timestamp).toLocaleString()}
      </td>

      <td className="px-6 py-4 text-black text-center font-semibold dark:text-white">
        {log.totalFetched}
      </td>

      <td className="px-6 py-4 text-center">
        <Badge value={log.newJobs} variant="success" />
      </td>

      <td className="px-6 py-4 text-center">
        <Badge value={log.updatedJobs} variant="warning" />
      </td>

      <td className="px-6 py-4 text-center">
        <Badge value={log.failedJobs.length} variant="danger" />
      </td>
    </motion.tr>
  );
}
