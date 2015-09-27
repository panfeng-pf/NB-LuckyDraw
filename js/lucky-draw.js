var LuckyDraw = {
	createNew: function(jqDrawPanel, luckySelectorStr, candidateHome, luckyList) {
		//------------------------------
		//main object
		//------------------------------
		var luckyDraw = {};
		luckyDraw.candidateSum = 0;
		
		//------------------------------
		//private
		//------------------------------
		var isStart = false;
		var intervalId = -1;
		var intervalMs = 100;
		
		var initCandidateList = function() {
			//get all candidate photoes
			var fileNameList = LuckyUtil.getFileNameListOfDir(candidateHome);
			
			luckyDraw.candidateSum = fileNameList.length;
			var candidateListLen = luckyDraw.candidateSum - luckyList.length;
			
			//make an index list for re-seq candidate
			var idxList = new Array(candidateListLen);
			for(var i = 0; i < candidateListLen; i ++) {
				idxList[i] = i;
			}
			
			var candidateList = new Array(candidateListLen);
			for(var j = 0; j < luckyDraw.candidateSum; j ++) {
				var fileNameStruct = LuckyUtil.parsePhotoName(fileNameList[j]);
				
				var isLucky = false;
				for(var i = 0; i < luckyList.length; i ++) {
					//remove already lucky ones
					if(luckyList[i].name == fileNameStruct.name) {
						isLucky = true;
						luckyList.splice(i, 1);
						break;
					}
				}
				
				if(! isLucky) {
					//find a random position for save candidate
					var pos = Math.floor(Math.random() * idxList.length);
					var idx = idxList[pos];
					candidateList[idx] = fileNameStruct;
					idxList.splice(pos, 1);
				}
			}
			
			return candidateList;
		};
		var candidateList = initCandidateList();
		
		var reSeqList = function(list) {
			var len = list.length;
			for(var i = 0; i < len; i ++) {
				var idx = Math.floor(Math.random() * (len - i) + i);
				var element = list[idx];
				list[idx] = list[i];
				list[i] = element;
			}
		};
		
		var doLuckyDraw = function(jqLuckySet, capcity) {
			for(var i = 0; i < capcity; i ++) {
				var jqLuckyOne = $(jqLuckySet[i]);
				var jqPhotoFrame = jqLuckyOne.find('.photo-frame');
				var jqPhoto = jqPhotoFrame.find('.photo');
				var jqName = jqLuckyOne.find('.name');
				
				//find a random candidate
				var idx = Math.floor(Math.random() * (candidateList.length - i) + i);
				var candidate = candidateList[idx];
				candidateList[idx] = candidateList[i];
				candidateList[i] = candidate;
				
				jqPhotoFrame.attr('title', candidate.name + ' (' + candidate.id + ')')
					.attr('data-filename', candidate.filename);
				jqPhoto.attr('src', candidateHome + '/' + candidate.filename);
				jqName.text(candidate.name);
				jqLuckyOne.addClass('valid');
			}
		};
		
		//------------------------------
		//public
		//------------------------------
		luckyDraw.start = function() {
			if(! isStart) {
				if(candidateList.length > 0) {
					isStart = true;
					
					var jqLuckySet = jqDrawPanel.find(luckySelectorStr);
					var capcity = jqLuckySet.length;
					if(capcity > candidateList.length) {
						for(var i = candidateList.length; i < capcity; i ++) {
							var jqLuckyOne = $(jqLuckySet[i]);
							var jqPhoto = jqLuckyOne.find('.photo');
							var jqName = jqLuckyOne.find('.name');
							
							jqPhoto.attr('src', './img/who.png').attr('title', 'who');
							jqName.text('who');
							jqLuckyOne.removeClass('valid');
						}
						capcity = candidateList.length;
					}
					
					intervalId = setInterval(function() {
						doLuckyDraw(jqLuckySet, capcity);
					}, intervalMs);
					
					return true;
				} else {
					alert('已经没有更多的候选人了');
					return false;
				}
			}
		};
		
		luckyDraw.stop = function() {
			if(isStart) {
				isStart = false;
				clearInterval(intervalId);
				intervalId = -1;
				
				var nameList = this.getLuckyNameList();
				
				//remove lucky ones
				candidateList.splice(0, nameList.length);
				
				//adjust candidate index in list
				reSeqList(candidateList);
				return nameList;
			}
		}
		
		luckyDraw.cancel = function() {
			if(isStart) {
				isStart = false;
				clearInterval(intervalId);
				intervalId = -1;
				
				//adjust candidate index in list
				reSeqList(candidateList);
			}
		}
		
		luckyDraw.getLuckyNameList = function() {
			var jqLuckySet = jqDrawPanel.find('.valid' + luckySelectorStr);
			var nameList = [];
			for(var i = 0; i < jqLuckySet.length; i ++) {
				var jqLuckyOne = $(jqLuckySet[i]);
				//var jqName = jqLuckyOne.find('.name');
				var jqPhotoFrame = jqLuckyOne.find('.photo-frame');
				var fileName = jqPhotoFrame.data('filename');
				nameList.push(LuckyUtil.parsePhotoName(fileName));
			}
			return nameList;
		};
		
		//------------------------------
		//return main object
		//------------------------------
		return luckyDraw;
	}
	
};