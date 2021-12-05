// import React from 'react';
import { createContext, useContext, useState} from 'react';

const StockContext = createContext({
    signedIn: "",
    userId: "",
    favorite: {
        company: [],
        function: [],
    },

    addFavoriteCompany: ()=> {},
    addFunction: ()=>{},
})

const StockProvider = (props)=>{
    return (
        <StockContext.Provider
          value={{

          }}
          {...props}
        />
    )
}
function useStock (){
    // console.log("THIS IS general useContext")
return useContext(StockContext);
}

export { StockProvider, useStock };