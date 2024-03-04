import DesktopSidebarUserMenu from "./desktop-sidebar-user-menu";
import DesktopSidebarNavigation from "./desktop-sidebar-navigation";

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
              <div className="mt-auto w-full">
                <DesktopSidebarUserMenu />
              </div>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
