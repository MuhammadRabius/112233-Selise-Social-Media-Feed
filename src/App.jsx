import React from "react";
import { Routes, Route } from "react-router-dom";
import MediaFeed from "./pages/HomePage/MediaFeed";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MediaFeed />} />
    </Routes>
  );
};

export default App;
