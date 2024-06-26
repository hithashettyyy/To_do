import React from "react";
import "../Stylesheets/SearchBar.css"

function SearchBar(props) {
  return (
    <div color="search_container">
      <input className="searchbar" type="text" placeholder="Search for a task here..." value={props.searchVal} onChange={props.onSearch}></input>
      <button className="searchbtn" onClick={props.handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
