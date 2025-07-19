"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash2, MapPin, DollarSign, Calendar, Building, X } from "lucide-react"
import axiosInstance from "@/helper/axiosInstance"
import { Job, SocialLink } from "@/model/Job"
import { useToast } from "@/components/ui/use-toast"
import { toast } from "@/hooks/use-toast"






const platformOptions = ["LinkedIn", "WhatsApp", "Twitter", "Facebook", "Instagram", "GitHub", "Website", "Email"]

// Move JobForm component outside to prevent recreation on every render
interface JobFormProps {
  formData: Partial<Job>
  setFormData: (data: Partial<Job>) => void
  onSubmit: () => void
  submitLabel: string
}

const JobForm = ({ formData, setFormData, onSubmit, submitLabel }: JobFormProps) => {
  const handleRequirementsChange = (value: string) => {
    const requirements = value
      .split(",")
      .map((req) => req.trim())
      .filter((req) => req.length > 0)
    setFormData({ ...formData, requirements })
  }

  const addSocialLink = () => {
    const currentLinks = formData.socialLinks || []
    setFormData({
      ...formData,
      socialLinks: [...currentLinks, { platform: "", link: "" }],
    })
  }

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    const currentLinks = formData.socialLinks || []
    const updatedLinks = currentLinks.map((link, i) => (i === index ? { ...link, [field]: value } : link))
    setFormData({ ...formData, socialLinks: updatedLinks })
  }

  const removeSocialLink = (index: number) => {
    const currentLinks = formData.socialLinks || []
    const updatedLinks = currentLinks.filter((_, i) => i !== index)
    setFormData({ ...formData, socialLinks: updatedLinks })
  }

  return (
    <div className="grid gap-4 py-4 max-h-[80vh] overflow-y-auto">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          Title
        </Label>
        <Input
          id="title"
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="col-span-3 bg-slate-700/50 border-slate-600 text-white"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="company" className="text-right">
          Company
        </Label>
        <Input
          id="company"
          value={formData.company || ""}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="col-span-3 bg-slate-700/50 border-slate-600 text-white"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="location" className="text-right">
          Location
        </Label>
        <Input
          id="location"
          value={formData.location || ""}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="col-span-3 bg-slate-700/50 border-slate-600 text-white"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="salary" className="text-right">
          Salary
        </Label>
        <Input
          id="salary"
          type="number"
          value={formData.salary || ""}
          onChange={(e) =>
            setFormData({ ...formData, salary: e.target.value ? Number.parseInt(e.target.value) : undefined })
          }
          className="col-span-3 bg-slate-700/50 border-slate-600 text-white"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Textarea
          id="description"
          value={formData.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="col-span-3 bg-slate-700/50 border-slate-600 text-white"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="requirements" className="text-right">
          Requirements
        </Label>
        <Input
          id="requirements"
          placeholder="Comma separated (e.g., React, TypeScript, 5+ years)"
          value={formData.requirements?.join(", ") || ""}
          onChange={(e) => handleRequirementsChange(e.target.value)}
          className="col-span-3 bg-slate-700/50 border-slate-600 text-white"
        />
      </div>
      {/* Social Links Section */}
      <div className="grid grid-cols-4 items-start gap-4">
        <Label className="text-right mt-2">Social Links</Label>
        <div className="col-span-3 space-y-3">
          {(formData.socialLinks || []).map((link, index) => (
            <div key={index} className="flex gap-2 items-center">
              <select
                value={link.platform}
                onChange={(e) => updateSocialLink(index, "platform", e.target.value)}
                className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white text-sm"
              >
                <option value="">Select Platform</option>
                {platformOptions.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
              <Input
                placeholder="Enter URL or contact info"
                value={link.link}
                onChange={(e) => updateSocialLink(index, "link", e.target.value)}
                className="flex-1 bg-slate-700/50 border-slate-600 text-white"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeSocialLink(index)}
                className="text-red-400 hover:text-red-300"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSocialLink}
            className="border-slate-600 text-slate-300 hover:text-white bg-transparent"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Social Link
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="remote" className="text-right">
          Remote
        </Label>
        <Switch
          id="remote"
          checked={formData.isRemote || false}
          onCheckedChange={(checked) => setFormData({ ...formData, isRemote: checked })}
        />
      </div>
      <DialogFooter>
        <Button
          onClick={onSubmit}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          {submitLabel}
        </Button>
      </DialogFooter>
    </div>
  )
}

export default function JobAdminPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [formData, setFormData] = useState<Partial<Job>>({
    title: "",
    company: "",
    location: "",
    salary: undefined,
    description: "",
    requirements: [],
    isRemote: false,
    socialLinks: [],
  })

  async function GetJobs(){
    try {
        const response=await axiosInstance.get('/api/admin/job')
        console.log("The job data is ",response.data)
        setJobs(response.data.jobs)
    } catch (error) {
        console.log(error)        
    }
  }

  useEffect(() => {
    GetJobs()
  }, [])

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const resetFormData = () => {
    setFormData({
      title: "",
      company: "",
      location: "",
      salary: undefined,
      description: "",
      requirements: [],
      isRemote: false,
      socialLinks: [],
    })
  }

  const handleCreateJob = async () => {
    const newJob: Omit<Job,"_id"> = {
      title: formData.title || "",
      company: formData.company || "",
      location: formData.location || "",
      salary: formData.salary,
      description: formData.description || "",
      requirements: formData.requirements || [],
      isRemote: formData.isRemote || false,
      socialLinks: formData.socialLinks || [],
      postedAt: new Date(),
    }

    try {
      // Uncomment when you have the API endpoint ready
      const response = await axiosInstance.post('/api/admin/job', { job: newJob })
      console.log(response.data)
      console.log("Creating job:", newJob)
      setJobs([...jobs, response.data.job])
    } catch (error) {
      console.log("Error in creating jobs", error)
    }

    resetFormData()
    setIsCreateDialogOpen(false)
  }

  const handleEditJob = async () => {
    if (!editingJob) return
    console.log(formData)
    //find the job to be updated from job
    try {
        const response=await axiosInstance.put(`/api/admin/job/${editingJob._id}`,
            {
                ...formData,
                _id:editingJob._id
            }
        )
        console.log(response.data)
        toast({title:"updated job ",className:"bg-green-500 text-white"})
        const updatedJobs = jobs.map((job) => (job._id === editingJob._id ? { ...job, ...formData } : job))
        setJobs(updatedJobs)
        setEditingJob(null)
        resetFormData()
        setIsEditDialogOpen(false)
    } catch (error) {
        console.log(error)
        toast({title:"error in updating jobs",className:"bg-red-500 text-white"})
    }
  }

  const handleDeleteJob = async (jobId: string) => {
    try {
        const response=await axiosInstance.delete(`/api/admin/job/${jobId}`)
        console.log(response.data)
        toast({title:"job deleted successfully",className:"bg-green-500 text-white"})
    } catch (error) {
        console.log(error)
        toast({title:"error in deleting",className:"bg-red-500 text-white"})
    }
    setJobs(jobs.filter((job) => job._id !== jobId))
  }

  const openEditDialog = (job: Job) => {
    setEditingJob(job)
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      description: job.description,
      requirements: job.requirements,
      isRemote: job.isRemote,
      socialLinks: job.socialLinks || [],
    })
    setIsEditDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Job Administration
            </h1>
            <p className="text-slate-400 mt-2">Manage your job listings and opportunities</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-white">Create New Job</DialogTitle>
                <DialogDescription className="text-slate-400">Add a new job listing to your board.</DialogDescription>
              </DialogHeader>
              <JobForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleCreateJob}
                submitLabel="Create Job"
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="md:col-span-2 bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{jobs.length}</p>
                  <p className="text-xs text-slate-400">Total Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{jobs.filter((job) => job.isRemote).length}</p>
                  <p className="text-xs text-slate-400">Remote Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs Table */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Job Listings</CardTitle>
            <CardDescription className="text-slate-400">Manage and edit your job postings</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">Job Title</TableHead>
                  <TableHead className="text-slate-300">Company</TableHead>
                  <TableHead className="text-slate-300">Location</TableHead>
                  <TableHead className="text-slate-300">Salary</TableHead>
                  <TableHead className="text-slate-300">Social Links</TableHead>
                  <TableHead className="text-slate-300">Type</TableHead>
                  <TableHead className="text-slate-300">Posted</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job._id} className="border-slate-700">
                    <TableCell className="font-medium text-white">{job.title}</TableCell>
                    <TableCell className="text-slate-300">{job.company}</TableCell>
                    <TableCell className="text-slate-300">
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                        {job.location}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {job.salary ? (
                        <div className="flex items-center">
                          <DollarSign className="w-3 h-3 mr-1 text-green-400" />
                          {job.salary.toLocaleString()}
                        </div>
                      ) : (
                        <span className="text-slate-500">Not specified</span>
                      )}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {job.socialLinks && job.socialLinks.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {job.socialLinks.slice(0, 2).map((social, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-slate-600 text-slate-300">
                              {social.platform}
                            </Badge>
                          ))}
                          {job.socialLinks.length > 2 && (
                            <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                              +{job.socialLinks.length - 2}
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-500">None</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={job.isRemote ? "default" : "secondary"}
                        className={job.isRemote ? "bg-green-600" : "bg-slate-600"}
                      >
                        {job.isRemote ? "Remote" : "On-site"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1 text-slate-400" />
                        {new Date(job.postedAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                          <DropdownMenuItem
                            onClick={() => openEditDialog(job)}
                            className="text-slate-300 hover:text-white"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteJob(job._id!)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px] bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Job</DialogTitle>
              <DialogDescription className="text-slate-400">Make changes to the job listing.</DialogDescription>
            </DialogHeader>
            <JobForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleEditJob}
              submitLabel="Save Changes"
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
