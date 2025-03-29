"use client"

import type React from "react"

import { LayoutDashboard, BookOpen, MessageSquare, Calendar } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Toaster } from "@/components/ui/toaster"

const studentNavItems = [
  {
    href: "/student/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/student/learn",
    label: "Learn",
    icon: BookOpen,
  },
  {
    href: "/student/doubts",
    label: "Doubts",
    icon: MessageSquare,
  },
  {
    href: "/student/assignments",
    label: "Assignments",
    icon: Calendar,
  },
]

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DashboardLayout navItems={studentNavItems} userType="student">
        {children}
      </DashboardLayout>
      <Toaster />
    </>
  )
}

