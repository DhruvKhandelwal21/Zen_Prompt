import { connectToDb } from "@utils/db";
import prompt from "@models/prompt";

export const DELETE = async (request: any, { params }:any)=>{
    try{
       await connectToDb();
       const data = await prompt.deleteOne({_id:params.id});
       return new Response(JSON.stringify(data),{status: 200});
    }catch{
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}
export const PUT = async (request: any, { params }:any)=>{
    const payload = await request.json();
    try{
       await connectToDb();
       const data = await prompt.findOneAndUpdate({_id:params.id}, {$set:{...payload}});
       return new Response(JSON.stringify(data),{status: 200});
    }catch{
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}