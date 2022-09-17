import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

interface Profilimg {
  value: string;
  name: string;
  src: string;

}

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {
  name: string = '';
  imageResult: string = '';
  profilImages: Profilimg[] = [
    {value: 'tiger-0', name: 'tiger', src: 'assets/img/tiger.png'},
    {value: 'goat-1', name: 'goat', src: 'assets/img/goat.png'},
    {value: 'monkey-2', name: 'monkey', src: 'assets/img/monkey.png'},
    {value: 'giraffe-3', name: 'giraffe', src: 'assets/img/giraffe.png'},
  ];



  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<DialogAddPlayerComponent>) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
    
  }

 

}
