import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TaskService } from '../../../services/item.service';
import { Task } from '../../../models/item';
import { utc } from 'moment';
import { ModalComponent } from '../../base/modal/modal.component';

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


  dateString: string;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    this.dateString = utc(this.task.date_due).format('MMM DD, YYYY');
  }

  showModal() {
    this.modal.showModal();
  }

}
