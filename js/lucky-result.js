var LuckyResult = {
	createNew: function(resultHome) {
		var luckyResult = {};
		
		luckyResult.getResultList = function() {
			var resultNameList = [];
			
			var fileNameList = LuckyUtil.getFileNameListOfDir(resultHome);
			fileNameList.forEach(function(fileName) {
				var fileNameStruct = LuckyUtil.parseFileName(fileName);
				if('.json' == fileNameStruct.ext) {
					resultNameList.push(fileNameStruct.name);
				}
			});
			
			return resultNameList;
		};
		
		luckyResult.createResult = function(name) {
			var path = resultHome + '/' + name + '.json';
			if(LuckyUtil.fileExists(path)) {
				alert('This lucky result has already existed.');
			} else {
				LuckyUtil.writeDataToFile(path, '{}');
			}
		}
		
		luckyResult.readResult = function(name) {
			var path = resultHome + '/' + name + '.json';
			try {
				data = LuckyUtil.readDataFromFile(path);
				return JSON.parse(data);
			} catch(e) {
				alert('Fail to parse json file : ' + e.name + " : " + e.message);
			}
		}
		
		luckyResult.writeResult = function(name, jsonData) {
			var path = resultHome + '/' + name + '.json';
			LuckyUtil.writeDataToFile(path, JSON.stringify(jsonData, null, 2));
		}
		
		return luckyResult;
	}
};