import React from 'react'
import axios from "axios";
import { Store } from './context/Store'

const useModules = () => {
    const { state } = React.useContext(Store);
    const [failedRequests, setFailedRequests] = React.useState({})

    const api = axios.create({
        baseURL: state.baseURL
    });
    
    const getConfiguration = async () => {
        const result = await api.get("/configuration").catch(() => {
            setFailedRequests({...failedRequests, 'getConfiguration': { url: state.baseURL }});
        })
        return result?.data
    }
    
    const getStats = async () => {
        const statsResult = await api.get("/stats?limit=200").catch(() => {
            setFailedRequests({...failedRequests, 'getStats': { url: state.baseURL }});
        })
        return statsResult?.data
    }
    
    const getNextGame = async () => {
        const nextGameResult = await api.get('/nextGame').catch(() => {
            setFailedRequests({...failedRequests, 'getNextGame': { url: state.baseURL }});
        })
        return nextGameResult?.data
    }
    
    const getSpin = async (nextGameUUID) => {
        const spinResult = await api.get(`game/${nextGameUUID}`).catch(() => {})
        return spinResult?.data
    }
    
    React.useEffect(() => {
        Object.entries(failedRequests)
            .filter(([key, payload]) => payload !== null)
            .forEach(([key, { url }]) => {
                setFailedRequests({...failedRequests, [key]: null});

                if (url !== state.baseURL) {
                    return
                }

                setTimeout(() => modules[key](), 1000);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [failedRequests])

    const modules = {
        getConfiguration,
        getStats,
        getNextGame,
        getSpin
    }

    return modules;
}

export default useModules;