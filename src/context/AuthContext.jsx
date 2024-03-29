import { createContext, useState } from "react";
import AuthService from "../services/AuthService";


const AuthContext = createContext();

export const AuthProvider = ({children})=>{

        const [isAuthenticated,setAuthenticated] = useState(
            JSON.parse(localStorage.getItem("user"))
        );
        //kontrol state'i oluşturulur.kullanıcı login mi değil mi diye kontrol sağlar. başlangıçta localStorageda user olmadığından false eşittir.

        const login = async (username,password)=>{
            try{
                const response = await AuthService.login(username,password);
                console.log(response);
                if(response.access_token){
                    setAuthenticated(JSON.parse(localStorage.getItem("user")))
                }
            }catch(error){
                setAuthenticated(false);
                throw new Error(error);
            }
        }

        const logout = ()=>{
            AuthService.logout();
            setAuthenticated(false);
        }


    return <AuthContext.Provider value={{isAuthenticated,login,logout}}>

                {children}

            </AuthContext.Provider>
}



export default AuthContext;