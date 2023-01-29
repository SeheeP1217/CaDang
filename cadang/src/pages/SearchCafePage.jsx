// import * as React from "react";
import React, { useState } from "react";
import MapContainer from "../components/MapContainer";

// const { kakao } = window;

export default function SearchCafePage() {
  
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  return (
    <>
      {/* <form className="inputForm" onSubmit={handleSubmit}>
        <input
          placeholder="Search Place..."
          onChange={onChange}
          value={inputText}
        />
        <button type="submit">검색</button>
      </form> */}
      <MapContainer searchPlace={place} />
    </>
  );
};