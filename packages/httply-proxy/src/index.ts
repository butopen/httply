import {router} from "./router";

export default {
    async fetch(request, environment, context) {
        try {
            const response = await router.handle(request);
            console.log("response: ", response);
            return response;
        } catch (error) {
            return new Response("Oops!", {status: 500});
        }
    }
};
