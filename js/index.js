var articlesDir = 'https://zequnyu9503.github.io/blog/articles/';
var fixedArticleTemplate = $("#articleTemplate").text()
var catalogStructure = null;

window.onload =  function(){
	loadInfo();
}

function loadInfo(){
	let URL = articlesDir + 'catalog.json';
	$.ajax({
		type:'get',
		async:true,
		url:URL,
		datatype:'json',
		dataFilter: function(data, type) {
			return data;
		},
		success:function(data){
			catalogStructure = data['catalog']
			loadArticleList();
		},
		error: function(xhr, status, error) {
			// TO-DO
		}
	});
}

function loadArticleList(){
	if(!catalogStructure) return;
	for(let n in catalogStructure){
		let articleObject = catalogStructure[n];
		let artcleBlock = articleTemplateFactory(articleObject)
		$("#articles").append(artcleBlock);
	}
}

function articleTemplateFactory(articleObject) {
	let temp = Object.assign(fixedArticleTemplate);
	for(let property in articleObject) {
		temp = temp.replace(eval('/\\{@' + property + '@\\}/g'), valueFilter(property, articleObject));
	}
	return temp;
}

function valueFilter(property, object) {
	let value = Object.assign(object[property])
	switch (property) {
		case "id" :  break;
		case "tag" : break;
		case "title" : break;
		case "time" : break;
		case "img" :
			if (value && value.length > 0)
				value = '<img src="./articles/' + object["id"] + '/' + value + '">';
			break;
		case "author" : break;
		case "brief" : break;
		default: break;
	}
	return value;
}
