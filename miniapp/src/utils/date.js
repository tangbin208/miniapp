 export function format(t,fmt) {
    var o = {
        "M+": t.getMonth() + 1, // 月份
        "d+": t.getDate(), // 日
        "h+": t.getHours(), // 小时
        "m+": t.getMinutes(), // 分
        "s+": t.getSeconds(), // 秒
        "q+": Math.floor((t.getMonth() + 3) / 3), // 季度
        "S": t.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (t.getFullYear() + ""));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
