"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUp, BookOpen, FileText, Calendar, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function UploadPage() {
  const { toast } = useToast()
  const [uploadLoading, setUploadLoading] = useState(false)
  const [generatingContent, setGeneratingContent] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  const handleUploadNotes = (e: React.FormEvent) => {
    e.preventDefault()
    setUploadLoading(true)

    // Simulate upload process
    setTimeout(() => {
      setUploadLoading(false)
      toast({
        title: "Upload Successful",
        description: "Your teaching material has been uploaded successfully.",
      })
    }, 1500)
  }

  const handleGenerateContent = (e: React.FormEvent) => {
    e.preventDefault()
    setGeneratingContent(true)

    // Simulate AI generating content
    setTimeout(() => {
      setGeneratingContent(false)
      setGeneratedContent(
        selectedTopic === "calculus"
          ? "# Calculus Assignment\n\n## Problem 1\nFind the derivative of f(x) = 3x² + 2x - 5\n\n## Problem 2\nEvaluate the integral ∫(2x + 3)dx from 0 to 4\n\n## Problem 3\nFind the critical points of g(x) = x³ - 6x² + 9x + 2"
          : "# Physics Test\n\n## Question 1\nA ball is thrown vertically upward with an initial velocity of 20 m/s. How high will it go? (g = 9.8 m/s²)\n\n## Question 2\nCalculate the force required to accelerate a 1500 kg car from rest to 27 m/s in 10 seconds.\n\n## Question 3\nA 2 kg object moving at 5 m/s collides with a stationary 3 kg object. If the collision is perfectly elastic, what are the final velocities?",
      )

      toast({
        title: "Content Generated",
        description: "AI has successfully generated content based on your selected topic.",
      })
    }, 2000)
  }

  const handleAssignToStudents = () => {
    toast({
      title: "Content Assigned",
      description: "The generated content has been assigned to your students.",
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Upload & Create</h1>
      <p className="text-muted-foreground">Upload teaching materials or generate assignments and tests</p>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="upload" className="flex-1">
            Upload Notes
          </TabsTrigger>
          <TabsTrigger value="generate" className="flex-1">
            Generate Content
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Teaching Materials</CardTitle>
              <CardDescription>Upload your notes, presentations, or other teaching materials</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUploadNotes} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="e.g., Introduction to Calculus" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the material"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Upload File</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <FileUp className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">Drag and drop your file here, or click to browse</p>
                    <p className="text-muted-foreground/70 text-sm">Supports PDF, PPT, DOCX (Max 50MB)</p>
                    <Input id="file" type="file" className="hidden" />
                    <Button variant="outline" className="mt-4">
                      Browse Files
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={uploadLoading}>
                  {uploadLoading ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                    </span>
                  ) : (
                    "Upload Material"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generate" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Assignments & Tests</CardTitle>
              <CardDescription>
                Automatically create assignments and tests based on your uploaded materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerateContent} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="content-type">Content Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="assignment">Assignment</SelectItem>
                      <SelectItem value="test">Test</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="practice">Practice Problems</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Select Topic</Label>
                  <Select onValueChange={(value) => setSelectedTopic(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select from your uploaded materials" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="calculus">Introduction to Calculus</SelectItem>
                      <SelectItem value="physics">Mechanics and Dynamics</SelectItem>
                      <SelectItem value="chemistry">Chemical Bonding</SelectItem>
                      <SelectItem value="biology">Cell Structure and Function</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                      <SelectItem value="mixed">Mixed Levels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="num-questions">Number of Questions</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of questions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Questions</SelectItem>
                      <SelectItem value="10">10 Questions</SelectItem>
                      <SelectItem value="15">15 Questions</SelectItem>
                      <SelectItem value="20">20 Questions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="due-date">Due Date (Optional)</Label>
                  <Input id="due-date" type="date" />
                </div>

                <Button type="submit" className="w-full" disabled={!selectedTopic || generatingContent}>
                  {generatingContent ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                    </span>
                  ) : (
                    "Generate Content"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {generatedContent && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Generated Content</CardTitle>
                <CardDescription>AI-generated content based on your selected topic</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-md border">
                  <pre className="whitespace-pre-wrap font-mono text-sm">{generatedContent}</pre>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-4">
                <Button variant="outline">Edit Content</Button>
                <Button onClick={handleAssignToStudents}>Assign to Students</Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUploads.map((upload, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
                  <div className="edu-icon-container">
                    <upload.icon className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{upload.title}</p>
                    <p className="text-muted-foreground text-xs">{upload.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAssignments.map((assignment, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
                  <div className="edu-icon-container">
                    <assignment.icon className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{assignment.title}</p>
                    <p className="text-muted-foreground text-xs">{assignment.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTests.map((test, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
                  <div className="edu-icon-container">
                    <test.icon className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{test.title}</p>
                    <p className="text-muted-foreground text-xs">{test.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const recentUploads = [
  {
    icon: BookOpen,
    title: "Introduction to Calculus",
    date: "2 days ago",
  },
  {
    icon: BookOpen,
    title: "Chemical Bonding",
    date: "5 days ago",
  },
  {
    icon: BookOpen,
    title: "Mechanics and Dynamics",
    date: "1 week ago",
  },
  {
    icon: BookOpen,
    title: "Cell Structure and Function",
    date: "2 weeks ago",
  },
]

const recentAssignments = [
  {
    icon: FileText,
    title: "Calculus Problem Set",
    date: "Yesterday",
  },
  {
    icon: FileText,
    title: "Physics Homework",
    date: "3 days ago",
  },
  {
    icon: FileText,
    title: "Chemistry Lab Report",
    date: "1 week ago",
  },
  {
    icon: FileText,
    title: "Biology Research",
    date: "2 weeks ago",
  },
]

const recentTests = [
  {
    icon: Calendar,
    title: "Calculus Mid-term",
    date: "Tomorrow",
  },
  {
    icon: Calendar,
    title: "Physics Quiz",
    date: "Next week",
  },
  {
    icon: Calendar,
    title: "Chemistry Test",
    date: "In 2 weeks",
  },
  {
    icon: Calendar,
    title: "Biology Final",
    date: "In 1 month",
  },
]

