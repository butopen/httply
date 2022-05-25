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
  -H "sec-ch-ua: ^\\^" Not A;Brand^\\^";v=^\\^"99^\\^", ^\\^"Chromium^\\^";v=^\\^"99^\\^", ^\\^"Google Chrome^\\^";v=^\\^"99^\\^"" ^
  -H "sec-ch-ua-mobile: ?0" ^
  -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36" ^
  -H "sec-ch-ua-platform: ^\\^"Windows^\\^"" ^
  -H "content-type: application/x-www-form-urlencoded" ^
  -H "Accept: */*" ^
  -H "Origin: https://www.easycoop.com" ^
  -H "Sec-Fetch-Site: cross-site" ^
  -H "Sec-Fetch-Mode: cors" ^
  -H "Sec-Fetch-Dest: empty" ^
  -H "Accept-Language: it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7" ^
  --data-raw "{^\\^"query^\\^":^\\^"^\\^",^\\^"attributesToRetrieve^\\^":^[^\\^"name^\\^",^\\^"url^\\^",^\\^"level^\\^"^],^\\^"facetFilters^\\^":^[^[^\\^"path:pasta, pane e farine^\\^"^]^]^}" ^
  --compressed
  `);
  console.log(result)
  // expect(result.body).toBe('{"query":"","attributesToRetrieve":["name","url","level"],"facetFilters":[["path:pasta, pane e farine"]]}')
});



test("test curl-cmd reuqest ",async ()=>{
  const result = new CurlParser().parse(`curl "https://www.google.com/search?q=ciao&oq=ciao&aqs=chrome.0.69i59j69i60l4j69i65j5j69i60.485j0j7&sourceid=chrome&ie=UTF-8" ^
  -H "authority: www.google.com" ^
  -H "accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9" ^
  -H "accept-language: it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7" ^
  -H "cache-control: max-age=0" ^
  -H "cookie: CONSENT=YES+srp.gws-20220503-0-RC1.it+FX+089; SID=JwhRhQ7nojuyq-BN9kTTPOITyxSbbNlJxq1Lsmzd4buA-wt92H0nB0GZkCObFXIVKpg4TA.; __Secure-1PSID=JwhRhQ7nojuyq-BN9kTTPOITyxSbbNlJxq1Lsmzd4buA-wt9k5WjzykIgdUvU5tGFdYdHA.; __Secure-3PSID=JwhRhQ7nojuyq-BN9kTTPOITyxSbbNlJxq1Lsmzd4buA-wt9zEcT7vcc9NBHSQfCVMyzdw.; HSID=AfZtpCoNm3B9DLqoE; SSID=AIiHyUgcFU5qaySu1; APISID=h63KPz0yr7QxfhbL/AsxOZIqPWIuWMTvTb; SAPISID=HjCnA8yi5bZNhtaI/AWGg2sc1wrGVAx-y_; __Secure-1PAPISID=HjCnA8yi5bZNhtaI/AWGg2sc1wrGVAx-y_; __Secure-3PAPISID=HjCnA8yi5bZNhtaI/AWGg2sc1wrGVAx-y_; SEARCH_SAMESITE=CgQIsJUB; OTZ=6496595_48_52_123900_48_436380; 1P_JAR=2022-05-18-07; AEC=AakniGMoOF-ZmidRgr4sIpkORPlepoH1sh34fR65BjJfKmnLg8SUncs8yrY; NID=511=S8mE8HX0D3qi52Lp9YGfxqcfC2WWC0ND5sS_yVTGfZn3NPZbJO3s1gMhAI5Z3TxvthdoSvYXNRdDgRNFyz-wDgj_YS0ItbioaaVhWm7IpqjZK71hxgHDtJR8A6SRtv2YrZsGhjgD4-WSuQ6-6ZckMBSNCmGZSrN07P4CDCA8PM9Vz23Wc0TvOMp2l9kQkn2FXzK5FDQ1-KbKMnXnhCJ0EXEW7MeiHbqGFkrfb3YoYgbzDjkpHxR93XXS9TZUHl0sz20H6huL28cC3A5uaw; DV=YzTUyRVAC_tUIBy4P1MyROuACc1hDRiI-LVhLnx5dgIAAMDXZOvQycoVnwAAAHh0x-PxVD2eMgAAAGy871Dv-DMjFwAAAA; SIDCC=AJi4QfGZpBAYtKl95qp-p7icfR1kC0UvFEoITHomrIpc1zqWWkp5pLKiidQzP5xNu0OTxOct5w; __Secure-3PSIDCC=AJi4QfEYLQ8kiCaVBiWH8E6MVbKiOp2KNsGMMKLn6dPNmKj3jxvxcH9taHuQmcvmA6rRHm1PQT0" ^
  -H "dnt: 1" ^
  -H "sec-ch-dpr: 1.100000023841858" ^
  -H "sec-ch-ua: ^\\^" Not A;Brand^\\^";v=^\\^"99^\\^", ^\\^"Chromium^\\^";v=^\\^"101^\\^", ^\\^"Google Chrome^\\^";v=^\\^"101^\\^"" ^
  -H "sec-ch-ua-arch: ^\\^"x86^\\^"" ^
  -H "sec-ch-ua-bitness: ^\\^"64^\\^"" ^
  -H "sec-ch-ua-full-version: ^\\^"101.0.4951.54^\\^"" ^
  -H "sec-ch-ua-full-version-list: ^\\^" Not A;Brand^\\^";v=^\\^"99.0.0.0^\\^", ^\\^"Chromium^\\^";v=^\\^"101.0.4951.54^\\^", ^\\^"Google Chrome^\\^";v=^\\^"101.0.4951.54^\\^"" ^
  -H "sec-ch-ua-mobile: ?0" ^
  -H "sec-ch-ua-model: ^\\^"^\\^"" ^
  -H "sec-ch-ua-platform: ^\\^"Windows^\\^"" ^
  -H "sec-ch-ua-platform-version: ^\\^"10.0.0^\\^"" ^
  -H "sec-ch-ua-wow64: ?0" ^
  -H "sec-ch-viewport-width: 1587" ^
  -H "sec-fetch-dest: document" ^
  -H "sec-fetch-mode: navigate" ^
  -H "sec-fetch-site: same-origin" ^
  -H "sec-fetch-user: ?1" ^
  -H "upgrade-insecure-requests: 1" ^
  -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36" ^
  -H "x-client-data: CKm1yQEIhLbJAQiktskBCMS2yQEIqZ3KAQjNjcsBCJWhywEI2+/LAQie+csBCOaEzAEImZrMAQj+nMwBCNqozAEI3KnMAQj9qswBCOqrzAEIwqzMAQiyrswBCKWvzAEYq6nKAQ==" ^
  --compressed`)
  console.log(result);
  expect(result.options.method).toBe('GET');
  expect(result.options.headers!['sec-ch-ua']).toBe('" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"' );
});


test("test curl-bash reuqest ",async ()=>{
  const result = new CurlParser().parse(`curl 'https://www.google.com/search?q=ciao&oq=ciao&aqs=chrome..69i57j46i433i512j46i131i175i199i433i512j0i433i512j0i131i433i512l2j46i433i512j0i512j46i131i175i199i433i512j46i512.795j0j7&sourceid=chrome&ie=UTF-8' \\
  -H 'authority: www.google.com' \\
  -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \\
  -H 'accept-language: it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7' \\
  -H 'cache-control: max-age=0' \\
  -H 'cookie: CONSENT=YES+srp.gws-20220503-0-RC1.it+FX+089; SID=JwhRhQ7nojuyq-BN9kTTPOITyxSbbNlJxq1Lsmzd4buA-wt92H0nB0GZkCObFXIVKpg4TA.; __Secure-1PSID=JwhRhQ7nojuyq-BN9kTTPOITyxSbbNlJxq1Lsmzd4buA-wt9k5WjzykIgdUvU5tGFdYdHA.; __Secure-3PSID=JwhRhQ7nojuyq-BN9kTTPOITyxSbbNlJxq1Lsmzd4buA-wt9zEcT7vcc9NBHSQfCVMyzdw.; HSID=AfZtpCoNm3B9DLqoE; SSID=AIiHyUgcFU5qaySu1; APISID=h63KPz0yr7QxfhbL/AsxOZIqPWIuWMTvTb; SAPISID=HjCnA8yi5bZNhtaI/AWGg2sc1wrGVAx-y_; __Secure-1PAPISID=HjCnA8yi5bZNhtaI/AWGg2sc1wrGVAx-y_; __Secure-3PAPISID=HjCnA8yi5bZNhtaI/AWGg2sc1wrGVAx-y_; SEARCH_SAMESITE=CgQIsJUB; OTZ=6496595_48_52_123900_48_436380; AEC=AakniGMoOF-ZmidRgr4sIpkORPlepoH1sh34fR65BjJfKmnLg8SUncs8yrY; NID=511=S8mE8HX0D3qi52Lp9YGfxqcfC2WWC0ND5sS_yVTGfZn3NPZbJO3s1gMhAI5Z3TxvthdoSvYXNRdDgRNFyz-wDgj_YS0ItbioaaVhWm7IpqjZK71hxgHDtJR8A6SRtv2YrZsGhjgD4-WSuQ6-6ZckMBSNCmGZSrN07P4CDCA8PM9Vz23Wc0TvOMp2l9kQkn2FXzK5FDQ1-KbKMnXnhCJ0EXEW7MeiHbqGFkrfb3YoYgbzDjkpHxR93XXS9TZUHl0sz20H6huL28cC3A5uaw; 1P_JAR=2022-05-18-08; DV=YzTUyRVAC_tUIBy4P1MyROsAmuxiDRhfk61DJytXfAIAAAAifm2YC1-evQAAAHh0x-PxVD2eWgAAAGy871Dv-DMjFwAAAA; SIDCC=AJi4QfE8jNF92WB89Ce7muZIVezwTNzoOK2_LbIqfQJj_fdSHAyiT7BEUIaY6p_zoBZ_hhGeMQ; __Secure-3PSIDCC=AJi4QfEWYq6TYzs4KndxOr0-efEYm2l1pBp0nsTeyLcftwcU6cItYI3n64dLY8wyhqPpBsPeQeM' \\
  -H 'dnt: 1' \\
  -H 'sec-ch-dpr: 1.100000023841858' \\
  -H 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"' \\
  -H 'sec-ch-ua-arch: "x86"' \\
  -H 'sec-ch-ua-bitness: "64"' \\
  -H 'sec-ch-ua-full-version: "101.0.4951.54"' \\
  -H 'sec-ch-ua-full-version-list: " Not A;Brand";v="99.0.0.0", "Chromium";v="101.0.4951.54", "Google Chrome";v="101.0.4951.54"' \\
  -H 'sec-ch-ua-mobile: ?0' \\
  -H 'sec-ch-ua-model: ""' \\
  -H 'sec-ch-ua-platform: "Windows"' \\
  -H 'sec-ch-ua-platform-version: "10.0.0"' \\
  -H 'sec-ch-ua-wow64: ?0' \\
  -H 'sec-ch-viewport-width: 1587' \\
  -H 'sec-fetch-dest: document' \\
  -H 'sec-fetch-mode: navigate' \\
  -H 'sec-fetch-site: same-origin' \\
  -H 'sec-fetch-user: ?1' \\
  -H 'upgrade-insecure-requests: 1' \\
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36' \\
  -H 'x-client-data: CKm1yQEIhLbJAQiktskBCMS2yQEIqZ3KAQjNjcsBCJWhywEI2+/LAQie+csBCOaEzAEImZrMAQj+nMwBCNqozAEI3KnMAQj9qswBCOqrzAEIwqzMAQiyrswBCKWvzAEYq6nKAQ==' \\
  --compressed`)
  console.log(result);
  expect(result.options.method).toBe('GET');
  expect(result.options.headers!['sec-ch-ua']).toBe('" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"' );
});
