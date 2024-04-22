import { Component, input, OnInit } from '@angular/core';
import { Character } from '@shared/interfaces/character';

@Component({
  selector: 'app-card-small',
  standalone: false,
  templateUrl: './card-small.component.html',
  styleUrl: './card-small.component.scss'
})

export class CardSmallComponent {
  character = input.required<Character>();
}
