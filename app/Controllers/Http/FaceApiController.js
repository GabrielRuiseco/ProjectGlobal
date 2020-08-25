'use strict'
var rp = require('request-promise');
const axios = require('axios');
const Helpers = use('Helpers');
const Drive = use('Drive');
const FormData = require('form-data');

class FaceApiController {

  async servoOnOff(params) {
    const state=params;
    let options = {
      method:'POST',
      uri: 'https://io.adafruit.com/api/v2/gabriel_rc/feeds/default.digital/data',
      headers: {
        'User-Agent': 'Request-Promise',
        'X-AIO-Key': 'aio_HmLc12I257sUDLxLlHHWV9SLYavr'
      },
      body:{
        "datum":{"value":{state}}
      }
    };

    await rp(options)
      .then(function (response) {
        return "Servo "+{state};
      })
      .catch(function (err) {
        return "Error";
      });
  }

  async compareImg({request, response}) {
    const url = 'https://api-us.faceplusplus.com/facepp/v3/compare'
    const img1 = request.file('img1', {
      type: ['image'],
      size: '2mb',
      allowedExtensions: ['jpg', 'png']
    })
    const img2 = request.file('img2', {
      type: ['image'],
      size: '2mb',
      allowedExtensions: ['jpg', 'png']
    })
    let bodyFormData = new FormData();
    bodyFormData.append('image_file1', img1);
    bodyFormData.append('image_file2', img2);

    const body = {
      api_key: '6hnA_UbbOSuxzVyriF7YJPBNvp9LYEMs',
      api_secret: 'qWhdlomuGzVdp9rjQ3_ayTXtvTsYsOuu',
      image_file1: img1,
      image_file2: img2
    };

    axios({
      method: 'post',
      url: url,

      data: {
        bodyFormData,
        api_key: '6hnA_UbbOSuxzVyriF7YJPBNvp9LYEMs',
        api_secret: 'qWhdlomuGzVdp9rjQ3_ayTXtvTsYsOuu'
      },
      headers: {'Content-Type': 'multipart/form-data'}
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
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
