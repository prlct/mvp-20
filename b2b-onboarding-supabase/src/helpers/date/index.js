import { DateTime } from 'luxon';

export const toLocalDate = (date) => DateTime.local(date).toFormat('LL/dd/yy');
