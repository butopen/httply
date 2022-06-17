import {RequestsService} from '../../src/requests/requests.service'
import {createMockProxy} from "./mock.utils";

  test("test1", async () => {

    const db = createMockProxy<any>()
    db.query.mockReturnValue(Promise.resolve([{
      "hash": "5c835c7f41c69fc42f2827ec16508f0e36a38bd1d5cc488abb49a54521df9d57a9253dc564f63808845c91b9926344e30e66d26e72f592e5ababcce1297a6cbb",
      "path": "/search/shows",
      "domain": null,
      "method": "GET",
      "content": {
        "url": "https://api.tvmaze.com/search/shows?q=billions",
        "options": {"method": "GET"},
        "timestamp": 1646907220527
      },
      "created": "2022-03-10T10:13:44.202Z",
      "requestid": "29"
    }]))

    expect(await new RequestsService(db).findByHash("5c835c7f41c69fc42f2827ec16508f0e36a38bd1d5cc488abb49a54521df9d57a9253dc564f63808845c91b9926344e30e66d26e72f592e5ababcce1297a6cbb")).toStrictEqual({
      "hash": "5c835c7f41c69fc42f2827ec16508f0e36a38bd1d5cc488abb49a54521df9d57a9253dc564f63808845c91b9926344e30e66d26e72f592e5ababcce1297a6cbb",
      "path": "/search/shows",
      "domain": null,
      "method": "GET",
      "content": {
        "url": "https://api.tvmaze.com/search/shows?q=billions",
        "options": {"method": "GET"},
        "timestamp": 1646907220527
      },
      "created": "2022-03-10T10:13:44.202Z",
      "requestid": "29"
    })
  })






















  test("5c835c7f41c69fc42f2827ec16508f0e36a38bd1d5cc488abb49a54521df9d57a9253dc564f63808845c91b9926344e30e66d26e72f592e5ababcce1297a6cbb-d7bf0d56c8c01fd41d45dd8deff267cccb98ce22", async () => {
    const db = createMockProxy<any>()
    db.query.mockReturnValue(Promise.resolve([{
      "hash": "5c835c7f41c69fc42f2827ec16508f0e36a38bd1d5cc488abb49a54521df9d57a9253dc564f63808845c91b9926344e30e66d26e72f592e5ababcce1297a6cbb",
      "path": "/search/shows",
      "domain": null,
      "method": "GET",
      "content": {
        "url": "https://api.tvmaze.com/search/shows?q=billions",
        "options": {"method": "GET"},
        "timestamp": 1646907220527
      },
      "created": "2022-03-10T10:13:44.202Z",
      "requestid": "29"
    }]))
    expect(await new RequestsService(db).findByHash("5c835c7f41c69fc42f2827ec16508f0e36a38bd1d5cc488abb49a54521df9d57a9253dc564f63808845c91b9926344e30e66d26e72f592e5ababcce1297a6cbb")).toStrictEqual({
      "hash": "5c835c7f41c69fc42f2827ec16508f0e36a38bd1d5cc488abb49a54521df9d57a9253dc564f63808845c91b9926344e30e66d26e72f592e5ababcce1297a6cbb",
      "path": "/search/shows",
      "domain": null,
      "method": "GET",
      "content": {
        "url": "https://api.tvmaze.com/search/shows?q=billions",
        "options": {"method": "GET"},
        "timestamp": 1646907220527
      },
      "created": "2022-03-10T10:13:44.202Z",
      "requestid": "29"
    })
  })
  test("5c835c7f41c69fc42f2827ec16508f0e36a38bd1d5cc488abb49a54521df9d57a9253dc564f63808845c91b9926344e30e66d26e72f592e5ababcce1297a6cbb-d7bf0d56c8c01fd41d45dd8deff267cccb98ce22", async () => {
    const db = createMockProxy<any>()
    db.query.mockReturnValue(Promise.resolve([{
      "hash": "5c835c7f41c69fc42f2827ec16508f0e36a38bd1d5cc488abb49a54521df9d57a9253dc564f63808845c91b9926344e30e66d26e72f592e5ababcce1297a6cbb",
      "path": "/search/shows",
      "domain": null,
      "method": "GET",
      "content": {
        "url": "https://api.tvmaze.com/search/shows?q=billions",
        "options": {"method": "GET"},
        "timestamp": 1646907220527
      },
      "created": "2022-03-10T10:13:44.202Z",
      "requestid": "29"
    }]))
    expect(await new RequestsService(db).findByHash("5c835c7f41c69fc42f2827ec16508f0e36a38bd1d5cc488abb49a54521df9d57a9253dc564f63808845c91b9926344e30e66d26e72f592e5ababcce1297a6cbb")).toStrictEqual({
      "hash": "5c835c7f41c69fc42f2827ec16508f0e36a38bd1d5cc488abb49a54521df9d57a9253dc564f63808845c91b9926344e30e66d26e72f592e5ababcce1297a6cbb",
      "path": "/search/shows",
      "domain": null,
      "method": "GET",
      "content": {
        "url": "https://api.tvmaze.com/search/shows?q=billions",
        "options": {"method": "GET"},
        "timestamp": 1646907220527
      },
      "created": "2022-03-10T10:13:44.202Z",
      "requestid": "29"
    })
  })
  test("180d6e4f0749caba421bee2c5f91fa18b87955b920cfbe64cdbad9563af5a01b2b46a9e3ac0411c489d11c84b6ceafd9e9f4330620168e73b8a7ed62552662ff-undefined", async () => {
    const db = createMockProxy<any>()
    db.query.mockReturnValue(Promise.resolve([]))
    expect(await new RequestsService(db).findByHash("180d6e4f0749caba421bee2c5f91fa18b87955b920cfbe64cdbad9563af5a01b2b46a9e3ac0411c489d11c84b6ceafd9e9f4330620168e73b8a7ed62552662ff")).toStrictEqual(undefined)
  })
  test("6967a654d5d1b5b3b947be03d95cacfd07b7595df6b62b3f2004268836deecab25c1fcd47d2adf59f4b4388a41a04f729ce5d89d850c768f8339ba3c75a8d308-undefined", async () => {
    const db = createMockProxy<any>()
    db.query.mockReturnValue(Promise.resolve([]))
    expect(await new RequestsService(db).findByHash("6967a654d5d1b5b3b947be03d95cacfd07b7595df6b62b3f2004268836deecab25c1fcd47d2adf59f4b4388a41a04f729ce5d89d850c768f8339ba3c75a8d308")).toStrictEqual(undefined)
  })
  test("9ad1395a5194ddd2df676e8f794525d54319f4d449da213cf5687112d0aa27fdd88d30d15c903df2636f691326cfd9e41175b2f50ec80dd587688544e23133cf-undefined", async () => {
    const db = createMockProxy<any>()
    db.query.mockReturnValue(Promise.resolve([]))
    expect(await new RequestsService(db).findByHash("9ad1395a5194ddd2df676e8f794525d54319f4d449da213cf5687112d0aa27fdd88d30d15c903df2636f691326cfd9e41175b2f50ec80dd587688544e23133cf")).toStrictEqual(undefined)
  })
  test("6f9bd5845465168a50af2dd5e8c473c6d9a9d2d632eea34260525950b535faca63d0c96725cdf00ff66cf52db59d61cb0b8c04c10b44eaf008eaa4cb232024f6-undefined", async () => {
    const db = createMockProxy<any>()
    db.query.mockReturnValue(Promise.resolve([]))
    expect(await new RequestsService(db).findByHash("6f9bd5845465168a50af2dd5e8c473c6d9a9d2d632eea34260525950b535faca63d0c96725cdf00ff66cf52db59d61cb0b8c04c10b44eaf008eaa4cb232024f6")).toStrictEqual(undefined)
  })
  test("eb444bae6d3e2e7ccd10243a757c078f6d5d0e5149861d325e65d4c8a446f73909bc4cc647204844c4a541b5530227ef284421c3f97ff0359fcca0697a02f2d1-undefined", async () => {
    const db = createMockProxy<any>()
    db.query.mockReturnValue(Promise.resolve([]))
    expect(await new RequestsService(db).findByHash("eb444bae6d3e2e7ccd10243a757c078f6d5d0e5149861d325e65d4c8a446f73909bc4cc647204844c4a541b5530227ef284421c3f97ff0359fcca0697a02f2d1")).toStrictEqual(undefined)
  })
  test("98030088c7532c6c8b8a23c47af7ea0e184ef6b8c15c7322a594eae5b782e51a936ebfb127a6a414ea9d62798c7c0ce608c00b44ef21d04c24bb7793cb18a836-undefined", async () => {
    const db = createMockProxy<any>()
    db.query.mockReturnValue(Promise.resolve([]))
    expect(await new RequestsService(db).findByHash("98030088c7532c6c8b8a23c47af7ea0e184ef6b8c15c7322a594eae5b782e51a936ebfb127a6a414ea9d62798c7c0ce608c00b44ef21d04c24bb7793cb18a836")).toStrictEqual(undefined)
  })
  test("edacf1302e6ffb506d942d2ebbdd1db269ec8126e9045fe5390796ff096abdb45308c322e1bb91536545f50b61afe08ad7f46225e54b4815d652125936cf5d89-undefined", async () => {
    const db = createMockProxy<any>()
    db.query.mockReturnValue(Promise.resolve([]))
    expect(await new RequestsService(db).findByHash("edacf1302e6ffb506d942d2ebbdd1db269ec8126e9045fe5390796ff096abdb45308c322e1bb91536545f50b61afe08ad7f46225e54b4815d652125936cf5d89")).toStrictEqual(undefined)
  })
  test("edacf1302e6ffb506d942d2ebbdd1db269ec8126e9045fe5390796ff096abdb45308c322e1bb91536545f50b61afe08ad7f46225e54b4815d652125936cf5d89-e13bb3e08ba7376e46b224d2868983c3a5febaef", async () => {
    const db = createMockProxy<any>()
    db.query.mockReturnValue(Promise.resolve([{
      "hash": "edacf1302e6ffb506d942d2ebbdd1db269ec8126e9045fe5390796ff096abdb45308c322e1bb91536545f50b61afe08ad7f46225e54b4815d652125936cf5d89",
      "path": "/search/shows",
      "domain": null,
      "method": "GET",
      "content": {
        "url": "https://api.tvmaze.com/search/shows?q=theboys",
        "options": {"method": "GET"},
        "timestamp": 1655306774738
      },
      "created": "2022-06-15T15:26:15.143Z",
      "requestid": "238"
    }]))
    expect(await new RequestsService(db).findByHash("edacf1302e6ffb506d942d2ebbdd1db269ec8126e9045fe5390796ff096abdb45308c322e1bb91536545f50b61afe08ad7f46225e54b4815d652125936cf5d89")).toStrictEqual({
      "hash": "edacf1302e6ffb506d942d2ebbdd1db269ec8126e9045fe5390796ff096abdb45308c322e1bb91536545f50b61afe08ad7f46225e54b4815d652125936cf5d89",
      "path": "/search/shows",
      "domain": null,
      "method": "GET",
      "content": {
        "url": "https://api.tvmaze.com/search/shows?q=theboys",
        "options": {"method": "GET"},
        "timestamp": 1655306774738
      },
      "created": "2022-06-15T15:26:15.143Z",
      "requestid": "238"
    })
  })
