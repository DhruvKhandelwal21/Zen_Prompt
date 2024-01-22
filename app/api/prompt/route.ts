import prompt from "@models/prompt";
import { connectToDb } from "@utils/db";

export const POST = async (request: any)=>{
    const payload = await request.json();
    try{
       await connectToDb();
       const data = await prompt.create({...payload});
       return new Response(JSON.stringify(data),{status: 200});
    }catch{
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}

export const GET = async (request: any)=>{
    // const payload = await request.json();
    try{
       await connectToDb();
       const data = await prompt.find({});
       return new Response(JSON.stringify(data),{status: 200});
    }catch{
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}