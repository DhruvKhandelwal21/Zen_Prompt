import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
const PromptCard = ({ tag, prompt }: any) => {
  const { data: session } = useSession();
  console.log(session)
  return (
    <div className="w-[300px] h-[150px] flex flex-col border-[1px] border-black p-2 bg-slate-200 rounded">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Image
            src={session?.user?.image || ""}
            alt="Profile"
            className="rounded-full"
            width={20}
            height={20}
          />
          <p className='text-sm'>{session?.user?.name}</p>
        </div>
       
      </div>
      <div className="flex flex-col justify-between h-[100%]">
      <p className='text-md'>{prompt}</p>
      <p className="text-blue-400 text-md">{`# ${tag}`}</p>
      </div>
      
    </div>
  );
};

export default PromptCard;
