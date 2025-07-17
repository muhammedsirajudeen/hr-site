'use client';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import axios from 'axios';
import axiosInstance from '@/helper/axiosInstance';
import UserModel from '@/model/User';
import Keys from '@/constants/Keys';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function SigninPage() {
    const [userInfo, setUserInfo] = useState(null);
    const router = useRouter()
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // const res = await axios.get(
                //     'https://www.googleapis.com/oauth2/v3/userinfo',
                //     {
                //         headers: {
                //             Authorization: `Bearer ${tokenResponse.access_token}`,
                //         },
                //     }
                // );
                // setUserInfo(res.data);
                // console.log('User Info:', res.data);
                const response = await axiosInstance.post('/api/auth/google',
                    {
                        access_token: tokenResponse.access_token
                    }
                )
                console.log(response.data)
                window.localStorage.setItem(Keys.userToken, response.data.token)
                router.push('/')
            } catch (err) {
                console.error('Error fetching user info:', err);
                toast.error("user login failed please try again")
            }
        },
        onError: () => {
            console.error('Login Failed');
        },
        flow: 'implicit', // required for SPA-style login
    });

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                            Welcome Back
                        </span>
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Sign in to your account to continue
                    </p>
                </div>

                <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-8 border border-slate-700">
                    <button
                        onClick={() => login()}
                        className="w-full flex items-center justify-center px-6 py-4 border border-slate-600 rounded-lg bg-slate-900 text-slate-300 hover:bg-slate-700 hover:border-slate-500 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                        <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <span className="text-lg font-medium">Continue with Google</span>
                    </button>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-400">
                            By continuing, you agree to our{' '}
                            <a href="#" className="text-blue-400 hover:text-blue-300">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="#" className="text-blue-400 hover:text-blue-300">
                                Privacy Policy
                            </a>
                        </p>
                    </div>
                </div>

                {userInfo && (
                    <div className="mt-4 text-slate-200 text-sm">
                        Logged in as: {userInfo.name} ({userInfo.email})
                    </div>
                )}
            </div>
        </div>
    );
}
