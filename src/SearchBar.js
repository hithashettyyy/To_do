import React from "react";
import "./SearchBar.css"

function SearchBar(props) {
  return (
    <>
      <input className="searchbar" type="text" placeholder="Search for a task here..." value={props.searchVal} onChange={props.onSearch}></input>
      <button className="searchbtn" onClick={props.handleSearchButton}>Search</button>
    </>
  );
}

export default SearchBar;
