import { auth, signOut } from "@/auth";
import { db } from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  const session = await auth()
  return (
    <div>
      {JSON.stringify(session)}
      <form action={async() => {
        'use server'
        await signOut()
      }}>
        <button type='submit'>Sign out</button>
      </form>
    </div>
  )
}
