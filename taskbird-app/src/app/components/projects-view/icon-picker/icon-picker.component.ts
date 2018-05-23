import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Project } from '../../../models/project';
import { ModalComponent } from '../../base/modal/modal.component';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'taskbird-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss']
})
export class IconPickerComponent implements OnInit {

  @Input()
  project: Project;

  @ViewChild(ModalComponent)
  private modal: ModalComponent;

  categories = ['shapes', 'general'];

  icons = {
    shapes: [
      'circle',
      'square',
      'star',
      'heart',

    ],

    general: [
      'smile',
      'frown',
      'gem',
    ],
  };

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
  }

  showModal() {
    this.modal.showModal();
  }

  selectIcon(icon: string) {
    this.projectService.updateProject({
      ...this.project,
      icon
    });
    this.modal.hideModal();
  }

}
