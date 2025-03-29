"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Star, MessageSquare, ThumbsUp, ThumbsDown, Send } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function LearnPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [messageInput, setMessageInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would filter the subjects/teachers based on the search query
    toast({
      title: "Search initiated",
      description: `Searching for "${searchQuery}"`,
    })
  }

  const handleSelectTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher)
    // Initialize chat with a welcome message
    setChatMessages([
      {
        id: "1",
        sender: "ai",
        content: `Hello! I'm your AI assistant based on ${teacher.name}'s teaching materials for ${teacher.subject}. How can I help you today?`,
        timestamp: new Date().toISOString(),
      },
    ])

    toast({
      title: "Teacher Selected",
      description: `You are now learning from ${teacher.name}'s materials.`,
    })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim() || !selectedTeacher || isLoading) return

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      content: messageInput,
      timestamp: new Date().toISOString(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setMessageInput("")
    setIsLoading(true)

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        content: generateAIResponse(messageInput, selectedTeacher),
        timestamp: new Date().toISOString(),
      }

      setChatMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Learn</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Find Topics & Teachers</CardTitle>
              <CardDescription>Search for subjects or teachers</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search subjects or teachers..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Tabs defaultValue="subjects">
                  <TabsList className="w-full">
                    <TabsTrigger value="subjects" className="flex-1">
                      Subjects
                    </TabsTrigger>
                    <TabsTrigger value="teachers" className="flex-1">
                      Teachers
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="subjects" className="mt-4">
                    <div className="space-y-2">
                      {subjects.map((subject) => (
                        <Button key={subject.id} variant="outline" className="w-full justify-start">
                          <subject.icon className="mr-2 h-4 w-4 text-green-600" />
                          {subject.name}
                        </Button>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="teachers" className="mt-4">
                    <div className="space-y-3">
                      {teachers.map((teacher) => (
                        <div
                          key={teacher.id}
                          className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
                            selectedTeacher?.id === teacher.id
                              ? "bg-blue-50 border border-blue-200"
                              : "bg-white hover:bg-gray-50 border border-gray-200"
                          }`}
                          onClick={() => handleSelectTeacher(teacher)}
                        >
                          <Avatar>
                            <AvatarImage src={teacher.avatar} />
                            <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{teacher.name}</p>
                            <p className="text-muted-foreground text-sm">{teacher.subject}</p>
                          </div>
                          <div className="ml-auto flex items-center">
                            <Badge variant="secondary" className="bg-green-50 text-green-700">
                              <Star className="h-3 w-3 mr-1 text-yellow-500" />
                              {teacher.rating}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {selectedTeacher ? (
            <Card className="h-full flex flex-col">
              <CardHeader className="border-b pb-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedTeacher.avatar} />
                    <AvatarFallback>{selectedTeacher.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{selectedTeacher.name}</CardTitle>
                    <CardDescription>
                      {selectedTeacher.subject} • AI Assistant based on teacher's materials
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden flex flex-col p-0">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "user" ? "bg-primary text-white" : "bg-gray-100 text-foreground"
                        }`}
                      >
                        <p>{message.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs opacity-70">
                            {new Date(message.timestamp).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })}
                          </span>
                          {message.sender === "ai" && (
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-gray-200">
                                <ThumbsUp className="h-3 w-3 text-gray-600" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-gray-200">
                                <ThumbsDown className="h-3 w-3 text-gray-600" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-3 bg-gray-100">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      placeholder="Ask a question about the subject..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !messageInput.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center p-6">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Select a Teacher to Start Learning</h3>
                <p className="text-muted-foreground max-w-md">
                  Choose a teacher from the list to start a personalized learning experience based on their teaching
                  materials.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

// Helper function to generate AI responses
function generateAIResponse(message: string, teacher: Teacher): string {
  const lowerMessage = message.toLowerCase()

  if (teacher.subject === "Mathematics") {
    if (lowerMessage.includes("derivative") || lowerMessage.includes("calculus")) {
      return "In calculus, a derivative measures the sensitivity to change of a function's output with respect to its input. It's represented as f'(x) or df/dx. For example, the derivative of f(x) = x² is f'(x) = 2x."
    } else if (lowerMessage.includes("theorem") || lowerMessage.includes("pythagorean")) {
      return "The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse equals the sum of squares of the other two sides: a² + b² = c²."
    }
  } else if (teacher.subject === "Physics") {
    if (lowerMessage.includes("newton") || lowerMessage.includes("motion")) {
      return "Newton's First Law states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force. This is also known as the law of inertia."
    } else if (lowerMessage.includes("gravity") || lowerMessage.includes("acceleration")) {
      return "The acceleration due to gravity on Earth is approximately 9.8 m/s². This means that every second an object is falling, its velocity increases by 9.8 meters per second."
    }
  }

  return `Based on ${teacher.name}'s materials on ${teacher.subject}, I can help answer your question about "${message}". Could you provide more specific details about what you'd like to learn?`
}

// Types
interface Subject {
  id: string
  name: string
  icon: React.ElementType
}

interface Teacher {
  id: string
  name: string
  subject: string
  avatar: string
  rating: number
}

interface ChatMessage {
  id: string
  sender: "user" | "ai"
  content: string
  timestamp: string
}

// Sample data
const subjects: Subject[] = [
  { id: "math", name: "Mathematics", icon: BookOpen },
  { id: "physics", name: "Physics", icon: BookOpen },
  { id: "chemistry", name: "Chemistry", icon: BookOpen },
  { id: "biology", name: "Biology", icon: BookOpen },
  { id: "history", name: "History", icon: BookOpen },
  { id: "english", name: "English", icon: BookOpen },
]

const teachers: Teacher[] = [
  {
    id: "1",
    name: "Prof. Johnson",
    subject: "Mathematics",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Dr. Smith",
    subject: "Physics",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.7,
  },
  {
    id: "3",
    name: "Ms. Williams",
    subject: "Chemistry",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
  },
  {
    id: "4",
    name: "Dr. Brown",
    subject: "Biology",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.6,
  },
  {
    id: "5",
    name: "Mr. Davis",
    subject: "History",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.5,
  },
]

