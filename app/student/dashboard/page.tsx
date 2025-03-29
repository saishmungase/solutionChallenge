"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, FileText, Calendar, Clock, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function StudentDashboard() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Welcome toast when dashboard loads
      toast({
        title: "Welcome to your dashboard!",
        description: "You can view your progress and upcoming assignments here.",
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [toast])

  return (
    <div className="space-y-6 light" style={{ colorScheme: "light" }}>
      <h1 className="text-2xl font-bold text-foreground">Student Dashboard</h1>

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
            <Card className="edu-stat-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Courses</p>
                    <p className="text-3xl font-bold text-foreground mt-1">5</p>
                  </div>
                  <div className="edu-icon-container">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Enrolled courses</p>
              </CardContent>
            </Card>

            <Card className="edu-stat-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Assignments</p>
                    <p className="text-3xl font-bold text-foreground mt-1">8</p>
                  </div>
                  <div className="edu-icon-container">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">3 pending submissions</p>
              </CardContent>
            </Card>

            <Card className="edu-stat-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Upcoming Tests</p>
                    <p className="text-3xl font-bold text-foreground mt-1">2</p>
                  </div>
                  <div className="edu-icon-container">
                    <Calendar className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Next test in 3 days</p>
              </CardContent>
            </Card>

            <Card className="edu-stat-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Study Time</p>
                    <p className="text-3xl font-bold text-foreground mt-1">12h</p>
                  </div>
                  <div className="edu-icon-container">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">This week</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recently Learned</CardTitle>
              <CardDescription>Topics you've recently studied</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-6">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                            <div>
                              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1"></div>
                              <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                          </div>
                          <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded"></div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {recentlyLearned.map((topic, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="edu-icon-container">
                            <BookOpen className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">{topic.title}</p>
                            <p className="text-muted-foreground text-sm">
                              {topic.subject} • {topic.teacher}
                            </p>
                          </div>
                        </div>
                        <span className="edu-badge edu-badge-blue">{topic.progress}% Complete</span>
                      </div>
                      <Progress value={topic.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Your upcoming assignments and tests</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="p-3 border rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                          <div className="flex-1">
                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1"></div>
                            <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mb-1"></div>
                            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                      <div className="edu-icon-container">
                        <deadline.icon className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium">{deadline.title}</p>
                        <p className="text-muted-foreground text-sm">{deadline.subject}</p>
                        <p className="text-muted-foreground/70 text-xs mt-1">{deadline.dueDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Learning</CardTitle>
          <CardDescription>Based on your recent activity and upcoming tests</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-3"></div>
                    <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-3 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedLearning.map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg border transition-all hover:border-primary hover:shadow-md"
                >
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="edu-icon-container">
                        <BookOpen className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="edu-badge edu-badge-blue">{item.subject}</span>
                    </div>
                    <h3 className="font-medium mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground/70 text-xs">{item.teacher}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowRight className="h-4 w-4 text-green-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

const recentlyLearned = [
  {
    title: "Introduction to Calculus",
    subject: "Mathematics",
    teacher: "Prof. Johnson",
    progress: 75,
  },
  {
    title: "Mechanics and Dynamics",
    subject: "Physics",
    teacher: "Dr. Smith",
    progress: 60,
  },
  {
    title: "Chemical Bonding",
    subject: "Chemistry",
    teacher: "Ms. Williams",
    progress: 90,
  },
  {
    title: "Cell Structure and Function",
    subject: "Biology",
    teacher: "Dr. Brown",
    progress: 40,
  },
]

const upcomingDeadlines = [
  {
    icon: FileText,
    title: "Calculus Assignment",
    subject: "Mathematics",
    dueDate: "Due Tomorrow, 11:59 PM",
  },
  {
    icon: Calendar,
    title: "Physics Quiz",
    subject: "Physics",
    dueDate: "Friday, 10:00 AM",
  },
  {
    icon: FileText,
    title: "Chemistry Lab Report",
    subject: "Chemistry",
    dueDate: "Next Monday, 9:00 AM",
  },
]

const recommendedLearning = [
  {
    title: "Derivatives and Applications",
    subject: "Mathematics",
    description: "Learn about derivatives and their real-world applications.",
    teacher: "Prof. Johnson",
  },
  {
    title: "Newton's Laws of Motion",
    subject: "Physics",
    description: "Understand the fundamental laws that govern motion.",
    teacher: "Dr. Smith",
  },
  {
    title: "Periodic Table and Elements",
    subject: "Chemistry",
    description: "Explore the periodic table and properties of elements.",
    teacher: "Ms. Williams",
  },
]

