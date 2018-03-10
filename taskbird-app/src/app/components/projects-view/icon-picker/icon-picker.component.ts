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

  icons = [
    'ambulance',
    'anchor',
    'balance scale',
    'bath',
    'battery full',
    'bed',
    'beer',
    'bicycle',
    'binoculars',
    'birthday cake',
    'bomb',
    'book',
    'bug',
    'building',
    'building',
    'calculator',
    'car',
    'child',
    'circle',
    'clock',
    'cloud',
    'coffee',
    'cog',
    'credit card',
    'cube',
    'cubes',
    'cut',
    'dollar sign',
    'envelope',
    'eye',
    'fire extinguisher',
    'flag',
    'football ball',
    'frown',
    'gamepad',
    'gem',
    'gift',
    'glass martini',
    'globe',
    'heart',
    'home',
    'idea',
    'key',
    'lab',
    'leaf',
    'legal',
    'lock',
    'magnet',
    'map signs',
    'map',
    'medkit',
    'microphone',
    'mobile',
    'money',
    'moon',
    'music',
    'paint brush',
    'paper plane',
    'paw',
    'phone',
    'plane',
    'plug',
    'puzzle',
    'question',
    'rain',
    'road',
    'rocket',
    'search',
    'shield',
    'shopping basket',
    'shopping cart',
    'shower',
    'smile',
    'snowflake',
    'spy',
    'spy',
    'square',
    'star',
    'stopwatch',
    'student',
    'subway',
    'suitcase',
    'sun',
    'taxi',
    'terminal',
    'thumbs up',
    'ticket',
    'tree',
    'trophy',
    'truck',
    'utensils',
    'wifi',
    'world',
    'wrench'
  ];

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
