import { NextResponse } from 'next/server';
import { HttpStatusCode } from 'axios'; // or use 204/500 directly
import { JobModel } from '@/model/Job';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(req: Request, { params }: Params) {
  try {
    const jobId =(await params).id;

    // You can now use jobId to delete from DB
    console.log("Deleting job with ID:", jobId);

    // Example: await JobModel.findByIdAndDelete(jobId);
    await JobModel.deleteOne({_id:jobId})
    return NextResponse.json(
        {message:"success"},
      { status: HttpStatusCode.Ok } // 204
    );
  } catch (error) {
    console.error("[Job Route Delete]", error);
    return NextResponse.json(
      { message: "Internal server error occurred" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}

export async function PUT(req:Request,{params}:Params){
    try {
        const jobId=(await params).id

        console.log("Deleting job with id",jobId)
        const job=await req.json()
        if(!job){
            return NextResponse.json({messag:"validation error"},{status:HttpStatusCode.UnprocessableEntity})
        }
        console.log("the job is",job)
        await JobModel.updateOne({_id:jobId},
            {
                ...job
            }
        )
        return NextResponse.json({message:"Success"},{status:HttpStatusCode.Ok})
    } catch (error) {
        console.log("[Job Route Put]",error)
    }
}
