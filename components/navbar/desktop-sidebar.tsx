import {
  BarChartIcon,
  LayoutDashboardIcon,
  MailsIcon,
  TagIcon,
  UsersIcon,
  WorkflowIcon
} from "lucide-react";
import DesktopSidebarUserMenu from "./desktop-sidebar-user-menu";
import DesktopSidebarNavigation from "./desktop-sidebar-navigation";

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

export default function DesktopSidebar({ user }: { user: any }) {
  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-navbar p-6">
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="space-y-1">
                  <DesktopSidebarNavigation />
                </ul>
              </li>
              <DesktopSidebarUserMenu user={user} />
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
