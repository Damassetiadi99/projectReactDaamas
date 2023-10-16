import axios from "axios";


export const login=(data,navigate)=>async(dispatch)=>{
    try {
        dispatch({type :'AUTH_LOGIN_PENDING'})
    const result = await axios.post(import.meta.env.VITE_BASE_URL+`/users/login`,data)
    localStorage.setItem("token",result.data.users.token)
    localStorage.setItem('photo',result.data.users.photo)
   dispatch({payload : result.data.users,type : 'AUTH_LOGIN_SUCCESS'})
    navigate('/menu')   
    } catch (error) {
        dispatch({payload : error.response.data.message,type : 'AUTH_LOGIN_FAILED'})

        
    }
    
}
export const register=(data,navigate)=>async (dispatch)=>{
    try {
        dispatch({type :'AUTH_REGISTER_PENDING'})
    const result = await axios.post(import.meta.env.VITE_BASE_URL+`/users/register`,data)
    
   dispatch({payload : result.data.users,type : 'AUTH_REGISTER_SUCCESS'})
    navigate('/login')

        
    } catch (error) {
        dispatch({payload : error.response.data.message,type : 'AUTH_REGISTER_FAILED'})

        
    }
    
}