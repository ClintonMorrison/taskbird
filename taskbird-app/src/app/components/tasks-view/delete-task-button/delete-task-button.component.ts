import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalComponent } from '../../base/modal/modal.component';
import { Task } from '../../../models/item';
import { TaskService } from '../../../services/item.service';

@Component({
  selector: 'taskbird-delete-task-button',
  templateUrl: './delete-task-button.component.html',
  styleUrls: ['./delete-task-button.component.scss']
})
export class DeleteTaskButtonComponent implements OnInit {

  @Input()
  task: Task;

  @ViewChild(ModalComponent)
  private modal: ModalComponent;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
  }

  showModal() {
    this.modal.showModal();
  }

  modalClosed(confirmed: boolean) {
    if (confirmed) {
      this.taskService.deleteTask(this.task.id);
    }
  }

}
