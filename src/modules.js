import React from 'react'
import axios from "axios";
import { Store } from './context/Store'

const useModules = () => {
    const { state } = React.useContext(Store);

    const api = axios.create({
        baseURL: state.baseURL
    });
    
    const getConfiguration = async () => {
        const result = await api.get("/configuration")
        return result?.data
    }
    
    const getStats = async () => {
        const statsResult = await api.get("/stats?limit=200")
        return statsResult?.data
    }
    
    const getNextGame = async () => {
        const nextGameResult = await api.get('/nextGame')
        return nextGameResult?.data
    }
    
    const getSpin = async (nextGameUUID) => {
        const spinResult = await api.get(`game/${nextGameUUID}`)
        return spinResult?.data
    }

    return {
        getConfiguration,
        getStats,
        getNextGame,
        getSpin
    };
}

export default useModules;