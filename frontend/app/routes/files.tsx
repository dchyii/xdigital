import { useLoaderData } from "react-router";
import type { Route } from "./+types/files";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function clientLoader() {
  const res = await fetch(`${API_URL}/api/files/allfiles`);
  const data = await res.json();
  return data;
}

export default function Files({ loaderData }: Route.ComponentProps) {
  console.log(loaderData);
  return <div>dashboard page</div>;
}
