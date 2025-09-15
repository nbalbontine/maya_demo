"use client"

import { MainTopFloatingToolbar } from "@/components/maya_components/ui/Main_top_floating_toolbar"

export default function MainToolbarDemo() {
  const handleAddClick = () => {
    console.log("Add clicked")
  }

  const handleCameraClick = () => {
    console.log("Camera clicked")
  }

  const handleMagicWandClick = () => {
    console.log("Magic wand clicked")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Main Top Floating Toolbar Demo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A floating toolbar component with add, camera, and magic wand tools, 
            designed to match the Figma reference with shadcn styling.
          </p>
        </div>

        <div className="space-y-8">
          {/* Default Position - Centered */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Default Toolbar</h2>
            <div className="flex justify-center">
              <MainTopFloatingToolbar
                onAddClick={handleAddClick}
                onCameraClick={handleCameraClick}
                onMagicWandClick={handleMagicWandClick}
              />
            </div>
          </div>

          {/* Different Positions */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Positioning Examples</h2>
            
            {/* Top Left */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Top Left</h3>
              <div className="relative bg-white dark:bg-slate-800 rounded-lg border h-40 p-4">
                <div className="absolute top-4 left-4">
                  <MainTopFloatingToolbar
                    onAddClick={handleAddClick}
                    onCameraClick={handleCameraClick}
                    onMagicWandClick={handleMagicWandClick}
                  />
                </div>
              </div>
            </div>

            {/* Top Center */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Top Center</h3>
              <div className="relative bg-white dark:bg-slate-800 rounded-lg border h-40 p-4">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <MainTopFloatingToolbar
                    onAddClick={handleAddClick}
                    onCameraClick={handleCameraClick}
                    onMagicWandClick={handleMagicWandClick}
                  />
                </div>
              </div>
            </div>

            {/* Top Right */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Top Right</h3>
              <div className="relative bg-white dark:bg-slate-800 rounded-lg border h-40 p-4">
                <div className="absolute top-4 right-4">
                  <MainTopFloatingToolbar
                    onAddClick={handleAddClick}
                    onCameraClick={handleCameraClick}
                    onMagicWandClick={handleMagicWandClick}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Custom Styling */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Custom Styling</h2>
            <div className="flex justify-center">
              <MainTopFloatingToolbar
                className="bg-blue-50/90 border-blue-200/60 dark:bg-blue-950/90 dark:border-blue-800/60"
                onAddClick={handleAddClick}
                onCameraClick={handleCameraClick}
                onMagicWandClick={handleMagicWandClick}
              />
            </div>
          </div>

          {/* Usage Instructions */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Usage</h2>
            <div className="bg-white dark:bg-slate-800 rounded-lg border p-6">
              <pre className="text-sm overflow-x-auto">
{`import { MainTopFloatingToolbar } from "@/components/maya_components/ui/Main_top_floating_toolbar"

<MainTopFloatingToolbar
  onAddClick={() => console.log("Add clicked")}
  onCameraClick={() => console.log("Camera clicked")}
  onMagicWandClick={() => console.log("Magic wand clicked")}
  className="custom-class" // optional
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
