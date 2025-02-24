import React, { useState } from "react";
import SidebarHeader from "../SidebarHeader/SidebarHeader";
import Notifications from "../Notifications/Notifications";
import Search from "../Search/Search";
import Conversations from "../Conversations/Conversations";
import SearchResults from "../Search/SearchResults/SearchResults";

const Sidebar = () => {
  const [searchResults, setSearchResults] = useState([]);
  console.log(searchResults);
  return (
    <div className="w-[40%] h-full select-none">
      <SidebarHeader />
      <Notifications />
      <Search
        searchLength={searchResults.length}
        setSearchResults={setSearchResults}
      />
      {searchResults.length > 0 ? (
        <>
          <SearchResults searchResults={searchResults} />
        </>
      ) : (
        <>
          <Conversations />
        </>
      )}
    </div>
  );
};

export default Sidebar;
