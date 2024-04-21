import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHeoesComponent } from './search-heoes.component';

describe('SearchHeoesComponent', () => {
  let component: SearchHeoesComponent;
  let fixture: ComponentFixture<SearchHeoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchHeoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchHeoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
