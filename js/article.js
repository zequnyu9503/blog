$(function() {
	
	var articlesDir = 'https://zequnyu9503.github.io/blog/articles/';
	var paragraphs = $('.essay .paragraphs')
	var page = defaultUrlParse('page');
	var URL = articlesDir + page + '/';
	var maxRecommend = 5;

    $.ajax({
		type: 'get',
		async: true,
		url: URL +  'content.json',
		datatype: 'json',
		dataFilter: function(data, type) {
			let datum = JSON.parse(data)
			loadWebFrame(datum);
			return JSON.stringify(datum['content']);
		},
		success:function(data){
            for(let paragraph in data){
                loadArticleByLine(data[paragraph]);
            }
		},
		error: function(xhr, status, error) {
			window.location.href = 'https://zequnyu9503.github.io/blog/404.html';
		}
    });
	
	function loadWebFrame(frame) {
		$('.essay .title h1').text(frame['title']);
		$('.essay .bar span[name=time]').text(frame['time']);
		$('.essay .bar span[name=author]').text(frame['author']);
		let id = frame['id'];
		let tag = frame['tag'];

		$.ajax({
			type: 'get',
			async: true,
			url: articlesDir +  'catalog.json',
			datatype: 'json',
			success:function(data){
				let catalogs = data['catalog'];
				let titles = Array();
				for (let index in catalogs) {
					if (catalogs[index]['tag'] === tag.toString() &&
					catalogs[index]['id'] != id) {
						titles.push(catalogs[index]);
					}
				}
				if (titles.length === 0) {
					$('.recommend .titles .paragraphs').append("<p>暂无相关文章</p>");
				} else {
					for (let index in titles) {
						let paragraph = titles[index];
						let a = document.createElement('a');
						a.target = "_blank";
						a.innerHTML = paragraph.title;
						a.href = articlesDir + "article.html?page=" + paragraph.id;
						$('.recommend .paragraphs').append(a);
					}
				}
			},
			error: function(xhr, status, error) {
				$('.recommend .paragraphs').innerHTML = "<p>暂无相关文章</p>";
			}
		});
	}
	
    function loadArticleByLine(paragraph) {
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
		if (!paragraph.download) {
			a.download = paragraph.download;
		}
		paragraphs.append(a);
	}

	function add_img(paragraph) {
		let div = document.createElement('div');
		div.className = 'img-wrapper';
		let img = document.createElement('img');
		img.src = URL + paragraph.src;
		img.alt = paragraph.alt;
		img.className = paragraph.class;
		img.title = paragraph.text;
		div.appendChild(img);
		paragraphs.append(div);
	}

})