import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, BrowserRouter,Link,useParams } from 'react-router-dom'
import Menu from './pages/menu'
import InputMenu from './pages/inputMenu' 
import UpdateMenu from './pages/updateMenu'
import Login from './pages/login'
import Register from './pages/register'
import UpdateProfile from './pages/updateProfile'
import DetailProfile from './pages/detailProfile'
import DetailMenu from './pages/detailMenu'
import LandingPage from './pages/landingPage'


function MenuDetail(){
  const {menuId} =useParams()
  return(
    <>
    <h1>Menu Detail ke {menuId}</h1>
    <Link to={-1}>go to back</Link>
    </>
  )
}
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/menu' element={<Menu/>} />
        <Route path='/update-menu/:menuId' element={<UpdateMenu/>} />
        <Route path='/update-profile/:id' element={<UpdateProfile/>} />
        <Route path='/detail-profile' element={<DetailProfile/>} />
        <Route path='/detail-menu/:menuId' element={<DetailMenu/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/inputMenu' element={<InputMenu />} />
        
      </Routes>
    </BrowserRouter>
     
    </>
  )
}
export default App
