import { auth, signOut } from "@/auth";
import { db } from "@/lib/db";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import './styles.scss'
import Usernav from "../elements/user/UserNav";
import Link from "next/link";
import FilterTableComponent from "./components/FilterComponent/FilterTableComponent";
import { filterTableLabels } from "../additional/texts";
import TableComponent from "./components/tableComponent/TableComponent";


export default async function Home() {
  const session = await auth()
  return (
    <div className="w-full min-h-screen flex flex-col items-center py-9" id="MainPage">
      <Link href={'/landing'} className="text-white absolute top-2 left-2">Go Back</Link>
      <Usernav/>
      <FilterTableComponent/>
      <div className="w-full min-h-screen flex flex-wrap gap-40 relative px-10 py-28 ">
        <h1 className="text-white text-3xl font-bold absolute left-10 top-10">Tables</h1>
        {filterTableLabels.map((item) => (
          <TableComponent />
        ))}
      </div>
    </div>
  )
}
