import MobileSidebar from "./mobile-sidebar";
import DesktopSidebar from "./desktop-sidebar";

export default function Navbar({ user }: { user: any }) {
  return (
    <>
      <div>
        <MobileSidebar />
        <DesktopSidebar user={user} />
      </div>
    </>
  );
}
