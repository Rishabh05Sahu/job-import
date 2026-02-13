"use client";

import { useEffect, useState } from "react";
import ImportTable from "@/components/organisms/ImportTable";
import Button from "@/components/atoms/Button";
import { runImport, getImportLogs } from "@/services/import.service";
import StatsCards from "@/components/organisms/StatsCards";
import DarkModeToggle from "@/components/atoms/DarkModeToggle";
import { ImportLog } from "@/types/import";

export default function ImportHistoryPage() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<ImportLog[]>([]);

  const fetchLogs = async () => {
    const data = await getImportLogs();
    setLogs(data);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleRunImport = async () => {
    setLoading(true);
    await runImport();

    setTimeout(() => {
      fetchLogs();
      setLoading(false);
    }, 2000);
  };

  const latest = logs.length ? logs[0] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-10 transition">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Import Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Monitor feed imports in real-time
            </p>
          </div>

          <div className="flex items-center gap-4">
            <DarkModeToggle />
            <Button onClick={handleRunImport} disabled={loading}>
              {loading ? "Running..." : "Run Import"}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {latest && (
          <StatsCards
            total={latest.totalFetched}
            newJobs={latest.newJobs}
            updated={latest.updatedJobs}
            failed={latest.failedJobs.length}
          />
        )}

        {/* Table */}
        <ImportTable logs={logs} />
      </div>
    </div>
  );
}
