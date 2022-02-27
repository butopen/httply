

export async function playRequest(url: string, options) {
    let result
    try {
        result = await fetch(url, options)
    } catch (e) {
        console.log("e: ",e)

    }
    return result
}
