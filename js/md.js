$(function() {

    var articlesDir = 'https://zequnyu9503.github.io/blog/articles/md/';
    var id = defaultUrlParse('id');
    var URL = articlesDir + id + '.md';

    $.ajax({
        type: 'get',
        async: true,
        url: URL,
        datatype: 'text',
        success:function(data){
            var md = window.markdownit();
            var elements = md.render(data);
            $('.content').append(elements);
        },
        error: function(xhr, status, error) {
            window.location.href = 'https://zequnyu9503.github.io/blog/404.html';
        }
    });
})