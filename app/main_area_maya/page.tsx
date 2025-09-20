"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import DashboardSplitViewer from "@/components/maya_components/ui/dashboard-split-viewer"
import { Navbar06 } from "@/components/ui/shadcn-io/navbar-06"

export default function MainAreaMaya() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar06 
        className="flex-shrink-0"
        onNavItemClick={(href) => console.log('Navigation clicked:', href)}
        onLanguageChange={(lang) => console.log('Language changed:', lang)}
        onThemeChange={(theme) => console.log('Theme changed:', theme)}
        onUserItemClick={(item) => console.log('User menu clicked:', item)}
      />
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
