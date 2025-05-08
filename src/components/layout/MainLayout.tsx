
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6">
          <div className="flex items-center mb-6">
            <SidebarTrigger />
            <h1 className="text-xl font-bold ml-2">San Remo Pizzeria</h1>
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
