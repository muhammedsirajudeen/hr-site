import { JobModel } from "@/model/Job"
import { HttpStatusCode } from "axios"
import { NextResponse } from "next/server"

export async function GET(){
    try {
        //security issue fix later
        const jobs=await JobModel.find()
        console.log("the full jobs are",jobs)
        return NextResponse.json({message:"success",jobs},{status:HttpStatusCode.Ok})
    } catch (error) {
        console.log(`[Job Route Get] ${error}`)
        return NextResponse.json({message:"Internal server error occured"},{status:HttpStatusCode.InternalServerError})
    }
}