import axios from "axios"

export const getLoggedInValue = () =>
    axios.get("/api/logged_in").then((response) => response.data.isLoggedIn)

export const login = (data) => axios.post("/api/auth/signin", data)

export const signup = (data) => axios.post("/api/auth/signup", data)

export const queryResetLink = (data) =>
    axios.post("/api/auth/forgot-pass", data)

export const resetPassword = (data) =>
    axios.post("/api/auth/password-reset", data)
