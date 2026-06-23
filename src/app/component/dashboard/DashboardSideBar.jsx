import { LayoutSideContentLeft, CirclePlus, ListUl, Gear, House, BriefcaseFill, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DashboardSideBar() {
  const navItems = [
    { icon: House, href: "/dashboard/founder", label: "Overview" },
    { icon: BriefcaseFill, href: "/dashboard/founder/myStartup", label: "My Startup" },
    { icon: CirclePlus, href: "/dashboard/founder/addOpportunity", label: "Add Opportunity" },
    { icon: ListUl, href: "/dashboard/founder/manageOpportunities", label: "Manage Opportunities" },
    { icon: Person, href: "/dashboard/founder/applications", label: "Applications" },
  ];

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
        {navContent}
      </aside>
      <Drawer>
        <Button variant="secondary" className={'lg:hidden'}>
          <LayoutSideContentLeft />
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