var articlesDir = 'https://zequnyu9503.github.io/blog/articles/';
var page = defaultUrlParse('page');
var paragraphs = $('.essay .paragraphs')

$(function() {
    
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
                loadArticleByLine(data[paragraph]);
            }
		},
		error: function(xhr, status, error) {
			// TO-DO
		}
    });
    
    function loadArticleByLine(paragraph) {
		console.log(paragraph);
        switch (paragraph.tag) {
			case 'p': add_p(paragraph); break;

		}
	}
	
	function add_p(paragraph) {
		let p = document.createElement('p');
		p.className = paragraph.class;
		p.innerHTML = paragraph.text;
		paragraphs.append(p);
		console.log(paragraphs);
	}

})