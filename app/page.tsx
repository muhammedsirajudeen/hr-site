import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code2,
  Palette,
  Megaphone,
  Package,
  Target,
  Users,
  Search,
  MousePointer,
  Zap,
  MapPin,
  Star,
  ArrowRight,
  Linkedin,
  Twitter,
  Github,
  Mail,
  Phone,
  Check,
  Crown,
  Rocket,
  Shield,
} from "lucide-react"

export default function HomePage() {
  const categories = [
    { icon: Code2, title: "Engineering", description: "Full-stack, AI, DevOps & more" },
    { icon: Palette, title: "Design", description: "UI/UX, Brand, Product Design" },
    { icon: Megaphone, title: "Marketing", description: "Growth, Content, Performance" },
    { icon: Package, title: "Product", description: "Strategy, Management, Analytics" },
    { icon: Target, title: "Strategy & Ops", description: "Operations, Consulting, BizDev" },
    { icon: Users, title: "Freelancers & Generalists", description: "Project-based & flexible roles" },
  ]

  const steps = [
    { icon: Search, title: "Discover curated roles", description: "Browse hand-picked opportunities" },
    { icon: MousePointer, title: "Apply with a few clicks", description: "Streamlined application process" },
    { icon: Zap, title: "Get hired or build your dream team", description: "Connect with the perfect match" },
  ]

  const pricingPlans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Perfect for getting started",
      icon: Shield,
      features: [
        "Browse unlimited jobs",
        "Apply to 5 jobs per month",
        "Basic profile creation",
        "Email notifications",
        "Community support",
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false,
      gradient: "from-gray-600 to-gray-700",
    },
    {
      name: "Professional",
      price: "₹999",
      period: "per month",
      description: "For serious job seekers",
      icon: Rocket,
      features: [
        "Everything in Free",
        "Unlimited job applications",
        "Priority application status",
        "Advanced profile analytics",
        "Direct messaging with recruiters",
        "Resume optimization tools",
        "Interview preparation resources",
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "default" as const,
      popular: true,
      gradient: "from-blue-500 to-purple-600",
    },
    {
      name: "Enterprise",
      price: "₹2,499",
      period: "per month",
      description: "For companies hiring talent",
      icon: Crown,
      features: [
        "Everything in Professional",
        "Post unlimited job listings",
        "Access to premium talent pool",
        "Advanced candidate filtering",
        "Dedicated account manager",
        "Custom branding options",
        "Analytics and reporting dashboard",
        "API access",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false,
      gradient: "from-teal-500 to-emerald-600",
    },
  ]

  const featuredJobs = [
    {
      title: "Senior Product Designer",
      company: "NeonTech",
      description: "Lead design for our AI-powered platform",
      tags: ["Remote", "Full-time", "AI", "Design"],
      location: "San Francisco, CA",
    },
    {
      title: "Growth Marketing Manager",
      company: "ElectricFlow",
      description: "Drive user acquisition and retention",
      tags: ["Hybrid", "Marketing", "SaaS", "Growth"],
      location: "New York, NY",
    },
    {
      title: "Full-Stack Engineer",
      company: "VoltLabs",
      description: "Build scalable web applications",
      tags: ["Remote", "React", "Node.js", "Startup"],
      location: "Austin, TX",
    },
    {
      title: "Creative Strategist",
      company: "PulseAgency",
      description: "Develop brand campaigns for tech clients",
      tags: ["Part-time", "Creative", "Strategy", "Agency"],
      location: "Los Angeles, CA",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              ElectricHire
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Browse Jobs
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Post a Job
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              About
            </a>
            <Button
              variant="outline"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black bg-transparent"
            >
              Sign In
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 bg-clip-text text-transparent leading-tight">
            Discover Roles that Light You Up.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Whether you're a coder, creator, or strategist — we connect you to the work that matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
            >
              Explore Jobs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black px-8 py-3 text-lg font-semibold bg-transparent"
            >
              Hire Talent
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Find Your Perfect Role
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-700 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 backdrop-blur-sm group cursor-pointer"
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                    <category.icon className="w-8 h-8 text-blue-400 group-hover:text-blue-300" />
                  </div>
                  <CardTitle className="text-white group-hover:text-blue-300 transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">{category.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-16 md:py-24 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full flex items-center justify-center group-hover:from-teal-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                  <step.icon className="w-10 h-10 text-teal-400" />
                </div>
                <div className="text-2xl font-bold text-teal-400 mb-2">{index + 1}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Whether you're looking for your next opportunity or building your dream team, we have the perfect plan for
              you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative bg-gray-900/50 border-gray-700 hover:border-blue-400/50 transition-all duration-300 backdrop-blur-sm group ${plan.popular ? "ring-2 ring-blue-400/50 scale-105" : ""
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 text-sm font-semibold">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${plan.gradient}/20 rounded-full flex items-center justify-center group-hover:${plan.gradient}/30 transition-all duration-300`}
                  >
                    <plan.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white mb-2">{plan.name}</CardTitle>
                  <div className="mb-2">
                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-gray-400 text-lg">/{plan.period}</span>
                  </div>
                  <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${plan.buttonVariant === "default"
                        ? `bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white shadow-lg shadow-blue-500/25`
                        : `border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black bg-transparent`
                      }`}
                    variant={plan.buttonVariant}
                    size="lg"
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">All plans include 14-day free trial • No setup fees • Cancel anytime</p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Secure payments
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2" />
                Money-back guarantee
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="relative z-10 py-16 md:py-24 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Featured Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredJobs.map((job, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-700 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 backdrop-blur-sm group cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white group-hover:text-purple-300 transition-colors mb-2">
                        {job.title}
                      </CardTitle>
                      <div className="text-purple-400 font-semibold mb-2">{job.company}</div>
                      <CardDescription className="text-gray-400 mb-3">{job.description}</CardDescription>
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </div>
                    </div>
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="bg-gray-800 text-gray-300 hover:bg-gray-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black bg-transparent"
            >
              View All Jobs
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            About ElectricHire
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            We're creating a better way to match brilliant people with bold opportunities — human-first, fast, and
            intuitive.
          </p>
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-8 max-w-2xl mx-auto border border-blue-500/20">
            <p className="text-lg text-gray-300 italic">
              "ElectricHire transformed how we find talent. The quality of candidates and speed of hiring is unmatched."
            </p>
            <div className="mt-4 text-blue-400 font-semibold">— Sarah Chen, CTO at TechFlow</div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="relative z-10 py-16 md:py-24 bg-gray-900/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Stay in the Loop
          </h2>
          <p className="text-xl text-gray-300 mb-8">Get the latest roles and hiring tips delivered to your inbox</p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-teal-400 focus:ring-teal-400/20 flex-1"
              />
              <Button className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white shadow-lg shadow-teal-500/25">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  ElectricHire
                </span>
              </div>
              <p className="text-gray-400 text-sm">Connecting brilliant people with bold opportunities.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Browse Jobs
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Post a Job
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  hello@electrichire.com
                </li>
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  (555) 123-4567
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} ElectricHire. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
