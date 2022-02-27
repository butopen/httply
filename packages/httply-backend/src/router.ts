import {
    json,
    missing,
    error,
    status,
    withContent,
    withParams,
    ThrowableRouter,
} from 'itty-router-extras'
import {Router} from "itty-router";


export const router = Router()

router.all("*", r => {
    console.log("r: ",r)
    const u = new URL(r.url)
    return json({ok: u.pathname})
})
