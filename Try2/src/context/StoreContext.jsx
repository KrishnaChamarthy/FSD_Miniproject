import axios from "axios"
import { createContext, useState, useEffect } from "react"
export const StoreContext = createContext(null);


const StoreContextProvider = (props) => {
    const url = "http://localhost:4000"
    const [token, setToken] = useState("");

    const contextValue = {
        url,
        token,
        setToken
    };


    useEffect(() => {
        async function loadData() {
            if (localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
            }
        }
        loadData();
    }, [])

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;