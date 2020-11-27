$(function () {
    var articlesDir = 'https://zequnyu9503.github.io/blog/articles/';
    var URL_CAT = articlesDir + 'catalog.json';

    var articlesDir = 'https://zequnyu9503.github.io/blog/articles/md/';
    var id = defaultUrlParse('id');
    if (!id || id == 'undefined') {
        window.location.href = 'https://zequnyu9503.github.io/blog/404.html';
    }
    var URL_MD = articlesDir + id + '.md';

    function loadTemplate() {
        $.ajax({
            type: 'get',
            async: true,
            url: URL_CAT,
            datatype: 'text',
            success: function (data) {
                var cats = data['catalog'];
                var isFound = false;
                $.each(cats, function (ind, val) {
                    if (val['id'] === id) {
                        isFound = true;
                        $('.file .title').html(val['title']);
                        $('.file .brief').html(val['brief']);
                    }
                });
                if (isFound) {
                    loadMD();
                } else {
                    window.location.href = 'https://zequnyu9503.github.io/blog/404.html';
                }
            },
            error: function (xhr, status, error) {
                window.location.href = 'https://zequnyu9503.github.io/blog/404.html';
            }
        });
    }

    function loadMD() {
        $.ajax({
            type: 'get',
            async: true,
            url: URL_MD,
            datatype: 'text',
            success: function (data) {
                // var md = window.markdownit({
                //     html: true,
                //     linkify: true,
                //     typographer: true,
                //     breaks: true
                // });
                // var elements = md.render(data);
                // $('.content').append(elements);

                // https://github.com/showdownjs/showdown
                var converter = new showdown.Converter();
                // 生成与github样式兼容的标头ID（用破折号替换空格，并删除一堆非字母数字字符）
                converter.setOption('ghCompatibleHeaderId', 'true');
                // 省略代码块中的尾随换行符
                converter.setOption('omitExtraWLInCodeBlocks', 'true');
                var html = converter.makeHtml(data);
                $('.content').append(html);
            },
            error: function (xhr, status, error) {
                window.location.href = 'https://zequnyu9503.github.io/blog/404.html';
            }
        });
    }

    function defaultUrlParse(key) {
        return unescape((window.location.href.match(new RegExp("(\\?|\\&)" + key + "=([^\\&]+)")))[2]);
    }

    loadTemplate();
})