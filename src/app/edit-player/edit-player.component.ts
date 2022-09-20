import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  allProfileImage = ['goat.png', 'monkey.png', 'tiger.png', 'giraffe.png'];

  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<EditPlayerComponent>) { }

  ngOnInit(): void {
  }


}
