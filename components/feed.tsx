"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./promptCard";
import Form from "./form";
let searchTimeout: any;
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [promptData, setPromptData] = useState<any | null>(null);
  const [filteredData, setFilteredData] = useState<any | null>(null);
  const [openCreatePromptDialog, setOpenCreatePromptDialog] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if(promptData){
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          fetchFilteredData();
        }, 500);
    }
  }, [searchText]);

  const fetchFilteredData = () => {
    console.log(promptData)
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    const data = promptData?.filter(
      (item: any) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
    setFilteredData(data);
  };
  console.log(filteredData);

  const fetchData = async () => {
    try {
      const response = await fetch("api/prompt", {
        method: "GET",
      });
      const data = await response.json();
      setPromptData(data);
      setFilteredData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-full mt-5">
        <div className="w-full flex gap-5 justify-center mb-5">
          <input
            className="xs:flex-grow sm:flex-none md:w-1/2 lg:w-1/4 p-2 border border-gray-300 rounded"
            type="text"
            placeholder="Enter the tag"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="px-3 py-2 bg-black hover:bg-white hover:text-black text-white rounded"
            onClick={() => {
              setOpenCreatePromptDialog(!openCreatePromptDialog);
            }}
          >
            Add Post
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-10 p-2">
        {filteredData?.map((ele: any, index: number) => {
          return <PromptCard tag={ele.tag} prompt={ele.prompt} />;
        })}
        </div>
      </div>
      {openCreatePromptDialog && (
        <Form
          onClose={() => {
            setOpenCreatePromptDialog(!openCreatePromptDialog);
          }}
          onSuccess={() => {
            setOpenCreatePromptDialog(!openCreatePromptDialog);
            fetchData();
          }}
        />
      )}
    </>
  );
};

export default Feed;
