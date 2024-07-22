import { auth, signOut } from "@/auth";
import { db } from "@/lib/db";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import './styles.scss'
import Usernav from "../elements/user/UserNav";
import Link from "next/link";
import FilterTableComponent from "./components/FilterComponent/FilterTableComponent";
import { filterTableLabels } from "../additional/texts";
import TableComponent from "./components/TableComponent/TableCardComponent";
import {motion} from 'framer-motion'
import { TypeProvider, useTypeContext } from "./tableTypeContext/TypeContext";
import GamePageComponent from "./components/GamePageComponent/GamePageComponent";


export default async function Home() {
  return (
    <TypeProvider>
      <GamePageComponent/>
    </TypeProvider>

  )
}
