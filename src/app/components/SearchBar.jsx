"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ setLocation }) => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchText.trim()) return;

    setIsLoading(true);

    try {
      await setLocation(searchText.trim());
      setSearchText("");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="relative" role="search">
      <label htmlFor="city-search" className="sr-only">
        Search for a citry
      </label>
      <input
        id="city-search"
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search for a city ..."
        disabled={isLoading}
        className=" w-64 py-2 pl-4 pr-10 rounded-lg bg-[#1e1e1e1] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 disabled:opacity-50"
        disabled={isLoading}
        aria-label="Search"
      >
        <FaSearch className={isLoading ? "animate-spi" : ""} />
      </button>
    </form>
  );
};

export default SearchBar;
