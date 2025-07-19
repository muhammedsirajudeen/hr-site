import { JWTHelper } from "@/helper/jwtUtils";
import UserModel, { User } from "@/model/User";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        console.log(body)
        const access_token = body.access_token
        if(!access_token){
            return NextResponse.json({message:"access token is missing"},{status:HttpStatusCode.BadRequest})
        }
        const user = await JWTHelper.decode(access_token) as User
        //find one user from this
        const userDb = await UserModel.findOne({ email: user.email })
        return NextResponse.json({ message: "success", user: userDb })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: `Internal server error ` }, { status: HttpStatusCode.InternalServerError })
    }
}