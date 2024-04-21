import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { CardComponent } from './components/card/card.component';
import { CharacterFormComponent } from './components/character-form/character-form.component';

@NgModule({
  declarations: [CardComponent, CharacterFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  exports: [
    MaterialModule,
    CardComponent,
    CharacterFormComponent,
    ReactiveFormsModule
  ],
  providers: [
  ]
})
export class SharedModule { }
