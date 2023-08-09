import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, BrowserRouter,Link,useParams } from 'react-router-dom'
import Menu from './pages/menu'
import InputMenu from './pages/inputMenu' 
import UpdateMenu from './pages/updateMenu'

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
        <Route path='/' element={<Navigate to="/menu" replace={true} />} />
        <Route path='/menu' element={<Menu/>} />
        <Route path='/update-menu/:menuId' element={<UpdateMenu/>} />

        <Route path='/menu-detail/:menuId' element={<MenuDetail />} />
        <Route path='/inputMenu' element={<InputMenu />} />
        
      </Routes>
    </BrowserRouter>
     
    </>
  )
}
export default App
