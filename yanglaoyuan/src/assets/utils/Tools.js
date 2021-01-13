/*
 * fun [function] 需要防抖的函数
 * delay [number] 毫秒，防抖期限值
 */
function debounce(fun, delay = 300) {
	let timer;
	return function () {
		let ctx = this
		let args = arguments
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			timer = null
			fun.apply(ctx, args)
		}, delay)
	}
}
/*
 * fun [function] 需要节流的函数
 * delay [number] 毫秒，节流期限值
 */
function throttle(fun, interval = 300) {
	let last;
	let timer;
	return function () {
		let ctx = this
		let args = arguments
		let now = new Date()
		if (last && now - last < interval) {
			clearTimeout(timer)
			timer = setTimeout(function () {
				last = now
				fun.apply(ctx, args)
			}, interval)
		} else {
			last = now
			fun.apply(ctx, args)
		}
	}
}

/*
 * date [function] 时间戳或者时间标准
 * fmt [number] 时间格式
 */
export const format = function (date, fmt = 'YYYY-MM-DD') {

	let newDate = date;
	let fmts = fmt;

	//fmts='YYYY-MM-DD HH:mm:ss'
	if (!newDate) {
		newDate = new Date;
	}
	if (typeof newDate === 'number') {
		newDate = new Date(newDate);
	}
	const o = {
		'M+': newDate.getMonth() + 1,
		'D+': newDate.getDate(),
		'h+': newDate.getHours() % 12 === 0 ? 12 : newDate.getHours() % 12,
		'H+': newDate.getHours(),
		'm+': newDate.getMinutes(),
		's+': newDate.getSeconds(),
		'q+': Math.floor((newDate.getMonth() + 3) / 3),
		S: newDate.getMilliseconds(),
	};
	const week = {
		0: '\u65e5',
		1: '\u4e00',
		2: '\u4e8c',
		3: '\u4e09',
		4: '\u56db',
		5: '\u4e94',
		6: '\u516d',
	};
	if (/(Y+)/.test(fmts)) {
		fmts = fmts.replace(RegExp.$1, (`${newDate.getFullYear()}`).substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmts)) {
		fmts = fmts.replace(RegExp.$1, () => {
			if (RegExp.$1.length > 1) {
				if (RegExp.$1.length > 2) {
					return `\u661f\u671f${week[newDate.getDay()]}`;
				}
				return `\u5468${week[newDate.getDay()]}`;
			}
			return week[`${newDate.getDay()}`];
		});
	}
	Object.keys(o).forEach((k) => {
		if (new RegExp(`(${k})`).test(fmts)) {
			fmts = fmts.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
		}
	});
	return fmts;
};

/*   网络图片转base64
 * url [function] 网络图片地址
 * outputFormat [number] 图片格式
 */
function imgTo(url, outputFormat = 'image/png') {
	return new Promise(function (resolve, reject) {
		let canvas = document.createElement('CANVAS'),
			ctx = canvas.getContext('2d'),
			img = new Image;

		img.crossOrigin = 'Anonymous'; // 重点！设置image对象可跨域请求
		img.onload = function () {
			canvas.height = img.height;
			canvas.width = img.width;
			ctx.drawImage(img, 0, 0);
			let dataURL = canvas.toDataURL(outputFormat);
			canvas = null;
			resolve(dataURL);
		};
		// img.src = url; // 旧的方式
		img.src = url + '?t=' + new Date().valueOf() // 防止oss的缓存问题
	})
}

/**
 * @param {*} order  排正序或者倒叙
 * @param {*} arr  需要排序的数组
 * @param {*} type  按属性排序
 */
function isSort(order, arr, type) {
  if (order) {
    arr.sort((x, y) => {
      return x[type] - y[type]
    })
  } else {
    arr.sort((x, y) => {
      return y[type] - x[type]
    })
  }
  return arr;
}

/*
 * num [function] 传入的数字
 * decimal [number] 需要保留几位小数
 */
function RoundNum(num, decimal) {
	Math.round(num * 10 ** decimal) / 10 ** decimal;
}

	/**
	 * 精确计算根据日期计算年龄 年，月，日
	 * @param {} beginStr:日期格式：yyyy-MM-dd
	 * @param {} endStr:日期格式：yyyy-MM-dd
	 * @author wall
	 * @date 2019-2-21
	 */
	function getAge(beginStr,endStr){
		var tmpBirth = {};
		tmpBirth.year = 0;
		tmpBirth.month = 0;
		tmpBirth.day = 0;
	
		if(beginStr == null || beginStr == ''){return;}
		var startDate = new Date(beginStr.replace(/-/g,"/"));
		var endDate = new Date(endStr.replace(/-/g,"/"));
		//var days = endDate.getTime()-startDate.getTime();
		//var day = parseInt(days/(1000*60*60*24));
		
		var startYear = startDate.getFullYear();
		var endYear = endDate.getFullYear();
		var startMonth = startDate.getMonth()+1;
		var endMonth = endDate.getMonth()+1;
		var startDay = startDate.getDate();
		var endDay = endDate.getDate();
		var allDays = 0;
		//准确的每个月天数数组，判断闰年平年。
		var allDayArr = [];
		//当月计算
		if(startYear==endYear&&startMonth==endMonth){
			 tmpBirth.day = endDay-startDay;
			 return tmpBirth;
		}  
		//正常计算
		for(var i=startYear;i<=endYear;i++){
			var currYear = 365
			var yearMonth = 12;
			if(((i%4==0&&i%100!=0)||i%400==0)){
				allDays+=366;
				currYear = 366;
			} 
			var currMonth=1;
			if(i==startYear){
				currMonth = startMonth;
			}
			if(i==endYear){
				yearMonth = endMonth;
			}
			//闰年计算
			for(var m=currMonth;m<=yearMonth;m++){
				var fullDays=30;
				
				 if(m==1||m==3||m==8||m==10||m==12){
					fullDays = 31
				 }else  if(m==2){
					if(((i%4==0&&i%100!=0)||i%400==0)){
						fullDays = 29;
					}else{
						fullDays = 28;
					}
				 }
				var dayObj = {
					fullDays:fullDays,
					currDays:fullDays
				};
				if(m==startMonth&&i==startYear){
					dayObj = {
						fullDays:fullDays,
						currDays:fullDays-startDay
					};
				}else
				if(m==endMonth&&i==endYear){
					dayObj = {
						fullDays:fullDays,
						currDays:endDay
					};
				}
				allDayArr.push(dayObj);
			}
		}

		if(allDayArr.length==1){
			tmpBirth.day = allDayArr[0].currDays;
		}else
		if(allDayArr.length==2){
			var d1 = allDayArr[0].currDays;
			var d2 = allDayArr[1].currDays;
			//月份天数浮动因子决定准确性
			var cfDay = allDayArr[0].fullDays>allDayArr[allDayArr.length-1].fullDays?allDayArr[allDayArr.length-1].fullDays:allDayArr[0].fullDays;
			if((d1+d2)>=cfDay){
				tmpBirth.day = (d1+d2)-cfDay;
				tmpBirth.month +=1;
			}else{
				tmpBirth.day = d1+d2;
			}
		}else{
			var d1 = allDayArr[0].currDays;
			var d2 = allDayArr[allDayArr.length-1].currDays;
			var sumFullDay = 0;
			for(var i=0;i<allDayArr.length;i++){
				sumFullDay+=allDayArr[i].fullDays;
			}
			//var cfDay = sumFullDay/allDayArr.length;//
			//var cfDay = allDayArr[0].fullDays;
			//月份天数浮动因子决定准确性
			var cfDay = allDayArr[0].fullDays>allDayArr[allDayArr.length-1].fullDays?allDayArr[allDayArr.length-1].fullDays:allDayArr[0].fullDays;
			if((d1+d2)>=cfDay){
				tmpBirth.day = (d1+d2)-cfDay;
				tmpBirth.month +=1;
			}else{
				tmpBirth.day = d1+d2;//-(allDayArr[allDayArr.length-1].fullDays-allDayArr[allDayArr.length-2].fullDays);
			}
			tmpBirth.month += allDayArr.length-2;
			
			if(tmpBirth.month>=12){
				tmpBirth.year +=Math.floor(tmpBirth.month/12);
				tmpBirth.month = tmpBirth.month-(tmpBirth.year*12);
			}
		}
		return tmpBirth;
	};

export {
	debounce,
	throttle,
	imgTo,
	RoundNum,
	isSort,
	getAge
}