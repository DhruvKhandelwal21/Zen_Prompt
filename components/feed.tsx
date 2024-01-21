"use client";
import React, { useEffect, useState } from "react";
let searchTimeout: any;
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [promptData, setPromptData] = useState<any | null>(null);
  const [filteredData, setFilteredData] = useState<any | null>(null);

  useEffect(() => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      fetchFilteredData();
    }, 500);
    
  }, [searchText]);

  const fetchFilteredData = () => {
    console.log('hello')
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    const data = promptData
      ? promptData?.filter(
          (item: any) =>
            regex.test(item.creator.username) ||
            regex.test(item.tag) ||
            regex.test(item.prompt)
        )
      : null;
      setFilteredData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(filteredData);
  const fetchData = async () => {
    try {
      const response = await fetch("api/prompt", {
        method: "GET",
      });
      const data = await response.json();
      setPromptData(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(searchText);
  return (
    <div className="flex flex-col w-full items-center mt-5">
      <input
        className="xs:w-full md:w-1/2 mb-4 p-2 border border-gray-300 rounded"
        type="text"
        placeholder="Enter the tag"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default Feed;
