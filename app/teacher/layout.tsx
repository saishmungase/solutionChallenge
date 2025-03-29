"use client"

import type React from "react"

import { LayoutDashboard, Upload, MessageSquare, Calendar } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Toaster } from "@/components/ui/toaster"

const teacherNavItems = [
  {
    href: "/teacher/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/teacher/upload",
    label: "Upload",
    icon: Upload,
  },
  {
    href: "/teacher/doubts",
    label: "Doubts",
    icon: MessageSquare,
  },
  {
    href: "/teacher/calendar",
    label: "Calendar",
    icon: Calendar,
  },
]

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DashboardLayout navItems={teacherNavItems} userType="teacher">
        {children}
      </DashboardLayout>
      <Toaster />
    </>
  )
}

