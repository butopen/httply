import dayjs from 'dayjs';

const r = /^\d+$/;

function getDate(value) {
  let v = value;
  if (r.test(value)) v = +value;
  if (typeof v === 'string' || v instanceof String) return new Date(Date.parse(v as string));
  else if (v instanceof Date) return v as Date;
  else if (!isNaN(v)) return new Date(v as number);
  else return new Date(value);
}

export function formatDate(date) {
  return dayjs(getDate(date)).format('YYYY-MM-DD HH:mm:ss');
}
