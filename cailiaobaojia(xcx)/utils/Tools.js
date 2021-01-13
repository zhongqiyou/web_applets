const app = getApp()
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
          }, interval)
        } else {
          last = now
          fun.apply(ctx, args)
        }
    }
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
 * date [number] 时间戳或者时间标准
 * fmt [string] 时间格式
 */
function format(date, fmt = 'YYYY-MM-DD') {

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

/*
 * num [function] 传入的数字
 * decimal [number] 需要保留几位小数
 */
function RoundNum(num, decimal) {
	Math.round(num * 10 ** decimal) / 10 ** decimal;
}

//   显示消息框
function toast(str,icon = 'none',delay = 1500){
  wx.showToast({
    title: str,
    icon,
    duration: delay,
    mask: true
  });
}

//     拨打电话  
function callTel(phone){
  wx.makePhoneCall({
    phoneNumber: phone,
    fail: ()=>{
      return 0;
    }
  })
}
// 时间转换 年-月-日
function dateFormat(dateData) {
	var date = new Date(dateData)
	var y = date.getFullYear()
	var m = date.getMonth() + 1
	m = m < 10 ? ('0' + m) : m
	var d = date.getDate()
	d = d < 10 ? ('0' + d) : d
	const time = y + '年' + m + '月' + d + '日'
	return time
} 

// 数组去重
function unique(arr){
    return Array.from(new Set(arr))
}

export {
  debounce,
  throttle,
  isSort,
	imgTo,
	RoundNum,
  callTel,
  toast,
	format ,
	dateFormat ,
	unique
}