import { ListOrdered, Home, User, Bike, Store, Wallet, HandCoins, Megaphone, LogOut } from 'lucide-react'
import { MdLogout } from "react-icons/md";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from 'react-router'
import { useAuth } from '@/features/auth/hooks/useAuth';

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "User-Management",
    url: "/user-management",
    icon: User,
  },
  {
    title: "Order-Management",
    url: "/order-management",
    icon: ListOrdered,
  },
  {
    title: "Bike-Management",
    url: "/bike-management",
    icon: Bike,
  },
  {
    title: "Accessories-Management",
    url: "#",
    icon: Store,
  },
  {
    title: "Wallet-Management",
    url: "#",
    icon: Wallet,
  },
  {
    title: "Withdraw-Management",
    url: "#",
    icon: HandCoins,
  },
  {
    title: "Advertise-Management",
    url: "#",
    icon: Megaphone,
  },
  {
    title: "Marketing-Management",
    url: "#",
    icon: Megaphone,
  },
]


export function AppSidebar() {
  const {logout} = useAuth();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='my-5 text-xl font-bold'>Admin Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items?.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <SidebarMenuButton asChild>


                  <button onClick={() => logout()}>
                    <MdLogout />
                    Logout
                  </button>

                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
