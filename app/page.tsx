import { redirect } from "next/navigation";

export default function Home() {
  // Yeh line user ko seedha login page par bhej degi
  redirect("/login");
}