# baiduFace-nodeSDK
**这一篇我们来聊一聊使用百度智能云的人脸检测nodeSDK。**

使用这个东西，我们可以上传一张人脸，百度那边会给我们返回一些关于这张人脸的信息，比如说颜值，年龄，性别等等很多信息，这个东西我们会用了之后可以直接作为我们的服务器后端使用。

1. 我们首先要在百度云上面创建一个人脸识别的应用。

![](https://www.gaosong.site/2020/03/19/%E7%99%BE%E5%BA%A6%E4%BA%91%E4%BA%BA%E8%84%B8%E6%A3%80%E6%B5%8BnodeSDK/20200319pic6.jpg)

创建完成之后，**我们要保存AppID、API Key、Secret Key这三个字符串**，后面会需要。

2. 下载node版本的SDK，[连接在这里](https://ai.baidu.com/download?sdkId=84)。我们也可以去[百度云官网](https://ai.baidu.com/ai-doc/FACE/Nk37c1r9i)上查看这个SDK相关的信息。
3. 把下载的文档(`aip-node-sdk-2.4.1.zip`)解压到我们的项目文件夹中，进入这个`aip-node-sdk-2.4.1`文件夹中，在终端安装相关包，使用`npm install`命令即可。
4. `cd ../`回到我们的项目文件夹中，安装百度的人脸检测包：`npm install baidu-aip-sdk`。
5. 创建一个**app.js**文件，里面写入下面内容，具体的一些解释，我们可以去[百度云官网](https://ai.baidu.com/ai-doc/FACE/Nk37c1r9i)上查看。

```javascript
var AipFaceClient = require("baidu-aip-sdk").face;
var APP_ID = "我们的APP_ID";
var API_KEY = "我们的API_KEY";
var SECRET_KEY = "我们的SECRET_KEY";
var client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);
var HttpClient = require("baidu-aip-sdk").HttpClient;
HttpClient.setRequestOptions({timeout: 5000});
HttpClient.setRequestInterceptor(function(requestOptions) {
    requestOptions.timeout = 5000;
    return requestOptions;
});
var fs = require('fs');
var image = fs.readFileSync("这里写入我们电脑中一张人脸照片路径").toString("base64");
var imageType = "BASE64";

var options = {};
//这里面放入我们想要返回的信息，可以去官网查看有哪些，这里返回的有：年龄、颜值、表情、性别、眼镜、情绪
options["face_field"] = "age,beauty,expression,gender,glasses,emotion";

client.detect(image, imageType, options).then(function(result) {
    console.log(JSON.stringify(result));
}).catch(function(err) {
    console.log(err);
});;
```

* **APP_ID、API_KEY、SECRET_KEY写入我们百度云那边的三个字符串，image读图片后面写入我们的人脸照片路径。**

6. `node app.js`直接运行我们的文件，等待一会儿，控制台那边就会给我们返回相关的信息。

![](https://www.gaosong.site/2020/03/19/%E7%99%BE%E5%BA%A6%E4%BA%91%E4%BA%BA%E8%84%B8%E6%A3%80%E6%B5%8BnodeSDK/20200319pic7.jpg)

这个小项目已经上传到了**github**上面：[baiduFace-nodeSDK源码](https://github.com/gs-ux/baiduFace-nodeSDK)。有需要的朋友可以看看。

