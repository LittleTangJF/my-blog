function createPhone(data,assets) {
    const {
        Base64
    } = require('js-base64');
    let html = `
    <!DOCTYPE html>
<html>
<head>
    <!-- https://imququ.com/post/reduce-ttfb-on-thinkjs3-website.html -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <meta name="application name" content="${Base64.decode(data.title)}">
    <meta name="keywords" content="${data.type}">
    <meta name="description" content="${Base64.decode(data.introduce)}">
    <meta name="author" content="刘润霖">
    <meta name="copyright" content="刘润霖://blogweb.cn">
    <link rel="stylesheet" href="./css/index.css">
    <link rel="stylesheet" href="./css/${assets}.css">
    <title>${Base64.decode(data.title)}</title>
</head>
<body>
  <!-- 代码是写出来给人看的附带能在机器上运行 -->
    <header>
        <img src="./image/writer-face.png" alt="左侧导航栏作者头像" class="writer-face">
        <nav>
            <h1 class="writer-name">刘润霖</h1>
            <p class="write-text">WEB开发</p>
            <div class="nav">
                <a href="https://blogweb.cn">首页</a>
                <a href="https://blogweb.cn/search">搜索</a>
                <a href="https://blogweb.cn/resume">作者简历</a>
                <a href="https://blogweb.cn/about">关于</a>
            </div>
            <div class="navs">
                <a href="https://github.com/Lrunlin">
                    <img src="./image/github.png" alt="作者GitHub" class="clearMargin">
                </a>
                <a href="javascript:;">
                    <img src="./image/wechat.png" alt="作者微信" class="show-qrcode">
                </a>
                <a href="javascript:;">
                    <img src="./image/qq.png" alt="作者QQ" class="show-qrcode">
                </a>
            </div>
        </nav>
    </header>
    <article>
        <div class="article-head">
            <h1 class="article-title">
                ${Base64.decode(data.title)}
            </h1>
            <div class="article-time">
                2021-03-23
            </div>
        </div>
${Base64.decode(data.article)}
    </article>
    <footer>
        <p class="foot-title">
            发布于
            <span id="foot-time"></span>,
            并添加「 <span id="footType"></span> 」
            标签。
        </p>
        <p class="foot-writer">
            @2021-刘润霖的小站-
            <a href="https://beian.miit.gov.cn/" target="_blank">辽ICP备2020014377号-2</a>
        </p>
    </footer>
    <div id="alert" style="display: none;">
        <img style="display: none;" class="qrcode" data-src="./image/wechat-qrcode.jpg" alt="作者微信二维码">
        <img style="display: none;" class="qrcode" data-src="./image/qq-qrcode.jpg" alt="作者QQ二维码">
    </div>
    <script>
        let article = {
            time: "${data.time}",
            type: "${data.type}"
        };
    </script>
    <script src="./js/jquery.js"></script>
    <script src="./js/index.js" type="module"></script>
    <script src="./js/${assets}.js"></script>
</body>
</html>
    `
    return html;
}
module.exports = createPhone;