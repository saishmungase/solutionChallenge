import Link from "next/link"
import { ArrowRight, Calendar, CheckCircle, Users, GraduationCap, BookMarked } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 border-b">
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">GuruAI</h1>
          </div>
        </nav>

        <div className="flex flex-col md:flex-row items-center gap-12 py-16">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Connecting Teachers and Students in a Smarter Way
            </h1>
            <p className="text-lg text-muted-foreground">
              GuruAI reduces teacher workload by managing assignments, tests, and providing personalized learning
              experiences for students.
            </p>
            <div className="pt-4 flex gap-4">
              <Link href="/teacher/dashboard">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                  Enter as Teacher <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/student/dashboard">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Enter as Student <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="edu-section overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="GuruAI Platform"
                  className="w-full h-auto rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-foreground mb-16">How GuruAI Works</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="edu-card p-6">
              <div className="edu-icon-container w-fit mb-6">
                <feature.icon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* For Teachers Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="edu-section overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Teacher Dashboard"
                  className="w-full h-auto rounded-md"
                />
              </div>
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold text-foreground">For Teachers</h2>
              <ul className="space-y-4">
                {teacherFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link href="/teacher/dashboard">
                  <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                    Enter as a Teacher
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Students Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2">
              <div className="edu-section overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Student Dashboard"
                  className="w-full h-auto rounded-md"
                />
              </div>
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold text-foreground">For Students</h2>
              <ul className="space-y-4">
                {studentFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link href="/student/dashboard">
                  <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                    Enter as a Student
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="edu-section text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to transform your teaching and learning experience?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join GuruAI today and experience a smarter way to connect teachers and students.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/teacher/dashboard">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                  Enter as Teacher <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/student/dashboard">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Enter as Student <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary">GuruAI</h1>
            </div>
            <div className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} GuruAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}

const features = [
  {
    icon: BookMarked,
    title: "Centralized Learning Materials",
    description:
      "Teachers upload notes and materials in one place, making it easy for students to access everything they need.",
  },
  {
    icon: Users,
    title: "Personalized Learning",
    description:
      "Students can learn from their preferred teaching style with AI-powered chat based on teacher's notes.",
  },
  {
    icon: Calendar,
    title: "Automated Assignments",
    description: "AI generates assignments and tests based on uploaded materials, saving teachers valuable time.",
  },
]

const teacherFeatures = [
  {
    title: "Comprehensive Dashboard",
    description: "View active students, track engagement, and monitor classroom activities at a glance.",
  },
  {
    title: "AI-Powered Assignment Creation",
    description: "Automatically generate assignments and tests based on your uploaded materials.",
  },
  {
    title: "Reduced Workload",
    description: "Stop answering the same questions repeatedly - let the AI handle common doubts based on your notes.",
  },
  {
    title: "Organized Calendar",
    description: "Keep track of upcoming assignments, tests, and important dates in one place.",
  },
]

const studentFeatures = [
  {
    title: "Personalized Learning Experience",
    description: "Learn from your preferred teacher's style through AI-powered chat based on their notes.",
  },
  {
    title: "Instant Doubt Resolution",
    description: "Get immediate answers to your questions without waiting for teacher availability.",
  },
  {
    title: "Organized Study Materials",
    description: "Access all your learning materials, assignments, and tests in one centralized location.",
  },
  {
    title: "Progress Tracking",
    description: "Keep track of your learning journey with recently learned topics and upcoming assignments.",
  },
]

