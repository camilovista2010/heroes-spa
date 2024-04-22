import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CharacterFormComponent } from './character-form.component';
import { AlertService } from '@shared/services/alert.service'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CharacterFormComponent', () => {
  let component: CharacterFormComponent;
  let fixture: ComponentFixture<CharacterFormComponent>;
  let alertServiceMock: any;

  beforeEach(async () => {
    alertServiceMock = {
      showError: jasmine.createSpy('showError')
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, BrowserAnimationsModule], 
      providers: [
        { provide: AlertService, useValue: alertServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterFormComponent);
    component = fixture.componentInstance;
    if (component.propsCharacter()) {
      fixture.componentRef.setInput('propsCharacter' , {
        id: 1,
        name: 'Iron Man',
        description: 'A wealthy industrialist and genius inventor.',
        thumbnail: { path: 'path/to/image', extension: 'jpg' }
      })
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty fields if no character is provided', () => {
    component.ngOnInit();
    expect(component.characterForm.value.name).toEqual('');
    expect(component.characterForm.value.description).toEqual('');
  });

  it('should validate form as invalid when fields are empty', () => {
    component.characterForm.controls['name'].setValue('');
    component.characterForm.controls['description'].setValue('');
    expect(component.characterForm.valid).toBeFalsy();
  });

  // it('should emit character data when form is valid and submitted', () => {
  //   spyOn(component.onReceiveData, 'emit');
  //   component.characterForm.controls['name'].setValue('Spider-Man');
  //   component.characterForm.controls['description'].setValue('Friendly neighborhood superhero');
  //   component.onSubmit();
  //   expect(component.onReceiveData.emit).toHaveBeenCalled();
  // });

  it('should display error message when form is invalid and submitted', () => {
    component.characterForm.controls['name'].setValue('');
    component.onSubmit();
    expect(alertServiceMock.showError).toHaveBeenCalled();
  });
 
});
