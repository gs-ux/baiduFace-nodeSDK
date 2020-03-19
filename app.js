var AipFaceClient = require("baidu-aip-sdk").face;
var APP_ID = "";
var API_KEY = "";
var SECRET_KEY = "";
var client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);
var HttpClient = require("baidu-aip-sdk").HttpClient;
HttpClient.setRequestOptions({timeout: 5000});
HttpClient.setRequestInterceptor(function(requestOptions) {
    requestOptions.timeout = 5000;
    return requestOptions;
});
var fs = require('fs');
var image = fs.readFileSync("").toString("base64");
var imageType = "BASE64";

var options = {};
options["face_field"] = "age,beauty,expression,gender,glasses,emotion";

client.detect(image, imageType, options).then(function(result) {
    console.log(JSON.stringify(result));
}).catch(function(err) {
    console.log(err);
});;