"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, BookOpen, FileText, Calendar, MessageSquare } from "lucide-react"
import {
  Chart,
  ChartContainer,
  ChartGrid,
  ChartLine,
  ChartTooltip,
  ChartTooltipContent,
  ChartXAxis,
  ChartYAxis,
  ChartBar,
} from "@/components/ui/chart"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"

export default function TeacherDashboard() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Welcome toast when dashboard loads
      toast({
        title: "Welcome to your dashboard!",
        description: "You can manage your classes and monitor student progress here.",
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [toast])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Teacher Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          // Skeleton loaders for stats
          Array(4)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="edu-stat-card">
                <CardContent className="p-6">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                </CardContent>
              </Card>
            ))
        ) : (
          <>
            <StatsCard
              title="Active Students"
              value="124"
              description="Total students learning from you"
              icon={Users}
              trend="+12% from last month"
              color="blue"
            />
            <StatsCard
              title="Uploaded Materials"
              value="36"
              description="Notes and presentations"
              icon={BookOpen}
              trend="+3 new this week"
              color="green"
            />
            <StatsCard
              title="Assignments"
              value="18"
              description="Active assignments"
              icon={FileText}
              trend="4 due this week"
              color="purple"
            />
            <StatsCard
              title="Upcoming Tests"
              value="5"
              description="Scheduled tests"
              icon={Calendar}
              trend="Next on Friday"
              color="amber"
            />
          </>
        )}
      </div>

      <Tabs defaultValue="engagement" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="engagement" className="flex-1">
            Student Engagement
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex-1">
            Class Performance
          </TabsTrigger>
        </TabsList>
        <TabsContent value="engagement" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Engagement</CardTitle>
              <CardDescription>Weekly student activity and material views</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                {isLoading ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-md">
                    <div className="text-center">
                      <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
                      <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mx-auto"></div>
                    </div>
                  </div>
                ) : (
                  <EngagementChart />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Class Performance</CardTitle>
              <CardDescription>Average scores across different subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                {isLoading ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-md">
                    <div className="text-center">
                      <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
                      <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mx-auto"></div>
                    </div>
                  </div>
                ) : (
                  <PerformanceChart />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest classroom activities</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="p-3 border rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1"></div>
                          <div className="h-3 w-48 bg-gray-200 rounded animate-pulse mb-1"></div>
                          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 rounded-lg border">
                    <div className="edu-icon-container">
                      <activity.icon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-muted-foreground text-sm">{activity.description}</p>
                      <p className="text-muted-foreground/70 text-xs mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Schedule</CardTitle>
            <CardDescription>Your upcoming classes and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="p-3 border rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mt-1 mb-1"></div>
                          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingSchedule.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 rounded-lg border">
                    <div className="edu-icon-container">
                      <item.icon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{item.title}</p>
                        <span className={`edu-badge ${item.type === "class" ? "edu-badge-blue" : "edu-badge-amber"}`}>
                          {item.type === "class" ? "Class" : "Deadline"}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                      <p className="text-muted-foreground/70 text-xs mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  color,
}: {
  title: string
  value: string
  description: string
  icon: React.ElementType
  trend: string
  color: "blue" | "green" | "purple" | "amber"
}) {
  const colorMap = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    amber: "text-amber-600",
  }

  const bgColorMap = {
    blue: "bg-blue-50",
    green: "bg-green-50",
    purple: "bg-purple-50",
    amber: "bg-amber-50",
  }

  return (
    <Card className="edu-stat-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
          </div>
          <div className={`${bgColorMap[color]} p-3 rounded-full`}>
            <Icon className={`h-6 w-6 ${colorMap[color]}`} />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{description}</p>
        <p className={`text-xs ${colorMap[color]} mt-2`}>{trend}</p>
      </CardContent>
    </Card>
  )
}

// Fix Recharts context error by ensuring proper Chart component usage
function EngagementChart() {
  const data = [
    { date: "Mon", views: 45, active: 32 },
    { date: "Tue", views: 52, active: 38 },
    { date: "Wed", views: 61, active: 45 },
    { date: "Thu", views: 48, active: 40 },
    { date: "Fri", views: 64, active: 52 },
    { date: "Sat", views: 38, active: 30 },
    { date: "Sun", views: 29, active: 25 },
  ]

  return (
    <Chart data={data}>
      <ChartContainer>
        <ChartGrid x={{ strokeDasharray: "10 5" }} y={{ strokeDasharray: "10 5" }} />
        <ChartYAxis tickCount={5} tickFormat={(value) => `${value}`} />
        <ChartXAxis />
        <ChartLine dataKey="views" stroke="#22c55e" strokeWidth={2} dot={{ fill: "#22c55e", r: 4 }} />
        <ChartLine dataKey="active" stroke="#16a34a" strokeWidth={2} dot={{ fill: "#16a34a", r: 4 }} />
        <ChartTooltip>
          <ChartTooltipContent className="bg-white border-gray-200 text-foreground" />
        </ChartTooltip>
      </ChartContainer>
    </Chart>
  )
}

function PerformanceChart() {
  const data = [
    { subject: "Math", score: 78 },
    { subject: "Science", score: 82 },
    { subject: "History", score: 74 },
    { subject: "English", score: 85 },
    { subject: "Physics", score: 79 },
  ]

  return (
    <Chart data={data}>
      <ChartContainer>
        <ChartGrid x={{ strokeDasharray: "10 5" }} y={{ strokeDasharray: "10 5" }} />
        <ChartYAxis tickCount={5} tickFormat={(value) => `${value}%`} />
        <ChartXAxis />
        <ChartBar dataKey="score" fill="#22c55e" radius={4} />
        <ChartTooltip>
          <ChartTooltipContent className="bg-white border-gray-200 text-foreground" />
        </ChartTooltip>
      </ChartContainer>
    </Chart>
  )
}

const recentActivities = [
  {
    icon: FileText,
    title: "Assignment Submitted",
    description: "5 students submitted the Physics assignment",
    time: "2 hours ago",
  },
  {
    icon: BookOpen,
    title: "New Material Viewed",
    description: "Your 'Introduction to Calculus' notes were viewed by 28 students",
    time: "5 hours ago",
  },
  {
    icon: MessageSquare,
    title: "New Question",
    description: "A student asked a question about the Chemistry experiment",
    time: "Yesterday",
  },
  {
    icon: Users,
    title: "New Student Joined",
    description: "3 new students joined your Physics class",
    time: "2 days ago",
  },
]

const upcomingSchedule = [
  {
    icon: Calendar,
    title: "Physics Class",
    description: "Grade 11-A",
    time: "Today, 10:00 AM",
    type: "class",
  },
  {
    icon: FileText,
    title: "Math Assignment Due",
    description: "Trigonometry Problems",
    time: "Tomorrow, 11:59 PM",
    type: "deadline",
  },
  {
    icon: Calendar,
    title: "Chemistry Lab",
    description: "Grade 10-B",
    time: "Wednesday, 2:00 PM",
    type: "class",
  },
  {
    icon: FileText,
    title: "Physics Test",
    description: "Mechanics and Dynamics",
    time: "Friday, 9:00 AM",
    type: "deadline",
  },
]

