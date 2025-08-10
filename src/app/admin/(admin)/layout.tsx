import { AppSidebar } from "@/components/app-sidebar"
import TopBar from "@/components/top-bar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <TopBar />
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}