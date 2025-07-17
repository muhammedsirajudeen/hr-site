import { NextResponse } from "next/server"
import axios, { HttpStatusCode } from "axios"
import UserModel from "@/model/User"
import mongoose from "mongoose"
import connectToMongo from "@/helper/connectToMongo"
import { JWTHelper } from "@/helper/jwtUtils"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const accessToken = body.access_token || req.headers.get("authorization")?.split("Bearer ")[1]
        if (mongoose.connection.readyState !== 1) [
            await connectToMongo()
        ]
        if (!accessToken) {
            return NextResponse.json(
                { message: "Access token missing" },
                { status: HttpStatusCode.BadRequest }
            )
        }

        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        /**
         *     "message": "Success",
                "user": {
                    "sub": "3892178987",
                    "name": "Muhammed Sirajudeen",
                    "given_name": "Muhammed",
                    "family_name": "Sirajudeen",
                    "picture": "https://lh3.googleusercontent.com/a/ACg8ocIjQtxbOPWam3nC-7yJddyXuahZou_gaD3bPjdie_U9PwCSfw=s96-c",
                    "email": "sirajudeen.satcard.iitpkd@gmail.com",
                    "email_verified": true
                }
         */
        //check if user exists
        const user = await UserModel.findOne({ email: res.data.email })
        if (!user) {
            console.log("The user is new")
            const googleData = res.data
            console.log("The google data is ", googleData)
            //put it into database
            /**
             * required fields in user schema
             * email
             * name 
             * password
             */
            const user = await UserModel.create(
                {
                    email: googleData.email,
                    password: googleData.sub,
                    name: googleData.name,
                    avatar: googleData.picture,
                })
            console.log("the user is ", user)
            const payload = {
                email: user.email
            }
            const token = JWTHelper.sign(payload)
            //create jwt and send it back
            return NextResponse.json({ message: "success", token }, { status: HttpStatusCode.Created })
        } else {
            //create jwt and send it back since the user is already present
            const payload = { email: user.email }
            const token = JWTHelper.sign(payload)
            return NextResponse.json({ message: "success", token }, { status: HttpStatusCode.Ok })
        }
    } catch (error: any) {
        console.error(error)
        return NextResponse.json(
            { message: "Internal Server Error", error: error?.response?.data || error.message },
            { status: HttpStatusCode.InternalServerError }
        )
    }
}
