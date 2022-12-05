import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../Components/Header'
import DetailCourse from '../Pages/DetailCourse'
import Home from '../Pages/Home'

const Layout = () => {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/detail' element={<DetailCourse/>}></Route>
      </Routes>
    </>
  )
}

export default Layout