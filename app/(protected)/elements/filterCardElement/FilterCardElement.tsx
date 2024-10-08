"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTypeContext } from "../../tableTypeContext/TypeContext";

const FilterCardElement = ({
  label,
  index,
}: {
  label: string;
  index: number;
}) => {
  const { defineType, type } = useTypeContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.1 * index, ease: "easeInOut" }}
      className="w-1/4 h-full flex items-center justify-center hover:shadow-none shadow-md duration-500 shadow-red-700 bg-red-500 font-semibold cursor-pointer text-white rounded-3xl"
      onClick={() => defineType(label as any)}
    >
      <h1>{label}</h1>
    </motion.div>
  );
};

export default FilterCardElement;
