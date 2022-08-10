import axios from "axios"

export const getLoggedInValue = () =>
    axios.get("/api/logged_in").then((response) => response.data.isLoggedIn)
