import { auth, signOut } from "@/auth";
import { db } from "@/lib/db";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Usernav from "../elements/user/UserNav";

export default async function Home() {
  const session = await auth()
  return (
    <div className="w-full min-h-screen bg-black">
      <Usernav/>
    </div>
  )
}
