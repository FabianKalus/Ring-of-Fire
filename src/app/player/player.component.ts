import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() name: any;
  @Input() playerActive: boolean = false;
  @Input() icon: any;
  @Input() imageResult: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log('abddav', this.imageResult);
    console.log('balba', this.name)
  }

  openDialogEditPlayer(): void {
  }


}
