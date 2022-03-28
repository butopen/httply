import { CurlParser } from "../../src/parser/curl.parser";

test("should keep double wuote on header value", async () => {
  const result2 = new CurlParser().parse(`curl u -H 'test:"x"'`);
  expect(result2.options.headers!["test"]).toBe(`"x"`);
  const result = new CurlParser().parse(`curl u -H "test:^\\^"x^\\^""`);
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
    `curl -X POST u -H "test:^\\^"x -X^\\^"" -H "ciao:^\\^"Andrea^\\^"  andrea"`
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
  -H "sec-ch-ua: ^\\^" Not A;Brand^\\^";v=^\\^"99^\\^", ^\\^"Chromium^\\^";v=^\\^"99^\\^", ^\\^"Google Chrome^\\^";v=^\\^"99^\\^"" ^
  -H "accept: application/json" ^
  -H "content-type: multipart/form-data; boundary=----WebKitFormBoundary7fLB1AQP6tPVjfA3" ^
  -H "x-requested-with: XMLHttpRequest" ^
  -H "sec-ch-ua-mobile: ?0" ^
  -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36" ^
  -H "sec-ch-ua-platform: ^\\^"Windows^\\^"" ^
  -H "origin: https://github.com" ^
  -H "sec-fetch-site: same-origin" ^
  -H "sec-fetch-mode: cors" ^
  -H "sec-fetch-dest: empty" ^
  -H "referer: https://github.com/butopen/httply/pull/1" ^
  -H "accept-language: it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7" ^
  -H "cookie: _ga=GA1.2.1023485772.1597242645; tz=Europe^%^2FRome; tz=Europe^%^2FRome; color_mode=^%^7B^%^22color_mode^%^22^%^3A^%^22light^%^22^%^2C^%^22light_theme^%^22^%^3A^%^7B^%^22name^%^22^%^3A^%^22light^%^22^%^2C^%^22color_mode^%^22^%^3A^%^22light^%^22^%^7D^%^2C^%^22dark_theme^%^22^%^3A^%^7B^%^22name^%^22^%^3A^%^22dark^%^22^%^2C^%^22color_mode^%^22^%^3A^%^22dark^%^22^%^7D^%^7D; _octo=GH1.1.370418389.1628840940; _device_id=9dc7bbbfe9b52bb7e1ba9555b33ed4ae; user_session=bfdbvSFJN5cyRv-M9yfhWyAjsKpTUZ2QEKLQMWSUsXlrdyU8; __Host-user_session_same_site=bfdbvSFJN5cyRv-M9yfhWyAjsKpTUZ2QEKLQMWSUsXlrdyU8; logged_in=yes; dotcom_user=salvatoreromeo; has_recent_activity=1; _gh_sess=LHS^%^2FaoFo7tbbHnZ8giWXnJ7U4VDGLgy3obouKfAiHRo2SKiG^%^2FsyfSO^%^2FQKNo9yUD4tneoACJnwWMmciC^%^2FPlWOeXfXWaUVpkoaUJlxjQEACiyEC29l05aSAi68CFILRPZaWFM3VOVwiUc4VVP^%^2FQHyIWgO0ChzSZYIvyeQL0mjWgbmlMeN1zQIVei1xDc9KMXp6YR8NTyXO1x1IL^%^2BxMVeJZ^%^2F3WYT1eVURKmu2YCQUeZ7piZomvoKDjhDs^%^2FiEORrwymZ4OdDFhwCQAfZyuTxYJTq9CkRVvJ4mc1TWWq45gYc9rPCMwZ1C2c^%^2BuiXjmrk257QdSjQ7NtJTWnqwrjn0S2AVapBwBxB6iTFvz9HRzPh4V5iqEcVawMo5qKe71K8uxnP^%^2Fj6WJMYI350O0P8EsHufg62o^%^2FWqj2xGhdwO60tdn4yvIDl^%^2FGrLFCTn9RBaTzdi7v7omB4TR6oMY9rK09yVj6izNFPMsRqamSJzUJvddIgN53y1B^%^2BpIo^%^2FyEbg1E^%^2BICxOdY5w7oO0k^%^2FNFB7CjR3PFQfHWW1cojrNgZbthH7Q9Pwk2pmc3FbMPofc^%^2B^%^2FYpf7u0cY6zZU018l41mFZznzzIp1RNJYb7Go7BgGWBe7DUykuD8peedrH0aB^%^2F8OKzQ5tqUwcWIq1ukbApecx37nghTNHJ3dWLiyZYYlEyMK2ASi5zQF4rZsrl0AZRlJdKKHCxs8IKxCAagB5JlBMjhKbpyBRoUiBjrHFqVOOxR4JyxdI^%^2F2gK1r4y0Y4LNzcYIN2WR2vJPj7YbIfW1l4xJZZF^%^2BNDQPMQ^%^2FplABJxy^%^2BPXpnIoOSq7XiX5Ie^%^2FSl1q0HjWQEy9p7QapJGLIDhzp9HuCCqo2Ag5hs6JWvKEdoHsVAka5su160^%^2BlEeHpsDMcpLTY6X1^%^2BXuUobcpNQvlgy^%^2BBngXE1pfIOQAYsmpParbrd7Kwn7dH^%^2BooeTIGkz6l7vM7oP^%^2BGlxoshq8V22V^%^2FJ3Gq6dE^%^2BZuM051oUH0FlrMgSM2LaaUvuA86Fw9tbFTr0M98IWq8xsBddKQwjwWi8krHyBVJEcZGwLkyTGaGvk4J^%^2FzAX^%^2FV1^%^2FnO0PIFiWcGhu9ujB8uVbWNAkI3kk8vcQKB9ReGmP1IZ--kMrRwmsXUtyJWzBb--lKvrs^%^2F^%^2Bl3ZplrLQvEO5z4Q^%^3D^%^3D" ^
  --data-raw ^"------WebKitFormBoundary7fLB1AQP6tPVjfA3^

Content-Disposition: form-data; name=^\\^"authenticity_token^\\^"^

^

kTCf0rfKBb094ywiEz5KojQsdajmQRAiLFaAmLvcQIsUqJ_sSPsEaugBXz1NdmordyK21LAS-dK9DzI5aRqa8g^

------WebKitFormBoundary7fLB1AQP6tPVjfA3^

Content-Disposition: form-data; name=^\\^"items^[item-0^]^[id^]^\\^"^

^

C_kwDOGygCzNoAKGU2YWI1NTk0ZGQ4YWJjNWVhMGYyMWFjNTFmNTExMGFmNWZmN2I5ODU^

------WebKitFormBoundary7fLB1AQP6tPVjfA3^

Content-Disposition: form-data; name=^\\^"items^[item-0^]^[badge_size^]^\\^"^

^

small^

------WebKitFormBoundary7fLB1AQP6tPVjfA3^

Content-Disposition: form-data; name=^\\^"items^[item-0^]^[dropdown_direction^]^\\^"^

^

s^

------WebKitFormBoundary7fLB1AQP6tPVjfA3^

Content-Disposition: form-data; name=^\\^"items^[item-1^]^[id^]^\\^"^

^

C_kwDOGygCzNoAKGI1YmMxYTdmNTI2YWJlZGY1NGMzYWIwY2I4NGY4OWFmZDU4MjFkYjI^

------WebKitFormBoundary7fLB1AQP6tPVjfA3^

Content-Disposition: form-data; name=^\\^"items^[item-1^]^[badge_size^]^\\^"^

^

small^

------WebKitFormBoundary7fLB1AQP6tPVjfA3^

Content-Disposition: form-data; name=^\\^"items^[item-1^]^[dropdown_direction^]^\\^"^

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
  // console.log(result)
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
  --data-raw "{^\\^"query^\\^":^\\^"^\\^",^\^"attributesToRetrieve^\^":^[^\^"name^\^",^\^"url^\^",^\^"level^\^"^],^\^"facetFilters^\^":^[^[^\^"path:pasta, pane e farine^\^"^]^]^}" ^
  --compressed
  `);
  console.log(result)
});

test("",async ()=>{
  const result = new CurlParser().parse(`curl 'https://substrate.office.com/search/api/v1/events?scenario=msb.ux.webserp' \\
  -H 'Accept: application/json' \\
  -H 'Accept-Language: it,it-IT;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6' \\
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6ImpOUmM3S1RUZUVmRW55Y2VyQ1ljcWN2UUpjSGdXVWJGOVVkdnhsaV94emMiLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiJodHRwczovL3N1YnN0cmF0ZS5vZmZpY2UuY29tL3NlYXJjaCIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzA2N2U3ZDIwLWU3MGYtNDJjNi1hZTEwLThiMDdlOGM0YTAwMy8iLCJpYXQiOjE2NDg0NjAxOTMsIm5iZiI6MTY0ODQ2MDE5MywiZXhwIjoxNjQ4NDY1NzUwLCJhY2N0IjowLCJhY3IiOiIxIiwiYWlvIjoiQVRRQXkvOFRBQUFBd3lnbmxlNlo1N2U4MHJMTFVxdUg0YVZTUkU0eDJaRVBCQmpJcVJwLzJUdHR4RjdNWkIyMkU1c2JDMWVhWTg4RSIsImFtciI6WyJwd2QiXSwiYXBwaWQiOiI5ZWExYWQ3OS1mZGI2LTRmOWEtOGJjMy0yYjcwZjk2ZTM0YzciLCJhcHBpZGFjciI6IjIiLCJmYW1pbHlfbmFtZSI6IkJhbGRpbmVsbGkiLCJnaXZlbl9uYW1lIjoiQW5kcmVhIiwiaXBhZGRyIjoiNS4xNzkuMTUzLjEyMyIsIm5hbWUiOiJBbmRyZWEgQmFsZGluZWxsaSIsIm9pZCI6Ijg2NTFiOWIxLTczYmUtNDZlMy05YThkLWRjYzc5MTM1YTU4NCIsInB1aWQiOiIxMDAzN0ZGRUE0RjVDMzJDIiwicmgiOiIwLkFYTUFJSDEtQmdfbnhrS3VFSXNINk1TZ0ExZUhxR2FNSlhKTWlUdy1pLTFOYUpsekFGNC4iLCJzY3AiOiJTdWJzdHJhdGVTZWFyY2gtSW50ZXJuYWwuUmVhZFdyaXRlIiwic3ViIjoieGdDVHh1SmhYLTN1aTJXYU5SbU1UVmI1YllaWjJjZ3AwSVFQYlBPZ21jZyIsInRpZCI6IjA2N2U3ZDIwLWU3MGYtNDJjNi1hZTEwLThiMDdlOGM0YTAwMyIsInVuaXF1ZV9uYW1lIjoiYW5kcmVhLmJhbGRpbmVsbGlAc3R1ZGVudGkudW5pcGcuaXQiLCJ1cG4iOiJhbmRyZWEuYmFsZGluZWxsaUBzdHVkZW50aS51bmlwZy5pdCIsInV0aSI6IlA2OEJmVDNNV2tlbVhTUHE4X004QUEiLCJ2ZXIiOiIxLjAifQ.U2oOs9aAc4pGKVdvQof8xByj_iQwwA33tqHzSOWdY0YPK4DPGEJ8MLFA1pBu8sIuNNf2lIe7AiY8GehFaIidVxayCbH3Rk6cKAi3x-jiFqxXcfzAhFimydP2E0pOw0rIFERMfuJ2eW88cta3ywW1qRk6skXcAP0r71kPz0Qakc0MIQS-Hal6SSy7hIJnnTXFqdnHDccUEBtlLUcvO0_o8xYdX_tFYm7Ahjlyw4TyaKGOo2aU8-uipg6bRK-CLORyVgDvHpqanOvVTcblKXqZIVCvPZ9ci2aOcwd8ggVV8gvHGdKz4R4xG_4eB4KgqNEBdlTgAlSz6Tjyl_hIHQlLlg' \\
  -H 'Client-Request-Id: 4d0b5eae-8885-a150-e35b-a70eae3d3e43' \\
  -H 'Connection: keep-alive' \\
  -H 'Content-Type: application/json' \\
  -H 'Origin: https://substrate.office.com' \\
  -H 'Referer: https://substrate.office.com/search/api/v2/resources' \\
  -H 'Sec-Fetch-Dest: empty' \\
  -H 'Sec-Fetch-Mode: cors' \\
  -H 'Sec-Fetch-Site: same-origin' \\
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4911.0 Safari/537.36 Edg/101.0.1193.0' \\
  -H 'X-Client-Language: it-it' \\
  -H 'X-Client-LocalTime: 2022-03-28T12:49:33.588+02:00' \\
  -H 'X-Client-Version: 1.20220321.2.0' \\
  -H 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="101", "Microsoft Edge";v="101"' \\
  -H 'sec-ch-ua-mobile: ?0' \\
  -H 'sec-ch-ua-platform: "Linux"' \\
  --data-raw '[{"Key":"ae39eaba-2077-4ab1-9077-c7ae909b25ca","Value":[{"Name":"SearchActions","Attributes":[{"Key":"EventType","Value":"VerticalClicked"},{"Key":"UserId","Value":"10037FFEA4F5C32C"},{"Key":"TenantId","Value":"067e7d20-e70f-42c6-ae10-8b07e8c4a003"},{"Key":"LogicalId","Value":"ae39eaba-2077-4ab1-9077-c7ae909b25ca"},{"Key":"Version","Value":"2"},{"Key":"LocalTime","Value":"2022-03-28T12:49:31.795+02:00"},{"Key":"Metadata","Value":"{\\"eventId\\":\\"OutsideMSB_Click\\",\\"scenario\\":\\"OutsideMSB\\",\\"ClientEnvironment\\":\\"PROD\\",\\"hasMsa\\":false,\\"formCode\\":\\"ANAB01\\",\\"canvas\\":\\"Serp\\",\\"muid\\":\\"1C21D1A0F89C6E2D256CC090F9AB6FF0\\",\\"dataCenter\\":\\"CoreUX-Prod-DUB02\\",\\"sessionId\\":\\"35952943BDA6677C06A63836BC9166DD\\",\\"deviceType\\":\\"DESKTOP\\",\\"browserName\\":\\"Edge\\",\\"browserVersion\\":\\"101.0.1193.0\\",\\"VerticalType\\":\\"custom\\",\\"VerticalId\\":\\"External\\"}"}]}]}]' \\
  --compressed`)
  console.log(result)

})
