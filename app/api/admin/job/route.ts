import { JobModel } from "@/model/Job";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const requestBody=await request.json()
        const job=requestBody.job
        if(!job){
            return NextResponse.json({message:"validation error"},{status:HttpStatusCode.BadRequest})
        }
        const savedJob=await JobModel.create(job)
        console.log("the new job is ",savedJob)
        return NextResponse.json({message:"success",job:savedJob},{status:HttpStatusCode.Created})
    } catch (error) {
        console.log(`[Job Route Post] ${error}`)
        return NextResponse.json({message:"Internal server error"},{status:HttpStatusCode.InternalServerError})
    }
}

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