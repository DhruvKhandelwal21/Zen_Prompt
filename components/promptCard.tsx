"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import deleteIcon from "../public/assets/icons/delete.png";
import pencilIcon from "../public/assets/icons/pencil.png";
import copyIcon from "../public/assets/icons/copy.svg";
import Form from "./form";

const readMoreStyle: React.CSSProperties | null = {
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  display: "-webkit-box",
};
const PromptCard = ({ id, tag, prompt, fetchData }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [copied, setCopied] = useState("");
  const ref: any = useRef(null);
  useEffect(() => {
    if (ref.current) {
      setShowMoreButton(ref.current.scrollHeight !== ref.current.clientHeight);
    }
  }, []);
  const handleCopy = () => {
    setCopied(prompt);
    navigator.clipboard.writeText(prompt);
    setTimeout(() => setCopied(""), 3000);
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(`api/prompt/${id}`, { method: "DELETE" });
      if (response) {
        fetchData();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const { data: session } = useSession();
  return (
    <div
      className={`w-[300px] h-[150px] ${
        isOpen ? "h-fit" : ""
      } flex flex-col border-[1px] border-black p-2 bg-slate-200 rounded`}
    >
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
        <div className="flex gap-2 items-center">
          <Image
            src={copyIcon}
            alt="Copy"
            className="cursor-pointer"
            onClick={() => handleCopy()}
            width={15}
            height={15}
          />
          <Image
            src={pencilIcon}
            alt="Edit"
            className="cursor-pointer"
            onClick={()=>setIsEdit(!isEdit)}
            width={15}
            height={15}
          />
          <Image
            src={deleteIcon}
            alt="Delete"
            className="cursor-pointer"
            onClick={()=>handleDelete()}
            width={15}
            height={15}
          />
        </div>
      </div>
      <div className="flex flex-col justify-between h-[100%]">
        <div className="flex flex-col gap-1">
          <p
            style={isOpen ? {} : readMoreStyle}
            className="text-sm overflow-hidden"
            ref={ref}
          >
            {prompt}
          </p>
          {showMoreButton && (
            <button
              className="text-blue-400 text-sm self-start"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              {isOpen ? "Show Less" : "Show More"}
            </button>
          )}
        </div>

        <p className="text-blue-400 text-md">{`# ${tag}`}</p>
      </div>
      {isEdit&&(
        <Form id={id} initialData={{tag:tag,prompt:prompt}} onClose = {()=>{setIsEdit(!isEdit)}} onSuccess = {()=>{setIsEdit(!isEdit); fetchData()}}  />
      )}
    </div>
  );
};

export default PromptCard;
