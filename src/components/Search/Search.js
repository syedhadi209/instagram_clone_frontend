import React, { useEffect, useState } from "react";
import "./Search.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(null);
  const currentUser = useSelector((state) => state.userSlice.data);
  const navigate = useNavigate();

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

  function checkFollowers(followersList) {
    console.log(followersList);
    let flag = false;
    followersList.map((follower) => {
      if (currentUser.id === follower.following) {
        flag = true;
        return 1;
      }
    });
    return flag;
  }

  useEffect(() => {
    fetchResults();
    console.log(results);
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
          return (
            <div className="users-box" key={index}>
              <Link to={`/profile/${user?.username}`}>{user?.username}</Link>
              {user?.id != currentUser?.id ? (
                <button>
                  {checkFollowers(user?.followers) ? "Unfollow" : "Follow"}
                </button>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
