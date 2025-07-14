import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import "./App.css";

function LandingPage() {
  const [heading, setHeading] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("https://brynk-assignment.onrender.com/api/heading")
      .then(res => setHeading(res.data.heading));
  }, []);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value) navigate(value);
  };

  return (
    <div className="landing">
      <nav className="nav">
        <div >ABC</div>
        <Link to="/" className="nav-link">About</Link>
        <select className="nav-dropdown" onChange={handleSelectChange}>
          <option value="">Services</option>
          <option value="/cms">CMS</option>
        </select>
      </nav>
      <div className="hero">
       <div>
       <h1 className="hero-heading">{heading}</h1>
        <p className="hero-subtext">
        Powerful AI solutions that go beyond mere data sorting and exploration. Use our array of AI enabled solutions that understand your business and recommend the optimal way forward. 
        </p>
        <button className="hero-cta">Get Started</button>
       </div>
        <div className="design">
            <img src="public/design.png" alt="design" />
        </div>
      </div>
    <img className="bottom" src="public/bottom.svg" alt="bottom" />
    </div>
  );
}

function CMSPage() {
  const [text, setText] = useState("");
  useEffect(() => {
    axios.get("https://brynk-assignment.onrender.com/api/heading")
      .then(res => setText(res.data.heading));
  }, []);

  const update = () => {
    axios.post("https://brynk-assignment.onrender.com/api/heading", { content: text })
      .then(() => alert("Heading updated."));
  };

  return (
    <div className="cms">
      <h2>CMS Editor</h2>
      <textarea
        rows="4"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={update}>Save</button>
      <Link to="/" className="back-link">← Back to Landing</Link>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cms" element={<CMSPage />} />
      </Routes>
    </Router>
  );
}
