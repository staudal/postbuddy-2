import {
  BarChartIcon,
  LayoutDashboardIcon,
  MailsIcon,
  TagIcon,
  UsersIcon,
  WorkflowIcon,
} from "lucide-react";

export const navigation = [
  {
    name: "Kampagner",
    href: "/dashboard/campaigns",
    icon: MailsIcon,
    current: true,
  },
  {
    name: "Segmenter",
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
    name: "Kuponer",
    href: "/dashboard/coupons",
    icon: TagIcon,
    current: false,
  },
  {
    name: "Integrationer",
    href: "/dashboard/integrations",
    icon: WorkflowIcon,
    current: false,
  },
  {
    name: "Rapporter",
    href: "/dashboard/reports",
    icon: BarChartIcon,
    current: false,
  },
];
