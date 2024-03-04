"use client";

import {
  BarChartIcon,
  LayoutDashboardIcon,
  MailsIcon,
  TagIcon,
  UsersIcon,
  WorkflowIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Campaigns",
    href: "/dashboard/campaigns",
    icon: MailsIcon,
    current: true,
  },
  {
    name: "Segments",
    href: "/dashboard/segments",
    icon: UsersIcon,
    current: false,
  },
  {
    name: "Designs",
    href: "/dashboard/designs",
    icon: LayoutDashboardIcon,
    current: false,
  },
  {
    name: "Coupons",
    href: "/dashboard/coupons",
    icon: TagIcon,
    current: false,
  },
  {
    name: "Integrations",
    href: "/dashboard/integrations",
    icon: WorkflowIcon,
    current: false,
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: BarChartIcon,
    current: false,
  },
];

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
