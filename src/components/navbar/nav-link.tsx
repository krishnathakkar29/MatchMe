"use client";

import { NavbarItem } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  href: string;
  label: string;
};

function NavLink({ href, label }: Props) {
  const pathname = usePathname();

  return (
    <NavbarItem isActive={pathname === href} as={Link} href={href}>
      <span>{label}</span>
    </NavbarItem>
  );
}

export default NavLink;
