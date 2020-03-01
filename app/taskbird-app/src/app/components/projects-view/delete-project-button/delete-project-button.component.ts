import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalComponent } from '../../base/modal/modal.component';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'taskbird-delete-project-button',
  templateUrl: './delete-project-button.component.html',
  styleUrls: ['./delete-project-button.component.scss']
})
export class DeleteProjectButtonComponent implements OnInit {

  @Input()
  project: Project;

  @ViewChild(ModalComponent)
  private modal: ModalComponent;

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
  }

  showModal() {
    this.modal.showModal();
  }

  modalClosed(confirmed: boolean) {
    if (confirmed && this.project) {
      this.projectService.deleteProject(this.project.id);
    }
  }

}
