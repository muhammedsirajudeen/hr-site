"use client"

import { useEffect, useState } from "react"
import axiosInstance from "@/helper/axiosInstance"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, DollarSign, Briefcase, CalendarDays, Star } from "lucide-react"

interface Job {
  _id: string
  title: string
  company: string
  location: string
  salary: number
  description: string
  requirements: string[]
  isRemote: boolean
  postedAt: string
  socialLinks: { platform: string; link: string }[]
}

export default function JobPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  async function jobFetcher() {
    try {
      setLoading(true)
      const response = await axiosInstance.get("/api/job")
      setJobs(response.data.jobs)
    } catch (error) {
      console.error("Failed to fetch jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    jobFetcher()
  }, [])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const formatSalary = (salary: number) => {
    return `$${salary.toLocaleString()}`
  }

  const getJobTags = (job: Job) => {
    const tags = []
    if (job.isRemote) tags.push("Remote")
    if (job.salary > 100000) tags.push("High Salary")
    if (job.requirements.length > 5) tags.push("Senior Level")
    return tags.slice(0, 3) // Limit to 3 tags
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <section className="relative z-10 py-16 md:py-24 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Available Opportunities
          </h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card 
                  key={i} 
                  className="bg-gray-900/50 border-gray-700 backdrop-blur-sm animate-pulse"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="h-6 bg-gray-700 rounded w-3/4 mb-3"></div>
                        <div className="h-5 bg-gray-700 rounded w-1/2 mb-3"></div>
                        <div className="h-16 bg-gray-700 rounded mb-4"></div>
                        <div className="h-4 bg-gray-700 rounded w-1/3 mb-3"></div>
                      </div>
                      <div className="h-5 w-5 bg-gray-700 rounded"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-700 rounded w-16"></div>
                      <div className="h-6 bg-gray-700 rounded w-20"></div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : jobs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobs.map((job) => (
                  <Card
                    key={job._id}
                    className="bg-gray-900/50 border-gray-700 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 backdrop-blur-sm group cursor-pointer"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-white group-hover:text-purple-300 transition-colors mb-2">
                            {job.title}
                          </CardTitle>
                          <div className="text-purple-400 font-semibold mb-2">{job.company}</div>
                          <CardDescription className="text-gray-400 mb-3 line-clamp-2">
                            {job.description}
                          </CardDescription>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-gray-500 text-sm">
                              <MapPin className="w-4 h-4 mr-2" />
                              {job.location}
                            </div>
                            <div className="flex items-center text-gray-500 text-sm">
                              <DollarSign className="w-4 h-4 mr-2" />
                              {formatSalary(job.salary)}
                            </div>
                            <div className="flex items-center text-gray-500 text-sm">
                              <CalendarDays className="w-4 h-4 mr-2" />
                              Posted {formatDate(job.postedAt)}
                            </div>
                          </div>
                        </div>
                        <Star className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {getJobTags(job).map((tag, tagIndex) => (
                          <Badge 
                            key={tagIndex} 
                            variant="secondary" 
                            className="bg-gray-800 text-gray-300 hover:bg-gray-700"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-gray-700">
                        <Button
                          variant="outline"
                          className="w-full border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white bg-transparent group-hover:border-purple-400 group-hover:text-white group-hover:hover:bg-purple-400 transition-all duration-300"
                        >
                          View Details
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black bg-transparent px-8 py-3"
                >
                  Load More Jobs
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg mb-4">No jobs found at the moment.</p>
              <p className="text-gray-500">Please check back later for new opportunities!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}