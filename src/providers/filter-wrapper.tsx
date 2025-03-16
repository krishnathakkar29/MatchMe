"use client";

import Filters from "@/components/filters";
import { usePathname } from "next/navigation";

function FilterWrapper() {
  const pathname = usePathname();

  if (pathname === "/members") return <Filters />;
  return null;
}

export default FilterWrapper;
