import {s3} from "~/app/utils/s3";
import {NextRequest, NextResponse} from "next/server";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import {v4 as uuid} from "uuid"
const handler = async (req:NextRequest) => {
    const formData = await req.formData()
    const files = formData.getAll("files")
    if(!files) return new NextResponse()
    const filenames = await Promise.all( files.map( async (x )=>{
        if( x instanceof File) {
            const ext = x.name.split('.').pop()
            const filename = uuid() + (ext ? "."+ext : "")
            const command = new PutObjectCommand({
                Key: filename,
                Bucket: process.env.AWS_BUCKET_NAME,
                Body: await x.text()
            })
            const uploadedFile = await s3.send(command)
            console.log(uploadedFile)
            return filename
        }
        return ""
    }))
    return NextResponse.json({filenames:filenames})
}
export {handler as POST}