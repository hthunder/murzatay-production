export const getCookie = (cname) => {
    const foundCookie = decodeURIComponent(document.cookie)
        .split("; ")
        .find((cookie) => cookie.startsWith(`${cname}=`))
    if (foundCookie) return foundCookie.split("=")[1]
    return ""
}

export const deleteCookie = (cname) => {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`
}
