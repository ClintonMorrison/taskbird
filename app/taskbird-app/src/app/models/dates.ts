import { utc, Moment} from 'moment';

export class Month {
  year: string;
  month: string;

  static fromMoment(moment: Moment) {
    return new Month(
      moment.format('YYYY'),
      moment.format('MM'),
    );
  }

  constructor(year: string, month: string) {
    this.year = year;
    this.month = month;
  }

  toMoment(): Moment {
    return utc(`${this.year}-${this.month}-01`);
  }

  getNext(): Month {
    return Month.fromMoment(this.toMoment().add(1, 'month'));
  }

  getPrevious(): Month {
    return Month.fromMoment(this.toMoment().subtract(1, 'month'));
  }
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

  equals(date: Date): boolean {
    if (!date) {
      return false;
    }

    return date.year === this.year &&
      date.month === this.month &&
      date.day === this.day;
  }
}

