import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";
import Header from "@/components/global/Header";

const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger/>
        <div className="px-3 md:px-10">
          <Header />
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
