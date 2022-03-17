import {CurlParser} from "../../src/parser/curl.parser";

test("test curl bash ", async() =>{
   const h = new CurlParser() ;
   const result = h.parse("curl -X POST/ https://ciao.com");
   expect(result.method).toBe("POST");
});

test("test curl cmd ", async() =>{
    const h = new CurlParser() ;
    const result = h.parse("curl -X POST^ https://ciao.com");
    expect(result.method).toBe("POST");
});

