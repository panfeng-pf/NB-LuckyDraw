var LuckyUtil = {
	fs: require('fs')
	, path: require('path')
	, querystring: require('querystring')
	, gui: require('nw.gui')
	
	, fullscn: function() {
		var win = this.gui.Window.get();
		win.enterFullscreen();
	}
	, initFullscn: function(jqBtn) {
		var win = this.gui.Window.get();
		if(win.isFullscreen) {
			jqBtn.addClass('active');
		} else {
			jqBtn.removeClass('active');
		}
		jqBtn.click(function() {
			if(win.isFullscreen) {
				win.leaveFullscreen();
				jqBtn.removeClass('active');
			} else {
				win.enterFullscreen();
				jqBtn.addClass('active');
			}
		});
		$('body').keyup(function(event) {
			//key ESC
			if(event.keyCode == 27) {
				win.leaveFullscreen();
				jqBtn.removeClass('active');
			}
		});
	}
	
	, getHome: function() {
		var accessPath = location.pathname;
		var home = this.path.dirname(accessPath);
		if('win32' == process.platform) {
			home = home.substr(1);
		}
		return decodeURIComponent(home);
	}
	
	, parseFileName: function(fileName) {
		var extPos = fileName.lastIndexOf('.');
		return {
			filename: fileName
			, name: fileName.substring(0, extPos)
			, ext: fileName.substring(extPos)
		};
	}
	
	, parsePhotoName: function(fileName) {
		var extPos = fileName.lastIndexOf('.');
		var part1 = fileName.substring(0, extPos);
		return {
			filename: fileName
			, id: part1.substring(0, 6)
			, name: part1.substring(6)
			, ext: fileName.substring(extPos)
		};
	}
	
	, genLuckyOneHtml: function(candidateHome, fileInfo) {
		var luckyOneHtml = '';
		luckyOneHtml += '<div class="lucky-one">';
		luckyOneHtml += '  <div class="photo-frame" title="' + fileInfo.name + ' (' + fileInfo.id + ')">';
		luckyOneHtml += '    <img class="photo" src="' + candidateHome + '/' + fileInfo.filename + '">';
		luckyOneHtml += '  </div>';
		luckyOneHtml += '  <div class="name">' + fileInfo.name + '</div>';
		luckyOneHtml += '  <div class="btn-unlucky" style="display:none;" title="TA现在没空">';
		luckyOneHtml += '    <i class="fa fa-times"></i>';
		luckyOneHtml += '  </div>';
		luckyOneHtml += '</div>';
		return luckyOneHtml;
	}

	, parseUrlQuery: function() {
		var queryStr = location.search.substr(1);
		return this.querystring.parse(queryStr);
	}

	, genUrlQuery: function(jsonQuery) {
		return this.querystring.stringify(jsonQuery, '&', '=');
	}

	, getFileNameListOfDir: function(dirPath) {
		var fileNameList = [];
		
		var itemNameList = this.fs.readdirSync(dirPath);
		for(var i = 0; i < itemNameList.length; i ++) {
			var filePath = dirPath + '/' + itemNameList[i];
			var fileStat = this.fs.statSync(filePath);
			if (fileStat.isFile()) fileNameList.push(itemNameList[i]);
		}
		
		return fileNameList;
	}

	, fileExists: function(path) {
		return this.fs.existsSync(path);
	}

	, writeDataToFile: function(path, data) {
		this.fs.writeFileSync(path, data);
	}

	, readDataFromFile: function(path) {
		return this.fs.readFileSync(path);
	}
};