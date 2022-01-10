import React from "react"

export const Store = React.createContext()

const initialState = {
    baseURL: `https://dev-games-backend.advbet.com/v1/ab-roulette/1/`
}

function reducer(state, action){
    switch(action.type) {
        case 'SET_URL': 
            return { ...state, baseURL: action.payload.baseURL }
        default: 
            return state
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    const value = {state, dispatch}
    return <Store.Provider value={value}>
        {props.children}
    </Store.Provider>
}

