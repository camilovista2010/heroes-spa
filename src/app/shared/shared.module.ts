import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { CardComponent } from './components/card/card.component';
import { CharacterFormComponent } from './components/character-form/character-form.component';
import { CapitalizeFirstPipe } from "./pipe/capitalize-first.pipe";

@NgModule({
    declarations: [CardComponent, CharacterFormComponent],
    exports: [
        MaterialModule,
        CardComponent,
        CharacterFormComponent,
        ReactiveFormsModule
    ],
    providers: [],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,
        NgOptimizedImage,
        CapitalizeFirstPipe
    ]
})
export class SharedModule { }
