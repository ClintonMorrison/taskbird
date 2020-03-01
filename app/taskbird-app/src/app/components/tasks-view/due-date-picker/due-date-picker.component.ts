import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/item';
import { utc } from 'moment';
import { ModalComponent } from '../../base/modal/modal.component';
import { Month, Date } from '../../../models/dates';
import { DateService } from '../../../services/date.service';

@Component({
  selector: 'taskbird-due-date-picker',
  templateUrl: './due-date-picker.component.html',
  styleUrls: ['./due-date-picker.component.scss']
})
export class DueDatePickerComponent implements OnInit {

  @Input()
  task: Task;

  @ViewChild(ModalComponent)
  private modal: ModalComponent;

  private today: Date;


  dateString: string;
  monthString: string;
  selectedDate: Date;

  month: Month;
  weeksForMonth: Date[][];

  daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  constructor(
    private taskService: TaskService,
    private dateService: DateService
  ) { }

  ngOnInit(
  ) {
    this.today = Date.fromMoment(utc().local());
    this.resetSelectedDate();
    this.refreshMonth();
  }

  ngOnChanges(changes) {
    if (changes.task) {
      this.dateString = this.task.date_due ?
        utc(this.task.date_due).format('MMM DD, YYYY') :
        'Click to choose a date';
    }
    if (changes.month) {
      this.refreshMonth();
    }
  }

  showModal() {
    this.resetSelectedDate();
    this.refreshMonth();
    this.modal.showModal();
  }

  refreshMonth() {
    this.monthString = this.month.toMoment().format('MMM, YYYY');

    const days = this.dateService.getDatesForCalendar(this.month);
    this.weeksForMonth = this.dateService.groupIntoWeeks(days);
  }

  dayIsToday(date: Date): boolean {
    return date.equals(this.today);
  }

  dayIsInCurrentMonth(date: Date): boolean {
    return date.month === this.month.month && date.year === this.month.year;
  }

  dayIsSelected(date: Date): boolean {
    return date.equals(this.selectedDate);
  }

  handleDateSelected(e, date) {
    this.selectedDate = date;
  }

  goToPrevious() {
    this.month = this.month.getPrevious();
    this.refreshMonth();
  }

  goToNext() {
    this.month = this.month.getNext();
    this.refreshMonth();
  }

  modalClosed(confirmed: boolean) {
    if (confirmed) {
      const updatedTask = {
        ...this.task,
        date_due: this.selectedDate.toMoment().format('YYYY-MM-DD')
      };

      this.taskService.updateTask(updatedTask);
    }
  }

  clearDate() {
    const updatedTask = { ...this.task, date_due: null };
    this.taskService.updateTask(updatedTask);
  }

  resetSelectedDate() {
    if (this.task.date_due) {
      const dateDue = utc(this.task.date_due);
      this.selectedDate = Date.fromMoment(dateDue);
      this.month = Month.fromMoment(dateDue);
    } else {
      this.selectedDate = this.today;
      this.month = Month.fromMoment(utc());
    }
  }
}
