"use client";

import { ImportLog } from "@/types/import";
import ImportRow from "../molecules/ImportRow";

interface Props {
  logs: ImportLog[];
}

export default function ImportTable({ logs }: Props) {
  if (!logs.length) {
    return (
      <div className="text-center py-10 text-gray-400">
        No import logs found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 mt-6">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase text-xs tracking-wide">
          <tr>
            <th className="px-6 py-4 text-left">Feed</th>
            <th className="px-6 py-4 text-left">Time</th>
            <th className="px-6 py-4 text-center">Total</th>
            <th className="px-6 py-4 text-center">New</th>
            <th className="px-6 py-4 text-center">Updated</th>
            <th className="px-6 py-4 text-center">Failed</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-900">
          {logs.map((log) => (
            <ImportRow key={log._id} log={log} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
