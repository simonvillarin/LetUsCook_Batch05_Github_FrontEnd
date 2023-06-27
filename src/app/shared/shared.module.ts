import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    MatDialogModule,
    HttpClientModule,
    FileUploadModule,
    ToastModule,
    MessagesModule,
    TableModule,
    DropdownModule,
    TooltipModule,
  ],
  exports: [
    MatIconModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    MatDialogModule,
    FileUploadModule,
    ToastModule,
    TableModule,
    DropdownModule,
    TooltipModule,
  ],
})
export class SharedModule {}
