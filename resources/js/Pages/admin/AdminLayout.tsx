import { SidebarInset, SidebarProvider } from "@/Components/ui/sidebar"
import { AppSidebar } from "@/Components/app-sidebar"
import { SiteHeader } from "@/Components/site-header"
// import { ErrorOverlay } from "@/Components/error-overlay"
import { Toaster } from "sonner"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <Toaster position="top-center" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
      {/* <ErrorOverlay /> */}
    </SidebarProvider>
  )
}