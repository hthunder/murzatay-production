import { client } from "./client"

export const getComments = () => client.get("/comments")
