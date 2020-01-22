/**
 * @param str 字符串
 * @param num 需要截取多少个
 */
type SubstrToStar = (str: string, num: number) => string;
export const splitStrToStar: SubstrToStar = (str: string, num: number) => {
  return str.substr(0, num);
};
