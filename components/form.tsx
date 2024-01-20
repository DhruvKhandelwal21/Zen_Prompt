"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const Form = ({
  id = null,
  initialData = {tag:"",prompt:""},
  onClose
}: any) => {
  const { data: session }: any = useSession();
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = async (e:any)=>{
     e.preventDefault();
  try{
   const payload = {...formData,creator:session?.user?.id}
   const response = await fetch("/api/prompt", {
    method: "POST",
    body: JSON.stringify({
     ...payload
    }),
  });
  if(response){
    console.log("created prompt");
    onClose();
  }
  }catch(error){
    console.log(error);
   }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={()=>onClose()}>
      <div className="bg-white p-8 rounded-lg shadow-md xs:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] flex flex-col gap-2 pb-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center">
        <p className='orange_gradient text-xl font-semibold'>{`${id ? 'Edit':'Create'} Prompt`}</p>
        <button  className="bg-black text-white py-1 px-2 rounded-md" onClick={()=>onClose()}>Close</button>
        </div>
        
      <form>
        <input
        className="w-full mb-4 p-2 border border-gray-300 rounded"
          type={"text"}
          placeholder="Enter the tag"
          value={formData.tag}
          onChange={(e) => {
            setFormData((prevData: any) => {
              return {
                ...prevData,
                tag: e.target.value,
              };
            });
          }}
        />
        <textarea
        className="w-full mb-4 p-2 border border-gray-300 rounded"
          rows={3}
          placeholder="Enter the prompt"
          value={formData.prompt}
          onChange={(e) => {
            setFormData((prevData: any) => {
              return {
                ...prevData,
                prompt: e.target.value,
              };
            });
          }}
        />
      </form>
      <button className="bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-600" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Form;
