"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { GraduationCap, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useToast } from "@/components/ui/use-toast"

interface DashboardLayoutProps {
  children: React.ReactNode
  navItems: {
    href: string
    label: string
    icon: React.ElementType
  }[]
  userType: "teacher" | "student"
}

export function DashboardLayout({ children, navItems, userType }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  // Fix hydration issues by ensuring consistent state initialization
  const [userName, setUserName] = useState<string>("")

  // Add useEffect with empty dependency array to ensure it only runs once on client
  useEffect(() => {
    // In a real app, you would fetch the user's name from an API
    setUserName(userType === "teacher" ? "Saish Mungase" : "Atharva Kadam")

    // Show welcome toast
    toast({
      title: `Welcome to VedSetu!`,
      description: `You are logged in as a ${userType}.`,
    })
  }, [userType, toast])

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
    router.push("/")
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar className="border-r bg-white">
          <SidebarHeader className="flex items-center justify-center py-4 border-b">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary">VedSetu</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b h-16 flex items-center px-6">
            <SidebarTrigger />
            <div className="ml-4 flex-1">
              <h1 className="text-xl font-semibold text-foreground">
                {userType === "teacher" ? "Teacher" : "Student"} Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">{userName}</span>
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                {userName.charAt(0)}
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6 bg-background">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

