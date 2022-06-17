import { requestHash } from '../../src/requests/requests.functions'
test("095c91f704e572d117be41fabc2d484c40f9d74d-3306ad230df91cefd4b4f895f1a970a8398387f26efbb87f87fb06755cfa1b6c9e0b5b691a8f58ff760fc0f4eba5d6245dcf43a19919eda720b3f6f7a9f8b2f8", async () => {
 expect(requestHash({"url":"https://httpbin.org/anything","options":{"method":"GET"},"timestamp":1655385854708})).toBe("3306ad230df91cefd4b4f895f1a970a8398387f26efbb87f87fb06755cfa1b6c9e0b5b691a8f58ff760fc0f4eba5d6245dcf43a19919eda720b3f6f7a9f8b2f8")
})
test("8fe35ba881531113362b409a335b351b24151829-ea5f07fdb3b56dd6b721f4319dc95bb469f03d40a79654cda425737fbd98e3a6f3109db9744c8ea259aaf8eebf1af4fa02b29ff45dd4b87d0d5076241c2e18f2", async () => {
 expect(requestHash({"url":"https://httpbin.org/ip","options":{"method":"GET"},"timestamp":1655386144209})).toBe("ea5f07fdb3b56dd6b721f4319dc95bb469f03d40a79654cda425737fbd98e3a6f3109db9744c8ea259aaf8eebf1af4fa02b29ff45dd4b87d0d5076241c2e18f2")
})
test("e0062a0fcc2617a55837dc1c31c798afa1e670b3-832f70c1fec09e6921f88d1d4ca52982fe0730c33bdf6e06c1a0082560e5b5b123f7da10200f452e2de6a8ff38492700fb6788acb23c8060dffabc736a65cc4a", async () => {
 expect(requestHash({"url":"https://httpbin.org/headers","options":{"method":"GET"},"timestamp":1655386166379})).toBe("832f70c1fec09e6921f88d1d4ca52982fe0730c33bdf6e06c1a0082560e5b5b123f7da10200f452e2de6a8ff38492700fb6788acb23c8060dffabc736a65cc4a")
})
test("15d67358dfcc34fce576d985a97d1f44d6c57d37-ccf69bd985c9842eef8242f78ccd62b727b597cb840579b38500f557bb114221d3cbfac7bed6dfbd840365b6e9d7add6286e7377f81366591e347908ea1ea552", async () => {
 expect(requestHash({"url":"https://httpbin.org/user-agent","options":{"method":"GET"},"timestamp":1655386195240})).toBe("ccf69bd985c9842eef8242f78ccd62b727b597cb840579b38500f557bb114221d3cbfac7bed6dfbd840365b6e9d7add6286e7377f81366591e347908ea1ea552")
})
