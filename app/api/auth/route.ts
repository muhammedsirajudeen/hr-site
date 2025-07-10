import { NextResponse } from "next/server"
import { HttpStatusCode } from 'axios'
export function GET() {
    try {
        return NextResponse.json({ message: "success" })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ messsage: "internal server error" }, { status: HttpStatusCode.InternalServerError })
    }
}