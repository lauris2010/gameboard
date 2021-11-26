import axios from "axios";

const api = axios.create({
    baseURL: `https://dev-games-backend.advbet.com/v1/ab-roulette/1/`
})

export const getConfiguration = async () => {
    const result = await api.get("/configuration")
    return result?.data
}

export const getStats = async () => {
    const statsResult = await api.get("/stats?limit=200")
    return statsResult?.data
}