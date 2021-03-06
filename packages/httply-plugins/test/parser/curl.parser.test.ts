import {CurlGenerator, CurlParser} from "../../src";

test("should keep double wuote on header value", async () => {
  const result2 = new CurlParser().parse(`curl u -H 'test:"x"'`);
  // expect(result2.options.headers!["test"]).toBe(`"x"`);
  const result = new CurlParser().parse(`curl u -H "test:^\^"x^\^""`);
  console.log(result)
  expect(result.options.headers!["test"]).toBe(`"x"`);
});

test("curl bash: should keep dash on header value", async () => {
  const result = new CurlParser().parse(
    `curl "https://ciao.com" -H 'test:"x -X"'`
  );
  console.log(result);
  expect(result.url).toBe("https://ciao.com");
  expect(result.options.headers!["test"]).toBe(`"x -X"`);
});

test("curl cmd: should keep dash on header value", async () => {
  const result = new CurlParser().parse(
    `curl -X POST u -H "test:^\^"x -X^\^"" -H "ciao:^\^"Andrea^\^"  andrea"`
  );
  console.log(result);
  expect(result.url).toBe("u");
  expect(result.options.headers!["test"]).toBe(`"x -X"`);
  expect(result.options.headers!["ciao"]).toBe(`"Andrea" andrea`);
});

test("test curl complex command 1 ", async () => {
  const h = new CurlParser();
  const result = h.parse(`curl "https://github.com/commits/badges" ^
  -H "authority: github.com" ^
  -H "pragma: no-cache" ^
  -H "cache-control: no-cache" ^
  -H "sec-ch-ua: ^\^" Not A;Brand^\^";v=^\^"99^\^", ^\^"Chromium^\^";v=^\^"99^\^", ^\^"Google Chrome^\^";v=^\^"99^\^"" ^
  -H "accept: application/json" ^
  -H "content-type: multipart/form-data; boundary=----WebKitFormBoundary7fLB1AQP6tPVjfA3" ^
  -H "x-requested-with: XMLHttpRequest" ^
  -H "sec-ch-ua-mobile: ?0" ^
  -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36" ^
  -H "sec-ch-ua-platform: ^\^"Windows^\^"" ^
  -H "origin: https://github.com" ^
  -H "sec-fetch-site: same-origin" ^
  -H "sec-fetch-mode: cors" ^
  -H "sec-fetch-dest: empty" ^
  -H "referer: https://github.com/butopen/httply/pull/1" ^
  -H "accept-language: it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7" ^
  -H "cookie: _ga=GA1.2.1023485772.1597242645; tz=Europe^%^2FRome; tz=Europe^%^2FRome; color_mode=^%^7B^%^22color_mode^%^22^%^3A^%^22light^%^22^%^2C^%^22light_theme^%^22^%^3A^%^7B^%^22name^%^22^%^3A^%^22light^%^22^%^2C^%^22color_mode^%^22^%^3A^%^22light^%^22^%^7D^%^2C^%^22dark_theme^%^22^%^3A^%^7B^%^22name^%^22^%^3A^%^22dark^%^22^%^2C^%^22color_mode^%^22^%^3A^%^22dark^%^22^%^7D^%^7D; _octo=GH1.1.370418389.1628840940; _device_id=9dc7bbbfe9b52bb7e1ba9555b33ed4ae; user_session=bfdbvSFJN5cyRv-M9yfhWyAjsKpTUZ2QEKLQMWSUsXlrdyU8; __Host-user_session_same_site=bfdbvSFJN5cyRv-M9yfhWyAjsKpTUZ2QEKLQMWSUsXlrdyU8; logged_in=yes; dotcom_user=salvatoreromeo; has_recent_activity=1; _gh_sess=LHS^%^2FaoFo7tbbHnZ8giWXnJ7U4VDGLgy3obouKfAiHRo2SKiG^%^2FsyfSO^%^2FQKNo9yUD4tneoACJnwWMmciC^%^2FPlWOeXfXWaUVpkoaUJlxjQEACiyEC29l05aSAi68CFILRPZaWFM3VOVwiUc4VVP^%^2FQHyIWgO0ChzSZYIvyeQL0mjWgbmlMeN1zQIVei1xDc9KMXp6YR8NTyXO1x1IL^%^2BxMVeJZ^%^2F3WYT1eVURKmu2YCQUeZ7piZomvoKDjhDs^%^2FiEORrwymZ4OdDFhwCQAfZyuTxYJTq9CkRVvJ4mc1TWWq45gYc9rPCMwZ1C2c^%^2BuiXjmrk257QdSjQ7NtJTWnqwrjn0S2AVapBwBxB6iTFvz9HRzPh4V5iqEcVawMo5qKe71K8uxnP^%^2Fj6WJMYI350O0P8EsHufg62o^%^2FWqj2xGhdwO60tdn4yvIDl^%^2FGrLFCTn9RBaTzdi7v7omB4TR6oMY9rK09yVj6izNFPMsRqamSJzUJvddIgN53y1B^%^2BpIo^%^2FyEbg1E^%^2BICxOdY5w7oO0k^%^2FNFB7CjR3PFQfHWW1cojrNgZbthH7Q9Pwk2pmc3FbMPofc^%^2B^%^2FYpf7u0cY6zZU018l41mFZznzzIp1RNJYb7Go7BgGWBe7DUykuD8peedrH0aB^%^2F8OKzQ5tqUwcWIq1ukbApecx37nghTNHJ3dWLiyZYYlEyMK2ASi5zQF4rZsrl0AZRlJdKKHCxs8IKxCAagB5JlBMjhKbpyBRoUiBjrHFqVOOxR4JyxdI^%^2F2gK1r4y0Y4LNzcYIN2WR2vJPj7YbIfW1l4xJZZF^%^2BNDQPMQ^%^2FplABJxy^%^2BPXpnIoOSq7XiX5Ie^%^2FSl1q0HjWQEy9p7QapJGLIDhzp9HuCCqo2Ag5hs6JWvKEdoHsVAka5su160^%^2BlEeHpsDMcpLTY6X1^%^2BXuUobcpNQvlgy^%^2BBngXE1pfIOQAYsmpParbrd7Kwn7dH^%^2BooeTIGkz6l7vM7oP^%^2BGlxoshq8V22V^%^2FJ3Gq6dE^%^2BZuM051oUH0FlrMgSM2LaaUvuA86Fw9tbFTr0M98IWq8xsBddKQwjwWi8krHyBVJEcZGwLkyTGaGvk4J^%^2FzAX^%^2FV1^%^2FnO0PIFiWcGhu9ujB8uVbWNAkI3kk8vcQKB9ReGmP1IZ--kMrRwmsXUtyJWzBb--lKvrs^%^2F^%^2Bl3ZplrLQvEO5z4Q^%^3D^%^3D" ^
  --data-raw ^"------WebKitFormBoundary7fLB1AQP6tPVjfA3^

Content-Disposition: form-data; name=^\^"authenticity_token^\^"^

^

kTCf0rfKBb094ywiEz5KojQsdajmQRAiLFaAmLvcQIsUqJ_sSPsEaugBXz1NdmordyK21LAS-dK9DzI5aRqa8g^

------WebKitFormBoundary7fLB1AQP6tPVjfA3^

Content-Disposition: form-data; name=^\^"items^[item-0^]^[id^]^\^"^

^

C_kwDOGygCzNoAKGU2YWI1NTk0ZGQ4YWJjNWVhMGYyMWFjNTFmNTExMGFmNWZmN2I5ODU^

------WebKitFormBoundary7fLB1AQP6tPVjfA3^

Content-Disposition: form-data; name=^\^"items^[item-0^]^[badge_size^]^\^"^

^

small^

------WebKitFormBoundary7fLB1AQP6tPVjfA3^

Content-Disposition: form-data; name=^\^"items^[item-0^]^[dropdown_direction^]^\^"^

^

s^

------WebKitFormBoundary7fLB1AQP6tPVjfA3^

Content-Disposition: form-data; name=^\^"items^[item-1^]^[id^]^\^"^

^

C_kwDOGygCzNoAKGI1YmMxYTdmNTI2YWJlZGY1NGMzYWIwY2I4NGY4OWFmZDU4MjFkYjI^

------WebKitFormBoundary7fLB1AQP6tPVjfA3^

Content-Disposition: form-data; name=^\^"items^[item-1^]^[badge_size^]^\^"^

^

small^

------WebKitFormBoundary7fLB1AQP6tPVjfA3^

Content-Disposition: form-data; name=^\^"items^[item-1^]^[dropdown_direction^]^\^"^

^

s^

------WebKitFormBoundary7fLB1AQP6tPVjfA3--^

^" ^
  --compressed`);
  expect(result.options.method).toBe("POST");
  expect(result.options.headers!["authority"]).toBe("github.com");
  expect(result.options.headers!["referer"]).toBe(
    "https://github.com/butopen/httply/pull/1"
  );
  console.log(result);
});

test("test curl complex command 2 ", async () => {
  const h = new CurlParser();
  const result =
    h.parse(`curl https://dday.imgix.net/system/uploads/video/screenshot/388/Il_mio_post_6_.png?ar=27%3A21&fit=crop&auto=format%2Ccompress&w=100&s=0993de70debecd580cf3da30a29b53ee \\
  -H 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="99"' \\
  -H 'Referer: https://dday.it/' \\
  -H 'sec-ch-ua-mobile: ?0' \\
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36' \\
  -H 'sec-ch-ua-platform: "Linux"' \\
  --compressed`);
  console.log(result)
  expect(result.options.method).toBe("GET");
  expect(result.options.headers!["sec-ch-ua-platform"]).toBe('"Linux"');
  expect(result.options.headers!["Referer"]).toBe("https://dday.it/");
});

test("test curl-cmd POST reuqest with body", async () => {
  const result = new CurlParser().parse(`
  curl "https://us6ikryakb-dsn.algolia.net/1/indexes/prod_c_900_categories/query?x-algolia-agent=Algolia^%^20for^%^20JavaScript^%^20(4.12.0)^%^3B^%^20Browser^%^20(lite)^%^3B^%^20instantsearch.js^%^20(4.37.2)^%^3B^%^20Vue^%^20(2.6.14)^%^3B^%^20Vue^%^20InstantSearch^%^20(3.8.1)^%^3B^%^20JS^%^20Helper^%^20(3.7.0)&x-algolia-api-key=2ec513d5d96ad975110cc68022f3627f&x-algolia-application-id=US6IKRYAKB" ^
  -H "Connection: keep-alive" ^
  -H "Pragma: no-cache" ^
  -H "Cache-Control: no-cache" ^
  -H "sec-ch-ua: ^\^" Not A;Brand^\^";v=^\^"99^\^", ^\^"Chromium^\^";v=^\^"99^\^", ^\^"Google Chrome^\^";v=^\^"99^\^"" ^
  -H "sec-ch-ua-mobile: ?0" ^
  -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36" ^
  -H "sec-ch-ua-platform: ^\^"Windows^\^"" ^
  -H "content-type: application/x-www-form-urlencoded" ^
  -H "Accept: */*" ^
  -H "Origin: https://www.easycoop.com" ^
  -H "Sec-Fetch-Site: cross-site" ^
  -H "Sec-Fetch-Mode: cors" ^
  -H "Sec-Fetch-Dest: empty" ^
  -H "Accept-Language: it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7" ^
  --data-raw "{^\^"query^\^":^\^"^\^",^\^"attributesToRetrieve^\^":^[^\^"name^\^",^\^"url^\^",^\^"level^\^"^],^\^"facetFilters^\^":^[^[^\^"path:pasta, pane e farine^\^"^]^]^}" ^
  --compressed
  `);
  console.log(result)
  expect(result.body).toBe('{"query":"","attributesToRetrieve":["name","url","level"],"facetFilters":[["path:pasta, pane e farine"]]}')
});



test("test curl-cmd reuqest ",async ()=>{
  const result = new CurlParser().parse(`curl "https://www.oracle.com/webfolder/technetwork/tutorials/obe/cloud/objectstorage/restrict_rw_accs_cntainers_REST_API/files/installing_curl_command_line_tool_on_windows.html" ^
  -H "authority: www.oracle.com" ^
  -H "accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9" ^
  -H "accept-language: it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7" ^
  -H "cache-control: max-age=0" ^
  -H "cookie: s_fid=2FB53E554068C1BB-39D87842CE52F946; notice_gdpr_prefs=0,1,2:cb8350a2759273dccf1e483791e6f8fd; notice_preferences=2:cb8350a2759273dccf1e483791e6f8fd; cmapi_gtm_bl=; cmapi_cookie_privacy=permit 1,2,3; akaas_aud-seg-ocom-prod=2147483647~rv=3~id=ba6bff046d52734afef89bc393a3ff49; ak_bmsc=2EF89A0D83D80A9DE154E264A8508D6A~000000000000000000000000000000~YAAQNF96XEYR49F/AQAAxDHQ/g+4kAHfW6ZNObuxtuW0w3cn9Aqzk8TpaJHwPUnOZYix090qdV4c+FqR+APFeGAPRAViFU3pbTiKdvK9WEH7LoIUZm4sr37DOToEB65cV4JDXhK/rk2J1D0n8LFeIoDR1fNjCz2vclTw9uChj6wtUpS0fufeV4lHphKObREJm6XpaEMISoSoqiBobOxGHkiE4jMIo4vTXKVDY5HkyaYBRMWfsLz4lknZawqdSu1fELIbx7Cr4yqyMTSeLvrSawUYjkvHYlxE9GZnfEhVide/n99Tc46qmK/MkmsZwwyJVYTEij00rheEZZMiIQqH2yYxQsq+GAMwfa9Y8v5Wl3sdmhXnYzmKnMR2ctD860n5/EIrU6B3WKt6DiPhZ2ya3HTGyTAnuYQavB7EPFtDxrLU2BvsRJv0+tg5PXfV56wLIDd5wzdam+lGHX3wpRWZCaGCXbdUXZfs/vGFFx2QfC8=; X-Oracle-BMC-LBS-Route=2af63722b49b0cf7a70fc08e7a7691310be64043; JSESSIONID=uhL-0DQOlD0N6KrVECYUHLC7k__IXj-JMLGwcqTzq4hMm_4BPsnk^!1007305902^!-1005676203" ^
  -H "dnt: 1" ^
  -H "referer: https://www.google.com/" ^
  -H "sec-ch-ua: ^\^" Not A;Brand^\^";v=^\^"99^\^", ^\^"Chromium^\^";v=^\^"100^\^", ^\^"Google Chrome^\^";v=^\^"100^\^"" ^
  -H "sec-ch-ua-mobile: ?0" ^
  -H "sec-ch-ua-platform: ^\^"Windows^\^"" ^
  -H "sec-fetch-dest: document" ^
  -H "sec-fetch-mode: navigate" ^
  -H "sec-fetch-site: cross-site" ^
  -H "sec-fetch-user: ?1" ^
  -H "upgrade-insecure-requests: 1" ^
  -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36" ^
  --compressed`)
  console.log(result);
  expect(result.options.method).toBe('GET');
  expect(result.options.headers!['sec-ch-ua']).toBe('" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"' );
});

