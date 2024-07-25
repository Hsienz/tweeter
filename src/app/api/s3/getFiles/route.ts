import {s3} from "~/app/utils/s3"
import {NextRequest, NextResponse} from "next/server";
import {GetObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
const handler = async (req:NextRequest) => {
    const params = req.nextUrl.searchParams
    const res = await Promise.all( params.getAll("files").map( async(x) => {
        console.log(x)
        const command = new GetObjectCommand({
            Bucket : process.env.AWS_BUCKET_NAME,
            Key: x
        })
        
        return await getSignedUrl(s3,command)
    }))
    return NextResponse.json({files:res})
    
}

export {handler as GET}