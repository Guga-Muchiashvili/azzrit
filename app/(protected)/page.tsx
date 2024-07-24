import { auth, signOut } from "@/auth";
import { db } from "@/lib/db";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import './styles.scss'
import Usernav from "../elements/user/UserNav";
import Link from "next/link";
import FilterTableComponent from "./components/filterComponent/FilterTableComponent";
import { filterTableLabels } from "../additional/texts";
import TableComponent from "./components/tableComponent/TableCard";
import {motion} from 'framer-motion'
import { TypeProvider, useTypeContext } from "./tableTypeContext/TypeContext";
import GamePageComponent from "./components/gamePageComponent/GamePaget";


export default async function Home() {
  return (
    <TypeProvider>
      <GamePageComponent/>
    </TypeProvider>

  )
}
