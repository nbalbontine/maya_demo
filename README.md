# MAYA DEMO

A comprehensive UI component library built with Next.js, React, and shadcn/ui, featuring advanced 360° viewers, interactive maps, and modern navigation components.

## 🚀 Features

- **360° Split Viewer**: Dual panoramic viewers with synchronization controls
- **Interactive Floor Maps**: 2D mapping with path tracking and zoom functionality  
- **Navigation Components**: Modern bottom navigation, toolbars, and floating controls
- **Calendar Components**: Advanced date pickers and calendar interfaces
- **GPS & Location**: GPS locator with directional indicators
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript support
- **Accessibility**: WCAG compliant components

## 📦 Tech Stack

- **Framework**: Next.js 15.5.0 with App Router
- **UI Library**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **3D Graphics**: Three.js for 360° rendering
- **Maps**: Leaflet & React Leaflet
- **Icons**: Lucide React & Tabler Icons
- **TypeScript**: Full type safety

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/maya-demo.git
cd maya-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
MAYA_DEMO/
├── app/                    # Next.js App Router
│   ├── ui-showcase/       # Component showcase page
│   ├── demo/              # Demo pages
│   └── ...
├── components/            
│   ├── ui/               # shadcn/ui base components
│   └── maya_components/  # Custom MAYA DEMO components
│       ├── ui/           # Core Maya UI components
│       ├── blocks/       # Composite components
│       └── demos/        # Demo implementations
├── lib/                  # Utilities and helpers
├── public/              # Static assets (360° images, maps, icons)
├── package.json         # Dependencies and scripts
└── components.json      # shadcn/ui configuration
```

## 🎯 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

## 🧩 Component Categories

### 360° Viewer Components
- **SplitViewer**: Dual 360° panoramic viewers with sync controls
- **Viewer360**: Individual Three.js-based 360° viewer
- **FloatingToolbar**: Date navigation for panoramic sequences

### Navigation & Toolbars
- **Bottom Navigation**: Full-screen and half-screen variants
- **Top Navigation**: Header navigation with responsive design
- **Location Toolbar**: GPS and location-based controls
- **Main Toolbar**: Primary action toolbar
- **Splitscreen Toolbar**: Controls for split-screen functionality

### Maps & Location
- **FloorMap**: Interactive 2D floor plans with path tracking
- **GPS Locator**: Directional GPS indicator with rotation
- **CapturePoint**: Interactive map markers
- **MapControls**: Zoom, pan, and navigation controls

### Calendar & Date
- **Calendar Popover**: Date picker with popover interface
- **Calendar Toolbar**: Calendar navigation and controls

## 🎨 Design System

The project uses shadcn/ui's "new-york" style with:
- **Color Scheme**: Neutral base colors with CSS variables
- **Typography**: Modern, readable font stack
- **Spacing**: Consistent spacing scale
- **Animations**: Smooth transitions with Framer Motion

## 🔧 Configuration

### shadcn/ui Setup
The project is configured with shadcn/ui using:
- Style: "new-york"
- Base color: "neutral" 
- CSS variables enabled
- Path aliases configured

### Tailwind CSS
- Version 4 with PostCSS integration
- Custom animations via `tw-animate-css`
- Responsive breakpoints optimized for component library

## 📱 Responsive Design

All components are designed mobile-first with breakpoints:
- `xs`: 320px+ (mobile)
- `sm`: 640px+ (large mobile)
- `md`: 768px+ (tablet)
- `lg`: 1024px+ (desktop)
- `xl`: 1280px+ (large desktop)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-component`
3. Commit changes: `git commit -m "Add new component"`
4. Push to branch: `git push origin feature/new-component`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the excellent component foundation
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Three.js](https://threejs.org/) for 3D rendering capabilities
- [Leaflet](https://leafletjs.com/) for mapping functionality