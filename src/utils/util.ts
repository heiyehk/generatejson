class Utils {
  public getTime(formatter: string, time?: string | Date): string {
    const date = (time ? new Date(time) : new Date());
    const Y = date.getFullYear() + '';
    const M = date.getMonth() + 1;
    const D = date.getDate();
    const H = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    return formatter.replace(/YYYY|yyyy/g, Y)
      .replace(/YY|yy/g, Y.substr(2, 2))
      .replace(/MM/g, (M < 10 ? '0' : '') + M)
      .replace(/DD/g, (D < 10 ? '0' : '') + D)
      .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
      .replace(/mm/g, (m < 10 ? '0' : '') + m)
      .replace(/ss/g, (s < 10 ? '0' : '') + s);
  }

  public catchError(str: string): string {
    if (str.includes('in JSON at position')) {
      // 不是json格式
      return 'Please enter something in `json` format';
    } else if (str.includes(`property 'split' of`)) {
      // 没有data格式
      return 'Please enter a format containing `data`';
    }
    return 'unknown error';
  }
}

export default new Utils();
