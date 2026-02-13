import axios from "axios";
import { ImportLog } from "@/types/import";

const API = process.env.NEXT_PUBLIC_API_URL;

export const getImportLogs = async (): Promise<ImportLog[]> => {
  const response = await axios.get(`${API}/logs`);
  return response.data;
};

export const runImport = async () => {
  await axios.post(`${API}/run`);
};
