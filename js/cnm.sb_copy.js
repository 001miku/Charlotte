// 返回桌面的时候显示
(function() {
	var callbacks = [],
		timeLimit = 50,
		open = false;
	
	function loop() {
		var startTime = new Date();
		if (new Date() - startTime > timeLimit) {
			if (!open) {
				callbacks.forEach(function(fn) {
					fn.call(null);
				});
			}
			open = true;
		} else {
			open = false;
		}
	}
	
	setInterval(loop, 1);
	
	return {
		addListener: function(fn) {
			callbacks.push(fn);
		},
		cancelListener: function(fn) {
			callbacks = callbacks.filter(function(v) {
				return v !== fn;
			});
		}
	};
})();

// 显示版权
console.log("\n %c 友利奈绪爱小陈 %c https://cnm.sb/ \n\n",
	"color: #fadfa3; background: #2f55d4; padding:5px 0;",
	"background: #fadfa3; padding: 5px 0;");

// js键盘监听事件-监听键盘F12(123)-触发文件为空
//$(document).keydown(function(event) {
//	if (event.keyCode == 123) {
//		alert('CNM温馨提醒：\n小伙子！你想干嘛？又想扒我站？');
//		document.body.innerHTML = "";
//	}
//});
