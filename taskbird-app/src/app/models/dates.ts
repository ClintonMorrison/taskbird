import { utc, Moment} from 'moment';

export interface Month {
  year: string;
  month: string;
}

export class Date {
  year: string;
  month: string;
  day: string;

  static fromMoment(moment: Moment) {
    return new Date(
      moment.format('YYYY'),
      moment.format('MM'),
      moment.format('DD')
    );
  }

  constructor(year, month, day) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  toString(): string {
    return `${this.year}-${this.month}-${this.day}`;
  }

  toMoment(): Moment {
    return utc(this.toString());
  }
}

