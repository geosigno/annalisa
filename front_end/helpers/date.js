import dayjs from 'dayjs';
import 'dayjs/locale/fr';

dayjs.locale('fr');

export const dateToFormat = (date) => dayjs(date).format('DD MMMM YYYY');
export const dateToTime = (date) => dayjs(date).format('HH:mm');
