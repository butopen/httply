import { HttplyRequest } from "@butopen/httply-model";
import { CurlGenerator, CurlParser } from "../../src";
import {createTestScheduler} from "jest";
import {markAsUntransferable} from "worker_threads";

test("test curl generator 1: using curl generator bash ", async () => {
  const g = new CurlGenerator({target:"bash"});
  const h = new CurlParser();
  const result = g.generate(
    h.parse(`curl 'https://dday.imgix.net/system/uploads/video/screenshot/388/Il_mio_post_6_.png?ar=27%3A21&fit=crop&auto=format%2Ccompress&w=100&s=0993de70debecd580cf3da30a29b53ee' \
  -H 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="99"' \
  -H 'Referer: https://dday.it/' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36' \
  -H 'sec-ch-ua-platform: "Linux"' \
  --compressed`)
  );
  console.log(result);
  expect(result).toBe(`curl 'https://dday.imgix.net/system/uploads/video/screenshot/388/Il_mio_post_6_.png?ar=27%3A21&fit=crop&auto=format%2Ccompress&w=100&s=0993de70debecd580cf3da30a29b53ee' -H 'sec-ch-ua:" Not A;Brand";v="99", "Chromium";v="99"' -H 'Referer:https://dday.it/' -H 'sec-ch-ua-mobile:?0' -H 'User-Agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36' -H 'sec-ch-ua-platform:"Linux"'`);
});



test("test curl generator 2: using curl generator cmd ", async () => {
  const g = new CurlGenerator();
  const h = new CurlParser();
  const result = g.generate(
      h.parse(`curl 'https://dday.imgix.net/system/uploads/video/screenshot/388/Il_mio_post_6_.png?ar=27%3A21&fit=crop&auto=format%2Ccompress&w=100&s=0993de70debecd580cf3da30a29b53ee' \
  -H 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="99"' \
  -H 'Referer: https://dday.it/' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36' \
  -H 'sec-ch-ua-platform: "Linux"' \
  --compressed`)
  );
  console.log(result)
  expect(result.endsWith(`-H "sec-ch-ua-platform:^\\^"Linux^\\^""`)).toBe(true);
});

test("test double quote header value", async () => {
  const r: HttplyRequest = {
    url: "u",
    options: {
      headers: {
        test: `"x"`,
      },
      method: "GET",
    },
    timestamp: 1,
  };
  const responseCmd = new CurlGenerator().generate(r);
  const responseBash = new CurlGenerator({ target: "bash" }).generate(r);
  console.log("result cmd: ", responseCmd, "; result bash ", responseBash);
  expect(responseCmd).toBe(`curl "u" -H "test:^\\^"x^\\^""`);
  expect(responseBash).toBe(`curl 'u' -H 'test:"x"'`);
});

test("test curl generator 3 using curl cmd and generating bash curl request", async () => {
  const g = new CurlGenerator({ target: "bash" });
  const h = new CurlParser();
  const request  =`curl "https://github.com/commits/badges" ^
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
  --compressed`;
  console.log(request)
  const parsed = h.parse(request);
  console.log(parsed)
  const result = g.generate(parsed);
  console.log(result);
  expect(result.includes("-d")).toBe(true);
});


test("test curl generator 4: using curl cmd and generating cmd curl request", async () => {
  const g = new CurlGenerator();
  const h = new CurlParser();
  const request  =`curl "https://github.com/commits/badges" ^
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
  --compressed`;
   console.log(request)
  const parsed = h.parse(request);
  // console.log(parsed)
  const result = g.generate(parsed);
  console.log(result);
  expect(result.includes("-d")).toBe(true);
  expect(result).toBe('curl -X POST "https://github.com/commits/badges" -H "authority:github.com" -H "pragma:no-cache" -H "cache-control:no-cache" -H "sec-ch-ua:^\\^" Not A;Brand^\\^";v=^\\^"99^\\^", ^\\^"Chromium^\\^";v=^\\^"99^\\^", ^\\^"Google Chrome^\\^";v=^\\^"99^\\^"" -H "accept:application/json" -H "content-type:multipart/form-data; boundary=----WebKitFormBoundary7fLB1AQP6tPVjfA3" -H "x-requested-with:XMLHttpRequest" -H "sec-ch-ua-mobile:?0" -H "user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36" -H "sec-ch-ua-platform:^\\^"Windows^\\^"" -H "origin:https://github.com" -H "sec-fetch-site:same-origin" -H "sec-fetch-mode:cors" -H "sec-fetch-dest:empty" -H "referer:https://github.com/butopen/httply/pull/1" -H "accept-language:it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7" -H "cookie:_ga=GA1.2.1023485772.1597242645; tz=Europe^%^2FRome; tz=Europe^%^2FRome; color_mode=^%^7B^%^22color_mode^%^22^%^3A^%^22light^%^22^%^2C^%^22light_theme^%^22^%^3A^%^7B^%^22name^%^22^%^3A^%^22light^%^22^%^2C^%^22color_mode^%^22^%^3A^%^22light^%^22^%^7D^%^2C^%^22dark_theme^%^22^%^3A^%^7B^%^22name^%^22^%^3A^%^22dark^%^22^%^2C^%^22color_mode^%^22^%^3A^%^22dark^%^22^%^7D^%^7D; _octo=GH1.1.370418389.1628840940; _device_id=9dc7bbbfe9b52bb7e1ba9555b33ed4ae; user_session=bfdbvSFJN5cyRv-M9yfhWyAjsKpTUZ2QEKLQMWSUsXlrdyU8; __Host-user_session_same_site=bfdbvSFJN5cyRv-M9yfhWyAjsKpTUZ2QEKLQMWSUsXlrdyU8; logged_in=yes; dotcom_user=salvatoreromeo; has_recent_activity=1; _gh_sess=LHS^%^2FaoFo7tbbHnZ8giWXnJ7U4VDGLgy3obouKfAiHRo2SKiG^%^2FsyfSO^%^2FQKNo9yUD4tneoACJnwWMmciC^%^2FPlWOeXfXWaUVpkoaUJlxjQEACiyEC29l05aSAi68CFILRPZaWFM3VOVwiUc4VVP^%^2FQHyIWgO0ChzSZYIvyeQL0mjWgbmlMeN1zQIVei1xDc9KMXp6YR8NTyXO1x1IL^%^2BxMVeJZ^%^2F3WYT1eVURKmu2YCQUeZ7piZomvoKDjhDs^%^2FiEORrwymZ4OdDFhwCQAfZyuTxYJTq9CkRVvJ4mc1TWWq45gYc9rPCMwZ1C2c^%^2BuiXjmrk257QdSjQ7NtJTWnqwrjn0S2AVapBwBxB6iTFvz9HRzPh4V5iqEcVawMo5qKe71K8uxnP^%^2Fj6WJMYI350O0P8EsHufg62o^%^2FWqj2xGhdwO60tdn4yvIDl^%^2FGrLFCTn9RBaTzdi7v7omB4TR6oMY9rK09yVj6izNFPMsRqamSJzUJvddIgN53y1B^%^2BpIo^%^2FyEbg1E^%^2BICxOdY5w7oO0k^%^2FNFB7CjR3PFQfHWW1cojrNgZbthH7Q9Pwk2pmc3FbMPofc^%^2B^%^2FYpf7u0cY6zZU018l41mFZznzzIp1RNJYb7Go7BgGWBe7DUykuD8peedrH0aB^%^2F8OKzQ5tqUwcWIq1ukbApecx37nghTNHJ3dWLiyZYYlEyMK2ASi5zQF4rZsrl0AZRlJdKKHCxs8IKxCAagB5JlBMjhKbpyBRoUiBjrHFqVOOxR4JyxdI^%^2F2gK1r4y0Y4LNzcYIN2WR2vJPj7YbIfW1l4xJZZF^%^2BNDQPMQ^%^2FplABJxy^%^2BPXpnIoOSq7XiX5Ie^%^2FSl1q0HjWQEy9p7QapJGLIDhzp9HuCCqo2Ag5hs6JWvKEdoHsVAka5su160^%^2BlEeHpsDMcpLTY6X1^%^2BXuUobcpNQvlgy^%^2BBngXE1pfIOQAYsmpParbrd7Kwn7dH^%^2BooeTIGkz6l7vM7oP^%^2BGlxoshq8V22V^%^2FJ3Gq6dE^%^2BZuM051oUH0FlrMgSM2LaaUvuA86Fw9tbFTr0M98IWq8xsBddKQwjwWi8krHyBVJEcZGwLkyTGaGvk4J^%^2FzAX^%^2FV1^%^2FnO0PIFiWcGhu9ujB8uVbWNAkI3kk8vcQKB9ReGmP1IZ--kMrRwmsXUtyJWzBb--lKvrs^%^2F^%^2Bl3ZplrLQvEO5z4Q^%^3D^%^3D" -d "^\\^"------WebKitFormBoundary7fLB1AQP6tPVjfA3 Content-Disposition: form-data; name=^\\^"authenticity_token^\\^"  kTCf0rfKBb094ywiEz5KojQsdajmQRAiLFaAmLvcQIsUqJ_sSPsEaugBXz1NdmordyK21LAS-dK9DzI5aRqa8g ------WebKitFormBoundary7fLB1AQP6tPVjfA3 Content-Disposition: form-data; name=^\\^"items^[item-0^]^[id^]^\\^"  C_kwDOGygCzNoAKGU2YWI1NTk0ZGQ4YWJjNWVhMGYyMWFjNTFmNTExMGFmNWZmN2I5ODU ------WebKitFormBoundary7fLB1AQP6tPVjfA3 Content-Disposition: form-data; name=^\\^"items^[item-0^]^[badge_size^]^\\^"  small ------WebKitFormBoundary7fLB1AQP6tPVjfA3 Content-Disposition: form-data; name=^\\^"items^[item-0^]^[dropdown_direction^]^\\^"  s ------WebKitFormBoundary7fLB1AQP6tPVjfA3 Content-Disposition: form-data; name=^\\^"items^[item-1^]^[id^]^\\^"  C_kwDOGygCzNoAKGI1YmMxYTdmNTI2YWJlZGY1NGMzYWIwY2I4NGY4OWFmZDU4MjFkYjI ------WebKitFormBoundary7fLB1AQP6tPVjfA3 Content-Disposition: form-data; name=^\\^"items^[item-1^]^[badge_size^]^\\^"  small ------WebKitFormBoundary7fLB1AQP6tPVjfA3 Content-Disposition: form-data; name=^\\^"items^[item-1^]^[dropdown_direction^]^\\^"  s ------WebKitFormBoundary7fLB1AQP6tPVjfA3-- "');
});


test("test curl generator 5: POST reuqest with body", async () => {
  const parsed = new CurlParser().parse(`
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
  const result = new CurlGenerator().generate(parsed);
  console.log(result)
  expect(result).toBe('curl -X POST "https://us6ikryakb-dsn.algolia.net/1/indexes/prod_c_900_categories/query?x-algolia-agent=Algolia%20for%20JavaScript%20(4.12.0)%3B%20Browser%20(lite)%3B%20instantsearch.js%20(4.37.2)%3B%20Vue%20(2.6.14)%3B%20Vue%20InstantSearch%20(3.8.1)%3B%20JS%20Helper%20(3.7.0)&x-algolia-api-key=2ec513d5d96ad975110cc68022f3627f&x-algolia-application-id=US6IKRYAKB" -H "Connection:keep-alive" -H "Pragma:no-cache" -H "Cache-Control:no-cache" -H "sec-ch-ua:^\\^" Not A;Brand^\\^";v=^\\^"99^\\^", ^\\^"Chromium^\\^";v=^\\^"99^\\^", ^\\^"Google Chrome^\\^";v=^\\^"99^\\^"" -H "sec-ch-ua-mobile:?0" -H "User-Agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36" -H "sec-ch-ua-platform:^\\^"Windows^\\^"" -H "content-type:application/x-www-form-urlencoded" -H "Accept:*/*" -H "Origin:https://www.easycoop.com" -H "Sec-Fetch-Site:cross-site" -H "Sec-Fetch-Mode:cors" -H "Sec-Fetch-Dest:empty" -H "Accept-Language:it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7" -d "^{^\\^"query^\\^":^\\^"^\\^",^\\^"attributesToRetrieve^\\^":^[^\\^"name^\\^",^\\^"url^\\^",^\\^"level^\\^"^],^\\^"facetFilters^\\^":^[^[^\\^"path:pasta, pane e farine^\\^"^]^]^}"');
});


test("simple check", async ()=>{
  const parsed = new CurlParser().parse(`curl "https://www.google.com/search?q=ciao&oq=ciao&aqs=chrome.0.69i59j46i433i512j0i131i433i512j0i433i512j0i131i433i512j0i433i512j46i512j69i60.510j0j7&sourceid=chrome&ie=UTF-8" ^
  -H "authority: www.google.com" ^
  -H "accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9" ^
  -H "accept-language: it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7" ^
  -H "cookie: CONSENT=YES+IT.it+20151206-18-0; OGPC=19025836-3:; HSID=A3V-YISS23MGEOYGr; SSID=Ajwso7jRU0h0E50ZJ; APISID=d16i3u_iw9sSl7NJ/AB1pF4Q1ZlQmczY1q; SAPISID=NVzsRI7GbbdML1nL/AUOPOzGVwSwPqJkHp; __Secure-1PAPISID=NVzsRI7GbbdML1nL/AUOPOzGVwSwPqJkHp; __Secure-3PAPISID=NVzsRI7GbbdML1nL/AUOPOzGVwSwPqJkHp; SEARCH_SAMESITE=CgQI_JQB; SID=IghRhX8xF4Z9CkWGZi32imreTqLh8iLtroeZ0miQS4XWHCpVG1kZtG2_k2WHU3Sj_tjiAg.; __Secure-1PSID=IghRhX8xF4Z9CkWGZi32imreTqLh8iLtroeZ0miQS4XWHCpVLIOdCFtScuIzf9q-YLDeeQ.; __Secure-3PSID=IghRhX8xF4Z9CkWGZi32imreTqLh8iLtroeZ0miQS4XWHCpVUuJG-JKKslEKJZHXDRv8RQ.; NID=511=sCm7XBCMsd8FDpAxovRT4MNj5zw-6cvu70yxnDJHieXoobEO2CDDHcqRelAvHT4tsKIbQPuFENAeyNlsvE4bG-pfzgiP3hhBiqysbghe9hA87zFJ0qO96aY60dhPKssKtaTVLWLEJUV4BSjsGa7yurqzlhB5tu0Jw3yXbUIZ4MyZDwNrnlkRHXgOBgWt9_L5fuL91KRpgua3zzSv-RmgyMUUbSsyAEw-QImbRTx2T_Cu_DS6lRXUGdg4jFRp-8zaeDU9Wk3FlV2HMK6XfybvRUPGtoFWDwutxcM23WCZxLpIedwHIJKpJ8hRS96r_MdZcMX7b0eXs2hLK03trQv3YBXWRNqH; 1P_JAR=2022-04-06-12; AEC=AVQQ_LB2fKOMgke91-laXougRfpuDtIL20KmG4aOPS2QBB-Gfi3g5op_VTA; DV=YzTUyRVAC_tUIBy4P1MyROvAzfHu_1fs8hEqnbr1iAEAAAAifm2YC1-evQAAACiFq6AsToMGNAAAAFqMijrty6F2DgAAAA; SIDCC=AJi4QfEGogzFESZwF9OARBOntcSBZjXmAfWCIWELYmkqj8mKPHE6TrGZetycnVqHd2MhFFov92g; __Secure-3PSIDCC=AJi4QfEUUtkstZiZ7rPt6I3Xbl2LJSENub_Q1b7kSM-xhj9QgQ55JFr5cVXI-jkITqefCjFIoLI" ^
  -H "dnt: 1" ^
  -H "sec-ch-ua: ^\^" Not A;Brand^\^";v=^\^"99^\^", ^\^"Chromium^\^";v=^\^"100^\^", ^\^"Google Chrome^\^";v=^\^"100^\^"" ^
  -H "sec-ch-ua-arch: ^\^"x86^\^"" ^
  -H "sec-ch-ua-bitness: ^\^"64^\^"" ^
  -H "sec-ch-ua-full-version: ^\^"100.0.4896.60^\^"" ^
  -H "sec-ch-ua-mobile: ?0" ^
  -H "sec-ch-ua-model: ^\^"^\^"" ^
  -H "sec-ch-ua-platform: ^\^"Windows^\^"" ^
  -H "sec-ch-ua-platform-version: ^\^"10.0.0^\^"" ^
  -H "sec-fetch-dest: document" ^
  -H "sec-fetch-mode: navigate" ^
  -H "sec-fetch-site: none" ^
  -H "sec-fetch-user: ?1" ^
  -H "upgrade-insecure-requests: 1" ^
  -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36" ^
  -H "x-client-data: CKm1yQEIhLbJAQiktskBCMS2yQEIqZ3KAQiQ0soBCM2NywEIkqHLAQjr8ssBCJ75ywEI5oTMAQiljswBCP6czAEIz6LMAQj0oswBCLGkzAEYranKAQ==" ^
  --compressed`)

  console.log(new CurlGenerator().generate(parsed))
// same result!
});



