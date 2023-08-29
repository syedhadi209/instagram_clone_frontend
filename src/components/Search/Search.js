import React, { useEffect, useState } from "react";
import "./Search.css";
import axios from "axios";
import SearchBox from "../SearchBox/SearchBox";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(null);
  async function fetchResults() {
    const token = localStorage.getItem("token");
    const data = {
      search_name: searchQuery,
    };

    await axios
      .post("http://127.0.0.1:8000/auth/search/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    fetchResults();
  }, [searchQuery]);
  return (
    <div className="search-main">
      <h1>Search</h1>
      <input
        type="search"
        placeholder="search"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="searched-users">
        {results?.map((user, index) => {
          return <SearchBox user={user} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Search;
