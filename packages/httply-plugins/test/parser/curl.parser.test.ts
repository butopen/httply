import { CurlParser } from "../../src";

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


test("complex curl cmd with correct syntax", async () =>{
    const request = `
       curl "https://www.bing.com/web/xls.aspx" ^
      -H "authority: www.bing.com" ^
      -H "sec-ch-ua: ^^" Not A;Brand^^";v=^^"99^^", ^^"Chromium^^";v=^^"99^^", ^^"Microsoft Edge^^";v=^^"99^^"" ^
      -H "sec-ch-ua-bitness: ^^"64^^"" ^
      -H "dnt: 1" ^
      -H "sec-ch-ua-mobile: ?0" ^
      -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36 Edg/99.0.1150.52" ^
      -H "sec-ch-ua-arch: ^^"x86^^"" ^
      -H "sec-ch-ua-full-version: ^^"99.0.1150.52^^"" ^
      -H "sec-ch-ua-platform-version: ^^"10.0.0^^"" ^
      -H "x-msedge-externalexptype: JointCoord" ^
      -H "x-msedge-externalexp: null" ^
      -H "content-type: text/xml" ^
      -H "sec-ch-ua-model: " ^
      -H "sec-ch-ua-platform: ^^"Windows^^"" ^
      -H "accept: */*" ^
      -H "origin: https://www.bing.com" ^
      -H "sec-fetch-site: same-origin" ^
      -H "sec-fetch-mode: cors" ^
      -H "sec-fetch-dest: empty" ^
      -H "referer: https://www.bing.com/search?q=ciao&form=QBLH&sp=-1&pq=ciao&sc=7-4&qs=n&sk=&cvid=40C4C6EFCD9B4702884398CE10C147EE" ^
      -H "accept-language: it,it-IT;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6" ^
      -H "cookie: MUID=02F0910FA00161822466807AA1366013; MUIDB=02F0910FA00161822466807AA1366013; _EDGE_V=1; SRCHD=AF=NOFORM; SRCHUID=V=2&GUID=8718C8D73C2A4FA3A19DCBC58D64D5B8&dmnchg=1; WLS=C=fd07549518d5219d&N=Andrea; _U=1yTlbQZqJw52p5KiZPYq8girHpap4t79OSt6b5HZkvM2q1AoQZXODDD1lesZoGsFROHVakzi8cweYR61ssR_WVH-ThgFzdo0rzqvqS1NuETiSlTpMA2UjFGZIvSFCT7p1MrDNwL9Oru8hF6r-3Sse4Gj9dUHwXPjIwBhfteBnMXYeJ2RKf4kKVFE-xAfgzJzjiTrXdUeKkhTdKajFjQJ3Iw; ANON=A=FEFF1AFCD4427930FFD03498FFFFFFFF; BCP=AD=1&AL=1&SM=1&CS=M; SUID=A; _EDGE_S=F=1&SID=14F5953E5AF56E301C24844B5BC26F51&mkt=it-it; USRLOC=; _HPVN=CS=eyJQbiI6eyJDbiI6MSwiU3QiOjAsIlFzIjowLCJQcm9kIjoiUCJ9LCJTYyI6eyJDbiI6MSwiU3QiOjAsIlFzIjowLCJQcm9kIjoiSCJ9LCJReiI6eyJDbiI6MSwiU3QiOjAsIlFzIjowLCJQcm9kIjoiVCJ9LCJBcCI6dHJ1ZSwiTXV0ZSI6dHJ1ZSwiTGFkIjoiMjAyMi0wMy0yOFQwMDowMDowMFoiLCJJb3RkIjowLCJHd2IiOjAsIkRmdCI6bnVsbCwiTXZzIjowLCJGbHQiOjAsIkltcCI6Mn0=; SRCHUSR=DOB=20220328&T=1648471489000; ipv6=hit=1648467891043&t=4; BFBUSR=BAWAS=1&BAWFS=1; BFB=AhAS-tPokHj0FYwlh1CtTHkMKdfie0b3qZDBNOr19hz6T_CclOe7H3YIGaX6tFzrNYUh8juGzPCZVPCplHWsRNKmPQwuM24kdTsF6RowaNzqqefzhnUwFIjjdLoZvDHzbJqtIAcsGgoVrrWwGaUL1Kpd9TjnbczU_pyd410ZdU1JfA; OID=AhDYzS80AaITg9UbT5Y-GZ687ZZetqInv75kNbepLCzUHC7xdPE401YyzQGRoPRUb_lfSyMw9efKjWle8HNuQZZ1; OIDI=AhAr95lyQ1QUkWeqjOWUPM8WdzdSDhP-hImQn5KoBuJC8w; _RwBf=mta=0&rc=685&rb=685&gb=0&rg=5000&pc=682&mtu=0&rbb=0&g=0&cid=&clo=0&v=2&l=2022-03-28T07:00:00.0000000Z&lft=00010101&aof=0&o=0&p=MULTIWSBACQ201910&c=MY019H&t=5398&s=2020-04-18T12:33:10.3235331+00:00&ts=2022-03-28T12:44:53.6476406+00:00&rwred=0&e=DNy7duj8XL-hqiVq1AP_9yaIR77f8Y5nDzgwWi4PLqY8HUqieYe-Yu_A7V_HWbbW1oeP8G0O-XKq4Ldzso7rFzO3skkmt3n0sdAc6gQ_N7k; _SS=SID=14F5953E5AF56E301C24844B5BC26F51&R=685&RB=685&GB=0&RG=5000&RP=682; dsc=order=News; SRCHHPGUSR=SRCHLANG=it&BRW=N&BRH=M&CW=1206&CH=828&SW=1746&SH=982&DPR=1.100000023841858&UTC=120&DM=1&HV=1648464294&EXLTT=1" ^
      --data-raw "^<ClientInstRequest^>^<CID^>02F0910FA00161822466807AA1366013^</CID^>^<Events^>^<E^>^<T^>Event.ClientInst^</T^>^<IG^>30782D535F4047F59DA8579E0C903BD8^</IG^>^<D^>^<^!^[CDATA^[^{^^"width^^":^^"1206^^",^^"T^^":^^"CI.Info^^",^^"TS^^":1648464297179,^^"RTS^^":4383,^^"SEQ^^":23,^^"Name^^":^^"N^^",^^"FID^^":^^"BRW^^",^^"CurUrl^^":^^"https://www.bing.com/search^^",^^"UTS^^":1648464299179^}^]^]^>^</D^>^<TS^>1648464292796^</TS^>^</E^>^<E^>^<T^>Event.ClientInst^</T^>^<IG^>30782D535F4047F59DA8579E0C903BD8^</IG^>^<D^>^<^!^[CDATA^[^{^^"height^^":^^"828^^",^^"T^^":^^"CI.Info^^",^^"TS^^":1648464297184,^^"RTS^^":4388,^^"SEQ^^":24,^^"Name^^":^^"M^^",^^"FID^^":^^"BRH^^",^^"CurUrl^^":^^"https://www.bing.com/search^^",^^"UTS^^":1648464299179^}^]^]^>^</D^>^<TS^>1648464292796^</TS^>^</E^>^<E^>^<T^>Event.ClientInst^</T^>^<IG^>30782D535F4047F59DA8579E0C903BD8^</IG^>^<D^>^<^!^[CDATA^[^{^^"T^^":^^"CI.Info^^",^^"TS^^":1648464297190,^^"RTS^^":4394,^^"SEQ^^":25,^^"Name^^":^^"W^^",^^"FID^^":^^"BRResize^^",^^"CurUrl^^":^^"https://www.bing.com/search^^",^^"UTS^^":1648464299179^}^]^]^>^</D^>^<TS^>1648464292796^</TS^>^</E^>^<E^>^<T^>Event.ClientInst^</T^>^<IG^>30782D535F4047F59DA8579E0C903BD8^</IG^>^<D^>^<^!^[CDATA^[^{^^"T^^":^^"CI.Info^^",^^"TS^^":1648464297192,^^"RTS^^":4396,^^"SEQ^^":26,^^"Name^^":^^"WN^^",^^"FID^^":^^"TPResize^^",^^"CurUrl^^":^^"https://www.bing.com/search^^",^^"UTS^^":1648464299179^}^]^]^>^</D^>^<TS^>1648464292796^</TS^>^</E^>^<E^>^<T^>Event.ClientInst^</T^>^<IG^>30782D535F4047F59DA8579E0C903BD8^</IG^>^<D^>^<^!^[CDATA^[^{^^"BFB_EXT^^":^^"0^^",^^"BFB_T^^":^^"DIS^^",^^"BFB_S^^":^^"UNSP^^",^^"BFB_SC^^":^^"UserNotification^^",^^"T^^":^^"CI.DHTMLClick^^",^^"TS^^":1648464298849,^^"RTS^^":6053,^^"SEQ^^":27,^^"Name^^":^^"BAW^^",^^"FID^^":^^"BfbClick^^",^^"CurUrl^^":^^"https://www.bing.com/search^^",^^"UTS^^":1648464299179^}^]^]^>^</D^>^<TS^>1648464292796^</TS^>^</E^>^</Events^>^</ClientInstRequest^>" ^
      --compressed`;
    const result = new CurlParser().parse(request);
    console.log(result)
    expect(result.options.headers!["sec-ch-ua"]).toBe('\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Microsoft Edge\";v=\"99\"');

});



test("complex curl bash with correct syntax", async () =>{
    const request = `curl 'https://www.bing.com/web/xls.aspx' \
    -H 'authority: www.bing.com' \
    -H 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="99", "Microsoft Edge";v="99"' \
    -H 'sec-ch-ua-bitness: "64"' \
    -H 'dnt: 1' \
    -H 'sec-ch-ua-mobile: ?0' \
    -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36 Edg/99.0.1150.52' \
    -H 'sec-ch-ua-arch: "x86"' \
    -H 'sec-ch-ua-full-version: "99.0.1150.52"' \
    -H 'sec-ch-ua-platform-version: "10.0.0"' \
    -H 'x-msedge-externalexptype: JointCoord' \
    -H 'x-msedge-externalexp: null' \
    -H 'content-type: text/xml' \
    -H 'sec-ch-ua-model: ' \
    -H 'sec-ch-ua-platform: "Windows"' \
    -H 'accept: */*' \
    -H 'origin: https://www.bing.com' \
      -H 'sec-fetch-site: same-origin' \
    -H 'sec-fetch-mode: cors' \
    -H 'sec-fetch-dest: empty' \
    -H 'referer: https://www.bing.com/search?q=ciao&form=QBLH&sp=-1&pq=ciao&sc=7-4&qs=n&sk=&cvid=40C4C6EFCD9B4702884398CE10C147EE' \
    -H 'accept-language: it,it-IT;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6' \
    -H 'cookie: MUID=02F0910FA00161822466807AA1366013; MUIDB=02F0910FA00161822466807AA1366013; _EDGE_V=1; SRCHD=AF=NOFORM; SRCHUID=V=2&GUID=8718C8D73C2A4FA3A19DCBC58D64D5B8&dmnchg=1; WLS=C=fd07549518d5219d&N=Andrea; _U=1yTlbQZqJw52p5KiZPYq8girHpap4t79OSt6b5HZkvM2q1AoQZXODDD1lesZoGsFROHVakzi8cweYR61ssR_WVH-ThgFzdo0rzqvqS1NuETiSlTpMA2UjFGZIvSFCT7p1MrDNwL9Oru8hF6r-3Sse4Gj9dUHwXPjIwBhfteBnMXYeJ2RKf4kKVFE-xAfgzJzjiTrXdUeKkhTdKajFjQJ3Iw; ANON=A=FEFF1AFCD4427930FFD03498FFFFFFFF; BCP=AD=1&AL=1&SM=1&CS=M; SUID=A; _EDGE_S=F=1&SID=14F5953E5AF56E301C24844B5BC26F51&mkt=it-it; USRLOC=; _HPVN=CS=eyJQbiI6eyJDbiI6MSwiU3QiOjAsIlFzIjowLCJQcm9kIjoiUCJ9LCJTYyI6eyJDbiI6MSwiU3QiOjAsIlFzIjowLCJQcm9kIjoiSCJ9LCJReiI6eyJDbiI6MSwiU3QiOjAsIlFzIjowLCJQcm9kIjoiVCJ9LCJBcCI6dHJ1ZSwiTXV0ZSI6dHJ1ZSwiTGFkIjoiMjAyMi0wMy0yOFQwMDowMDowMFoiLCJJb3RkIjowLCJHd2IiOjAsIkRmdCI6bnVsbCwiTXZzIjowLCJGbHQiOjAsIkltcCI6Mn0=; SRCHUSR=DOB=20220328&T=1648471489000; ipv6=hit=1648467891043&t=4; BFBUSR=BAWAS=1&BAWFS=1; BFB=AhAS-tPokHj0FYwlh1CtTHkMKdfie0b3qZDBNOr19hz6T_CclOe7H3YIGaX6tFzrNYUh8juGzPCZVPCplHWsRNKmPQwuM24kdTsF6RowaNzqqefzhnUwFIjjdLoZvDHzbJqtIAcsGgoVrrWwGaUL1Kpd9TjnbczU_pyd410ZdU1JfA; OID=AhDYzS80AaITg9UbT5Y-GZ687ZZetqInv75kNbepLCzUHC7xdPE401YyzQGRoPRUb_lfSyMw9efKjWle8HNuQZZ1; OIDI=AhAr95lyQ1QUkWeqjOWUPM8WdzdSDhP-hImQn5KoBuJC8w; _RwBf=mta=0&rc=685&rb=685&gb=0&rg=5000&pc=682&mtu=0&rbb=0&g=0&cid=&clo=0&v=2&l=2022-03-28T07:00:00.0000000Z&lft=00010101&aof=0&o=0&p=MULTIWSBACQ201910&c=MY019H&t=5398&s=2020-04-18T12:33:10.3235331+00:00&ts=2022-03-28T12:44:53.6476406+00:00&rwred=0&e=DNy7duj8XL-hqiVq1AP_9yaIR77f8Y5nDzgwWi4PLqY8HUqieYe-Yu_A7V_HWbbW1oeP8G0O-XKq4Ldzso7rFzO3skkmt3n0sdAc6gQ_N7k; _SS=SID=14F5953E5AF56E301C24844B5BC26F51&R=685&RB=685&GB=0&RG=5000&RP=682; dsc=order=News; SRCHHPGUSR=SRCHLANG=it&BRW=N&BRH=M&CW=1206&CH=828&SW=1746&SH=982&DPR=1.100000023841858&UTC=120&DM=1&HV=1648464294&EXLTT=1' \
    --data-raw $'<ClientInstRequest><CID>02F0910FA00161822466807AA1366013</CID><Events><E><T>Event.ClientInst</T><IG>30782D535F4047F59DA8579E0C903BD8</IG><D><\u0021[CDATA[{"width":"1206","T":"CI.Info","TS":1648464297179,"RTS":4383,"SEQ":23,"Name":"N","FID":"BRW","CurUrl":"https://www.bing.com/search","UTS":1648464299179}]]></D><TS>1648464292796</TS></E><E><T>Event.ClientInst</T><IG>30782D535F4047F59DA8579E0C903BD8</IG><D><\u0021[CDATA[{"height":"828","T":"CI.Info","TS":1648464297184,"RTS":4388,"SEQ":24,"Name":"M","FID":"BRH","CurUrl":"https://www.bing.com/search","UTS":1648464299179}]]></D><TS>1648464292796</TS></E><E><T>Event.ClientInst</T><IG>30782D535F4047F59DA8579E0C903BD8</IG><D><\u0021[CDATA[{"T":"CI.Info","TS":1648464297190,"RTS":4394,"SEQ":25,"Name":"W","FID":"BRResize","CurUrl":"https://www.bing.com/search","UTS":1648464299179}]]></D><TS>1648464292796</TS></E><E><T>Event.ClientInst</T><IG>30782D535F4047F59DA8579E0C903BD8</IG><D><\u0021[CDATA[{"T":"CI.Info","TS":1648464297192,"RTS":4396,"SEQ":26,"Name":"WN","FID":"TPResize","CurUrl":"https://www.bing.com/search","UTS":1648464299179}]]></D><TS>1648464292796</TS></E><E><T>Event.ClientInst</T><IG>30782D535F4047F59DA8579E0C903BD8</IG><D><\u0021[CDATA[{"BFB_EXT":"0","BFB_T":"DIS","BFB_S":"UNSP","BFB_SC":"UserNotification","T":"CI.DHTMLClick","TS":1648464298849,"RTS":6053,"SEQ":27,"Name":"BAW","FID":"BfbClick","CurUrl":"https://www.bing.com/search","UTS":1648464299179}]]></D><TS>1648464292796</TS></E></Events></ClientInstRequest>' \
    --compressed` ;
    const result = new CurlParser().parse(request);
    expect(result.options.headers!["sec-ch-ua"]).toBe('\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Microsoft Edge\";v=\"99\"');

});

