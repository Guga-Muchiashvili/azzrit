import { auth, signOut } from "@/auth";
import { db } from "@/lib/db";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";

export default async function Home() {
  const session = await auth()
  return (
    <div>
      MainPage
    </div>
  )
}
