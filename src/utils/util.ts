type GetTime = (formatter: string, time?: string | Date) => string;

class Utils {
  public getTime: GetTime = (formatter: string, time: string | Date = '') => {
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
}

export default new Utils();
