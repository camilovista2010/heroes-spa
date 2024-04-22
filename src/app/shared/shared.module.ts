import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { CardComponent } from './components/card/card.component';
import { CharacterFormComponent } from './components/character-form/character-form.component';
import { CardSmallComponent } from './components/card-small/card-small.component';
import { CapitalizeFirstPipe } from "./pipe/capitalize-first.pipe";


@NgModule({
  declarations: [CardComponent, CharacterFormComponent,CardSmallComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    CapitalizeFirstPipe
  ],
  exports: [
    MaterialModule,
    CardComponent,
    CardSmallComponent,
    CharacterFormComponent,
    ReactiveFormsModule
  ],
  providers: [
  ]
})
export class SharedModule { }
