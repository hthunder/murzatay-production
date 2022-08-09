import { useState } from "react"

export const useApi = (apiFunc) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState("")

    const request = async (...args) => {
        setIsLoading(true)
        try {
            const result = await apiFunc(...args)
            setData(result.data)
        } catch (e) {
            setError(e.message || "Непредвиденная ошибка")
        } finally {
            setIsLoading(false)
        }
    }

    return {
        data,
        error,
        isLoading,
        request,
    }
}
