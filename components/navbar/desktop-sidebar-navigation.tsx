"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { navigation } from "@/types/navigation";

export default function DesktopSidebarNavigation() {
  const pathname = usePathname();

  // update the current state of the navigation items
  navigation.forEach((item) => {
    item.current = item.href === pathname;
  });
  return (
    <>
      {navigation.map((item) => (
        <li key={item.name}>
          <Link href={item.href}>
            <Button
              className={cn(
                item.current
                  ? "bg-navbar-link text-white hover:bg-navbar-link"
                  : "bg-navbar text-navbar-text hover:bg-navbar-link hover:text-white",
                "w-full justify-start shadow-none"
              )}
            >
              <item.icon className="h-4 w-4 mr-2" aria-hidden="true" />
              {item.name}
            </Button>
          </Link>
        </li>
      ))}
    </>
  );
}
