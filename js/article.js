var articlesDir = 'https://zequnyu9503.github.io/blog/articles/';
var page = defaultUrlParse('page');
var paragraphs = $('.essay .paragraphs')

$(function() {
    
    let URL = articlesDir + page + '/';

    $.ajax({
		type: 'get',
		async: true,
		url: URL +  'content.json',
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
			case 'a': add_a(paragraph); break;
			case 'img': add_img(paragraph); break;
		}
	}
	
	function add_p(paragraph) {
		let p = document.createElement('p');
		p.className = paragraph.class;
		p.innerHTML = paragraph.text;
		paragraphs.append(p);
	}

	function add_a(paragraph) {
		let a = document.createElement('a');
		a.className = paragraph.class;
		a.href = paragraph.href;
		a.innerHTML = paragraph.text;
		paragraphs.append(a);
	}

	function add_img(paragraph) {
		let div = document.createElement('div');
		div.className = 'img-wrapper';
		let img = document.createElement('img');
		img.src = URL + paragraph.src;
		img.alt = paragraph.alt;
		img.title = paragraph.text;
		div.appendChild(img);
		paragraphs.append(div);
	}

})