import { Component, input } from '@angular/core';
import { Character } from '@shared/interfaces/character';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  character = input.required<Character>();


}
