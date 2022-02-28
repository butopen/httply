export function cors() {
    const methods = 'GET, POST, PATCH, DELETE'
    const headers = 'authorization, referer, origin, content-type'
    const origin = "*"
    const corsHeaders = {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': methods,
        'Access-Control-Allow-Headers': headers,
        'Access-Control-Allow-Credentials': "true"
    }
    return corsHeaders
}
