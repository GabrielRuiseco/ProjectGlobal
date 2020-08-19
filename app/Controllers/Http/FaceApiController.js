'use strict'
const axios = require('axios');
const Drive = use('Drive')
class FaceApiController {

  async compareImg({request, response}) {
    const {path1, path2} = request.only(['path1', 'path2'])
    const url = 'https://api-us.faceplusplus.com/facepp/v3/compare'
    const img1 = await Drive.get(`uploads/${path1}`);
    const img2 = await Drive.get(`uploads/${path2}`);

    const options = {
      api_key: '6hnA_UbbOSuxzVyriF7YJPBNvp9LYEMs',
      api_secret: 'qWhdlomuGzVdp9rjQ3_ayTXtvTsYsOuu',
      image_url1: `127.0.0.1:3000/api/downloadit/${path1}`,
      image_url2: `127.0.0.1:3000/api/downloadit/${path2}`
    };
    await axios.post(url, options).then(function (res) {
      return response.json(res);
    })
  }


  async getList({request, response}) {
    const name = request.only(['name'])
    const url = 'https://api.luxand.cloud/subject'
    const options = {

      data: {"name": name.toString()},
      headers: {
        'token': "e0862b8d55c84ed0a95186a9341070ff"
      }
    };

    const results = await axios.get(url, options);
    return response.json(results.body);
  }
}

module.exports = FaceApiController
