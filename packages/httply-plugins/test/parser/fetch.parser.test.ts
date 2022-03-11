import { FetchParser } from "../../src";

test("test http link", async () => {
  const h = new FetchParser();
  const result = h.parse("fetch('http://ciao')");
  expect(result.url).toBe("http://ciao");
  expect(result.options.method).toBe("GET");
});

test("test apply to http", async () => {
  const h = new FetchParser();
  expect(h.canApply("https://ciao")).toBeFalsy();
});
