import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import DashboardSplitViewer from "@/components/maya_components/ui/dashboard-split-viewer"

export default function HomePage() {
  return (
    <SidebarProvider
      defaultOpen={false}
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardSplitViewer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
