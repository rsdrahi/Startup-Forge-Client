'use client'
import { signOut, useSession } from "@/lib/auth-client";
import { LayoutSideContentLeft, CirclePlus, ListUl, Gear, House, BriefcaseFill, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome, FaSignOutAlt } from "react-icons/fa";

export function DashboardSideBar() {

  const router = useRouter()
  const { data: session } = useSession();
  console.log(session, "Session");

  const founderNavItems = [
    { icon: House, href: "/dashboard/founder", label: "Overview" },
    { icon: BriefcaseFill, href: "/dashboard/founder/myStartup", label: "My Startup" },
    { icon: CirclePlus, href: "/dashboard/founder/addOpportunity", label: "Add Opportunity" },
    { icon: ListUl, href: "/dashboard/founder/manageOpportunities", label: "Manage Opportunities" },
    { icon: Person, href: "/dashboard/founder/applications", label: "Applications" },
  ];

  const collaboratorNavItems = [
    { icon: House, href: "/dashboard/collaborator", label: "Overview" },
    { icon: BriefcaseFill, href: "/dashboard/founder/myApplications", label: "My Applications" },
    { icon: CirclePlus, href: "/dashboard/founder/profile", label: "profile" },
  ];

  const adminNavItems = [
    { icon: House, href: "/dashboard/collaborator", label: "Overview" },
    { icon: BriefcaseFill, href: "/dashboard/founder/manageUsers", label: "Manage Users" },
    { icon: CirclePlus, href: "/dashboard/founder/manageStartups", label: "Manage Startups" },
    { icon: CirclePlus, href: "/dashboard/founder/transactions", label: "Transactions" },
  ];

  const role = session?.user?.role;

  const navItems = role === "Founder" ? founderNavItems : role === "Collaborator" ? collaboratorNavItems : role === "Admin" ? adminNavItems
    : [];

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  const navContent = <nav className="flex flex-col gap-1">
    {navItems?.map((item) => (
      <Link
        href={item.href}
        key={item.label}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
        type="button"
        variant="ghost"
      >
        <item.icon className="size-5 text-muted" />
        {item.label}
      </Link>
    ))}
  </nav>

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">

        {/* user */}
        <div className="px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500/60 shrink-0">
              <Image
                width={40}
                height={40}
                src={session?.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session?.user?.name)}&background=7c3aed&color=fff&bold=true`}
                alt="Avatar"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="overflow-hidden">
              <p className="text-black text-sm font-bold truncate leading-tight">
                {session?.user?.name}
              </p>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${role === "collaborator" ? "text-yellow-400" : role === "founder" ? "text-indigo-400" : "text-pink-400"}`}>
                {role}
              </span>
            </div>
          </div>
        </div>

        {navContent}

        {/* Bottom Links */}
        <div className="px-3 py-4 border-t border-white/5 space-y-1">
          <Link href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-black hover:text-red-400 hover:bg-white/5 transition-all duration-150">
            <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              <FaHome size={13} />
            </span>
            Back to Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-black hover:text-red-400 hover:bg-red-500/5 transition-all duration-150 cursor-pointer"
          >
            <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              <FaSignOutAlt size={13} />
            </span>
            Sign Out
          </button>
        </div>
      </aside>
      <Drawer>
        <Button variant="secondary" className={'lg:hidden'}>
          {/* <LayoutSideContentLeft /> */}
          Menu
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}