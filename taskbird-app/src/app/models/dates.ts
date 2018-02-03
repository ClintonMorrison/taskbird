import { Moment} from 'moment';

export interface Month {
  year: string;
  month: string;
}

export interface Date {
  year: string;
  month: string;
  day: string;
}

export const momentToDate = (moment: Moment) => {
  return {
    year: moment.format('YYYY'),
    month: moment.format('MM'),
    day: moment.format('DD')
  };
};
