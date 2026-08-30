/**
 * 将日期格式化为 YYYY-MM-DD。
 * 支持 Date 对象、日期字符串或时间戳。
 */
export function formatDate(input: Date | string | number): string {
  const date = input instanceof Date ? input : new Date(input);

  if (Number.isNaN(date.getTime())) {
    throw new RangeError('Invalid date');
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
