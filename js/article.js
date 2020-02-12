var articlesDir = 'https://zequnyu9503.github.io/blog/articles/';
var page = defaultUrlParse('page');

(function (arg) {
    
    let URL = articlesDir + page + '/' + 'content.json';

    $.ajax({
		type: 'get',
		async: true,
		url: URL,
		datatype: 'json',
		dataFilter: function(data, type) {
			return data;
		},
		success:function(data){
            for(let paragraph in data){
                loadArticleByLine(paragraph);
            }
		},
		error: function(xhr, status, error) {
			// TO-DO
		}
    });
    
    function loadArticleByLine(paragraph) {
        
    }

})(jQuery);