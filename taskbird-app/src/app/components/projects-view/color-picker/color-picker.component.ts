import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Project } from '../../../models/project';
import { ModalComponent } from '../../base/modal/modal.component';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'taskbird-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {

  @Input()
  project: Project;

  @ViewChild(ModalComponent)
  private modal: ModalComponent;

  colors = [
    'black',
    'grey',
    'brown',
    'pink',
    'purple',
    'violet',
    'blue',
    'teal',
    'green',
    'olive',
    'yellow',
    'orange',
    'red'
  ];

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
  }

  showModal() {
    this.modal.showModal();
  }

  selectColor(color: string) {
    this.projectService.updateProject({
      ...this.project,
      color
    });
    this.modal.hideModal();
  }

  clearColor() {
    this.selectColor('black');
  }

}
