export function format(date, fmt = 'YYYY-MM-DD') {

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