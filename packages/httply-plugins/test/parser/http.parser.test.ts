import { HttpParser } from "../../src";

test("test http link", async () => {
  const h = new HttpParser();
  const result = h.parse("http://ciao");
  expect(result.url).toBe("http://ciao");
});

test("test https link", async () => {
  const h = new HttpParser();
  const result = h.parse("https://ciao");
  expect(result.url).toBe("https://ciao");
});

test("test apply to fetch", async () => {
  const h = new HttpParser();
  expect(h.canApply("fetch('https://ciao')")).toBeFalsy();
});
