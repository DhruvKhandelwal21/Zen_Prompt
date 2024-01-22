"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const readMoreStyle: React.CSSProperties | null = {
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  display: "-webkit-box",
};
const PromptCard = ({ tag, prompt }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMoreButton,setShowMoreButton] = useState(false);
  const ref: any = useRef(null);
  useEffect(()=>{
  if(ref.current){
    console.log(ref.current.scrollHeight, ref.current.clientHeight)
    setShowMoreButton(ref.current.scrollHeight!==ref.current.clientHeight)
  }
  },[])
  const { data: session } = useSession();
  return (
    <div className={`w-[300px] h-[150px] ${isOpen ? 'h-fit': ''} flex flex-col border-[1px] border-black p-2 bg-slate-200 rounded`}>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Image
            src={session?.user?.image || ""}
            alt="Profile"
            className="rounded-full"
            width={20}
            height={20}
          />
          <p className="text-sm font-semibold">{session?.user?.name}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between h-[100%]">
        <div className="flex flex-col gap-1">
        <p style={isOpen? {}: readMoreStyle } className="text-sm overflow-hidden" ref = {ref}>
          {prompt}
        </p>
        {showMoreButton && <button className="text-blue-400 text-sm self-start" onClick={()=>{setIsOpen(!isOpen)}}>{isOpen?'Show Less':'Show More'}</button>}
        </div>
        
        <p className="text-blue-400 text-md">{`# ${tag}`}</p>
      </div>
    </div>
  );
};

export default PromptCard;
