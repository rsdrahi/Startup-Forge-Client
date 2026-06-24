'use client'
import { useSession } from "@/lib/auth-client";
import { LayoutSideContentLeft, CirclePlus, ListUl, Gear, House, BriefcaseFill, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export function DashboardSideBar() {

  const { data: session } = useSession();
  console.log(session, "Session");

  const navItems = [
    { icon: House, href: "/dashboard/founder", label: "Overview" },
    { icon: BriefcaseFill, href: "/dashboard/founder/myStartup", label: "My Startup" },
    { icon: CirclePlus, href: "/dashboard/founder/addOpportunity", label: "Add Opportunity" },
    { icon: ListUl, href: "/dashboard/founder/manageOpportunities", label: "Manage Opportunities" },
    { icon: Person, href: "/dashboard/founder/applications", label: "Applications" },
  ];

  const role = session?.user?.role;

  const navContent = <nav className="flex flex-col gap-1">
    {navItems.map((item) => (
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