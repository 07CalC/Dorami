import React, { useEffect } from "react";
import { useContext,useState,createContext } from "react";
import { getCSRFTokenFromCookie } from "../components/getcsrf";



const UserContext = createContext();

const UserContextProvider=({children})=>{
    const[user,setUser]=useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(user? true: false);
    useEffect(() => {
        const getuser=async()=>{
            const csrftoken=getCSRFTokenFromCookie();

            try{
                const response=await fetch('https://backend.dorami.tanish.site/auth/getUser',{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'X-CSRFToken': csrftoken,
                      },
                    credentials:'include'
    
                })
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }

            }catch(error){
                console.error("Error fetching user:", error);
                setUser(null);
                setIsAuthenticated(false);
            }
            
        
        

            
            

        }
        getuser();
        
    },[isAuthenticated])

    

    
    return(
        <UserContext.Provider value={{user,setUser, isAuthenticated, setIsAuthenticated}}>
            {children}
        </UserContext.Provider>
    )
}

const useUser = () => useContext(UserContext);

export {UserContext, UserContextProvider,useUser};