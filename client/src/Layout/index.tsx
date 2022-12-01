import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../Components/Header'
import Home from '../Pages/Home'

const Layout = () => {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
      </Routes>
    </>
  )
}

export default Layout