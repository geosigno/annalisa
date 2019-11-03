import dayjs from 'dayjs';
import 'dayjs/locale/fr';

dayjs.locale('fr');

const dateToFormat = (date) => dayjs(date).format('DD MMMM YYYY');

export default dateToFormat;
