import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import DashboardSplitViewer from "@/components/maya_components/ui/dashboard-split-viewer"

export default function HomePage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="w-full h-10 bg-blue-500 flex-shrink-0"></div>
      <div className="flex-1 min-h-0">
        <SidebarProvider
          defaultOpen={false}
          style={
            {
              "--sidebar-width": "350px",
            } as React.CSSProperties
          }
          className="h-full [&_[data-slot=sidebar-container]]:relative [&_[data-slot=sidebar-container]]:inset-auto [&_[data-slot=sidebar-container]]:h-full"
        >
          <AppSidebar />
          <SidebarInset className="h-full">
            <DashboardSplitViewer />
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  )
}
