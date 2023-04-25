import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({

  exports: [
    ButtonModule,
    DropdownModule,
    CardModule,
    InputNumberModule,
    DialogModule,
    MessagesModule,
    InputTextModule

  ],
  imports: [
    CommonModule,
  ]
})
export class PrimengModule { }
