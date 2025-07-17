"use client"

import Keys from "@/constants/Keys"
import axiosInstance from "@/helper/axiosInstance"
import type { User } from "@/model/User"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Mail, Calendar, Star, Trophy, Globe, Edit, CheckCircle, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null)
    const [mounted, setMounted] = useState(false)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    async function userVerifier() {
        try {
            setLoading(true)
            const response = await axiosInstance.post("/api/auth/verify", {
                access_token: window.localStorage.getItem(Keys.userToken),
            })
            console.log(response.data)
            setUser(response.data.user)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted) {
            userVerifier()
        }
    }, [mounted])

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-500"></div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
                <Card className="bg-gray-900/70 border-gray-800">
                    <CardContent className="p-6 text-center">
                        <p className="text-gray-400">Unable to load profile</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }
    const signoutHandler = () => {
        window.localStorage.removeItem(Keys.userToken)
        router.push('/')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header Section */}
                <Card className="bg-gray-900/70 border-gray-800 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="relative">
                                <Avatar className="h-24 w-24 md:h-32 md:w-32 ring-4 ring-gray-600/30">
                                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                    <AvatarFallback className="bg-gradient-to-br from-gray-600 to-gray-700 text-gray-200 text-2xl">
                                        {user.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-2 -right-2">
                                    {user.isVerified ? (
                                        <CheckCircle className="h-8 w-8 text-green-400 bg-gray-900 rounded-full p-1" />
                                    ) : (
                                        <XCircle className="h-8 w-8 text-red-400 bg-gray-900 rounded-full p-1" />
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 space-y-2">
                                <div className="flex flex-col md:flex-row md:items-center gap-2">
                                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                                        {user.name}
                                    </h1>
                                    <Badge variant={user.isVerified ? "default" : "secondary"} className="w-fit bg-gray-700 text-gray-300">
                                        {user.isVerified ? "Verified" : "Unverified"}
                                    </Badge>
                                </div>

                                <div className="flex items-center gap-2 text-gray-400">
                                    <Mail className="h-4 w-4" />
                                    <span>{user.email}</span>
                                </div>

                                {user.location && (
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <MapPin className="h-4 w-4" />
                                        <span>{user.location}</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-2 text-gray-400">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        Joined {user.createdAt ? formatDate(user.createdAt as unknown as string) : "N/A"}
                                    </span>
                                </div>
                            </div>

                            <Button className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-gray-200">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Profile
                            </Button>
                            <Button onClick={signoutHandler} className="bg-white text-black" >Signout</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-gray-900/70 border-gray-800 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-gray-300 flex items-center gap-2">
                                <Star className="h-5 w-5 text-yellow-400" />
                                Experience Points
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-300">{user.xp}</div>
                            <p className="text-gray-500 text-sm">Total XP earned</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900/70 border-gray-800 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-gray-300 flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-gray-400" />
                                Achievements
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-300">{user.achievements?.length || 0}</div>
                            <p className="text-gray-500 text-sm">Unlocked achievements</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900/70 border-gray-800 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-gray-300 flex items-center gap-2">
                                <Globe className="h-5 w-5 text-gray-400" />
                                Languages
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-300">{user.languages?.length || 0}</div>
                            <p className="text-gray-500 text-sm">Languages known</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Bio Section */}
                <Card className="bg-gray-900/70 border-gray-800 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-gray-300">About</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {user.bio ? (
                            <p className="text-gray-400 leading-relaxed">{user.bio}</p>
                        ) : (
                            <p className="text-gray-500 italic">No bio available. Add one to tell others about yourself!</p>
                        )}
                    </CardContent>
                </Card>

                {/* Interests and Languages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-gray-900/70 border-gray-800 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-gray-300">Interests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {user.interests && user.interests.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {user.interests.map((interest, index) => (
                                        <Badge key={index} variant="outline" className="border-gray-600/50 text-gray-400 bg-gray-800/30">
                                            {interest}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">No interests added yet.</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900/70 border-gray-800 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-gray-300">Languages</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {user.languages && user.languages.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {user.languages.map((language, index) => (
                                        <Badge key={index} variant="outline" className="border-gray-600/50 text-gray-400 bg-gray-800/30">
                                            {language}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">No languages added yet.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Achievements Section */}
                {user.achievements && user.achievements.length > 0 && (
                    <Card className="bg-gray-900/70 border-gray-800 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-gray-300 flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-yellow-400" />
                                Achievements
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {user.achievements.map((achievement, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-lg bg-gradient-to-r from-gray-800/20 to-gray-700/20 border border-gray-700/30"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Trophy className="h-5 w-5 text-yellow-400" />
                                            {/* <span className="text-gray-300 font-medium">{achievement}</span> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}