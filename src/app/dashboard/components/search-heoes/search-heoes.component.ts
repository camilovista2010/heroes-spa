import { Component } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-search-heoes',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './search-heoes.component.html',
  styleUrl: './search-heoes.component.scss'
})
export class SearchHeoesComponent {

}
