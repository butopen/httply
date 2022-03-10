import { Router } from "itty-router";
import { HLRequest, HLRequestInformation } from "./httply-backend.model";
import { makeRequest } from "./services/proxy";
import { cors } from "./services/cors-middleware";

export const router = Router();

router.post("/api*", async (r: HLRequest) => {
  const requestInformation: HLRequestInformation = await r.json();
  const headers = {};
  let responseData = "";
  try {
    let result = await makeRequest(requestInformation);
    result.headers.forEach((hv, h) => {
      headers[h] = hv;
    });
    responseData = await result.text();
    responseData = JSON.parse(responseData);
  } catch (error) {
    console.log("error: ", error);
  }

  const body = JSON.stringify({
    request: requestInformation,
    response: {
      headers,
      response: responseData
    }
  });
  return new Response(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...cors()
    }
  });
});

router.options("/api*", r => {
  return new Response("", {
    headers: { ...cors() }
  });
});
