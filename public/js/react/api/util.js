import axios from "axios"
import { getSlugFromURL } from "../utils/getSlugFromURL"

export const getIdFromSlug = (slug) => {
    const slugVal = slug || getSlugFromURL()
    return axios
        .get(`/api/id_from_slug?slug=${slugVal}`)
        .then((response) => response.data.id)
}
