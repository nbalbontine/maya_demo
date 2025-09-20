"use client"

import {
  ActionToolbarAddLayer,
  Designer,
  DesignerCanvas,
  DesignerContent,
  DesignerFrame,
  DesignerToolbar,
  DesignerToolbarButton,
  DesignerToolbarGroup,
  DesignerToolbarSeparator,
} from "./designer"
import { IconPlus } from "@tabler/icons-react"
import { toast } from "sonner"

interface ToolbarMainProps {
  className?: string
  onAddLayer?: () => void
  onCustomAction?: () => void
  onCameraCapture?: () => void
  onMagicWand?: () => void
  onSettings?: () => void
}

export function ToolbarMain({
  className,
  onAddLayer,
  onCustomAction,
  onCameraCapture,
  onMagicWand,
  onSettings
}: ToolbarMainProps) {
  return (
    <Designer className={className}>
      <DesignerContent>
        <DesignerCanvas>
          <DesignerFrame>
            <div className="text-center space-y-4">
              <div className="text-8xl">🎨</div>
              <h2 className="text-2xl font-bold text-slate-700">Main Designer Toolbar</h2>
              <p className="text-slate-500 max-w-md">
                A comprehensive toolbar with grouped actions, separators, and custom buttons. 
                Perfect for design applications and creative workflows.
              </p>
            </div>
          </DesignerFrame>
        </DesignerCanvas>
      </DesignerContent>
      
      <DesignerToolbar position="top">
        {/* Layer Management Group */}
        <DesignerToolbarGroup>
          <ActionToolbarAddLayer onAddLayer={onAddLayer} />
        </DesignerToolbarGroup>
        
        <DesignerToolbarSeparator />
        
        {/* Creation Tools Group */}
        <DesignerToolbarGroup>
          <DesignerToolbarButton
            tooltip="Text Tool"
            onClick={onCustomAction || (() => toast("Text tool selected"))}
          >
            T
          </DesignerToolbarButton>
          
          <DesignerToolbarButton
            tooltip="Heading"
            onClick={onCameraCapture || (() => toast("Heading tool selected"))}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 12h12M6 20V4M18 20V4"/>
            </svg>
          </DesignerToolbarButton>
          
          <DesignerToolbarButton
            tooltip="Font Style"
            onClick={onMagicWand || (() => toast("Font style selected"))}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7V4h16v3M9 20h6M12 4v16"/>
            </svg>
          </DesignerToolbarButton>
          
          <DesignerToolbarButton
            tooltip="Image"
            onClick={() => toast("Image tool selected")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
              <circle cx="9" cy="9" r="2"/>
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
            </svg>
          </DesignerToolbarButton>
        </DesignerToolbarGroup>
        
        <DesignerToolbarSeparator />
        
        {/* Action Button */}
        <DesignerToolbarGroup>
          <DesignerToolbarButton
            tooltip="Add Button"
            onClick={onSettings || (() => toast("Button added"))}
            className="bg-accent text-accent-foreground px-3"
          >
            <IconPlus size={14} /> Button
          </DesignerToolbarButton>
        </DesignerToolbarGroup>
      </DesignerToolbar>
    </Designer>
  )
}

// Demo component for showcasing different configurations
export function ToolbarMainDemo() {
  const handleActions = {
    onAddLayer: () => toast.success("Layer added successfully!"),
    onCustomAction: () => toast.info("Custom action executed"),
    onCameraCapture: () => toast.info("📸 Photo captured!"),
    onMagicWand: () => toast.info("✨ Magic wand activated!"),
    onSettings: () => toast.info("⚙️ Settings opened"),
    onDownload: () => toast.success("📥 Download started"),
    onShare: () => toast.info("🔗 Share dialog opened")
  }

  return (
    <div className="space-y-6">
      {/* Main Toolbar */}
      <div className="relative h-96">
        <ToolbarMain {...handleActions} />
      </div>
      
      {/* Alternative Positions Demo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bottom Position */}
        <div className="relative h-64 border border-slate-200 rounded-lg overflow-hidden">
          <Designer>
            <DesignerContent>
              <DesignerCanvas>
                <DesignerFrame>
                  <div className="text-center">
                    <div className="text-4xl mb-2">⬇️</div>
                    <p className="text-sm text-slate-600">Bottom Toolbar</p>
                  </div>
                </DesignerFrame>
              </DesignerCanvas>
            </DesignerContent>
            <DesignerToolbar position="bottom">
              <DesignerToolbarGroup>
                <DesignerToolbarButton tooltip="Text" onClick={() => toast("Text clicked")}>
                  T
                </DesignerToolbarButton>
                <DesignerToolbarButton tooltip="Heading" onClick={() => toast("Heading clicked")}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 12h12M6 20V4M18 20V4"/>
                  </svg>
                </DesignerToolbarButton>
              </DesignerToolbarGroup>
            </DesignerToolbar>
          </Designer>
        </div>
        
        {/* Side Position */}
        <div className="relative h-64 border border-slate-200 rounded-lg overflow-hidden">
          <Designer>
            <DesignerContent>
              <DesignerCanvas>
                <DesignerFrame>
                  <div className="text-center">
                    <div className="text-4xl mb-2">➡️</div>
                    <p className="text-sm text-slate-600">Side Toolbar</p>
                  </div>
                </DesignerFrame>
              </DesignerCanvas>
            </DesignerContent>
            <DesignerToolbar position="right">
              <DesignerToolbarGroup>
                <DesignerToolbarButton tooltip="Font Style" onClick={() => toast("Font style clicked")}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 7V4h16v3M9 20h6M12 4v16"/>
                  </svg>
                </DesignerToolbarButton>
                <DesignerToolbarButton tooltip="Add Button" onClick={() => toast("Button added")} className="bg-accent text-accent-foreground px-2">
                  <IconPlus size={14} /> Button
                </DesignerToolbarButton>
              </DesignerToolbarGroup>
            </DesignerToolbar>
          </Designer>
        </div>
      </div>
    </div>
  )
}
