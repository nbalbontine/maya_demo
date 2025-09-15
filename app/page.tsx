"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            MAYA DEMO
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A collection of beautiful UI components built with shadcn/ui and Next.js.
            Explore the component demos below.
          </p>
        </div>

        {/* Component Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* UI Showcase */}
          <Card className="group hover:shadow-lg transition-shadow border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎨 Complete UI Showcase
              </CardTitle>
              <CardDescription>
                View all Maya components in one comprehensive showcase with interactive demos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">✨</div>
                <p className="text-sm text-slate-600">
                  8 components • 5 toolbars • 2 navigation • Interactive demos
                </p>
              </div>
              <Link href="/ui-showcase">
                <Button className="w-full group-hover:bg-primary/90 bg-blue-600 hover:bg-blue-700">
                  View Complete Showcase
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Calendar Component */}
          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📅 Calendar Component
              </CardTitle>
              <CardDescription>
                Interactive calendar with date selection, keyboard navigation, and accessibility features.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">📅</div>
                <p className="text-sm text-slate-600">
                  Built with React Day Picker and shadcn/ui
                </p>
              </div>
              <Link href="/calendar">
                <Button className="w-full group-hover:bg-primary/90">
                  View Calendar Demo
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Placeholder for more components */}
          <Card className="opacity-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔧 More Components
              </CardTitle>
              <CardDescription>
                Additional components coming soon...
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">⚡</div>
                <p className="text-sm text-slate-600">
                  Future component demos will appear here
                </p>
              </div>
              <Button disabled className="w-full">
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="opacity-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎨 Design System
              </CardTitle>
              <CardDescription>
                Component library documentation and guidelines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">📚</div>
                <p className="text-sm text-slate-600">
                  Design tokens and component guidelines
                </p>
              </div>
              <Button disabled className="w-full">
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle>About MAYA DEMO</CardTitle>
            <CardDescription>
              A modern component library built with the latest technologies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center space-y-2">
                <div className="text-2xl">⚡</div>
                <h4 className="font-semibold">Next.js 15</h4>
                <p className="text-sm text-slate-600">Latest React framework</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl">🎨</div>
                <h4 className="font-semibold">Tailwind CSS</h4>
                <p className="text-sm text-slate-600">Utility-first styling</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl">🔧</div>
                <h4 className="font-semibold">shadcn/ui</h4>
                <p className="text-sm text-slate-600">High-quality components</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl">📱</div>
                <h4 className="font-semibold">Responsive</h4>
                <p className="text-sm text-slate-600">Mobile-first design</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
