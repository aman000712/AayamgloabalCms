import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Navigate } from "react-router-dom";
import About from './components/Pages/About'
import Layout from './components/hoc/Layout';
import Login from './components/Navigation/Login';
import Courses from './components/Pages/Courses';
import ContactUs from './components/Pages/Contact';
import Blogs from './components/Pages/Blogs';
import Team from './components/Pages/Team';



function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      < Routes>

        <Route element={<Layout />} >
          {/* <Route path="/" element={<div>hello</div>} /> */}
          <Route path="/" element={<div></div>} />

          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/team" element={<Team />} />










        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App;
