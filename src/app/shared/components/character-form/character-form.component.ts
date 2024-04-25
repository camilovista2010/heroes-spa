import { Component, OnInit, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Character } from '@shared/interfaces/character';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-character-form',
  standalone: false,
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.scss'
})
export class CharacterFormComponent implements OnInit  {
 

  onReceiveData = output<Character>();
  propsCharacter = input<Character | undefined>();


  characterForm!: FormGroup;
  private fileInput?: File;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.characterForm = new FormGroup({
      name: new FormControl(this.propsCharacter()?.name ?? '', Validators.required),
      description: new FormControl(this.propsCharacter()?.description ?? '', Validators.required),
      thumbnail: new FormGroup({
        path: new FormControl(this.propsCharacter()?.thumbnail?.path ?? ''),
        extension: new FormControl(this.propsCharacter()?.thumbnail?.extension ?? '')
      })
    });
  }

  onSubmit(): void {
    if (this.characterForm.valid) {
      const formValue = this.characterForm.value as Character;
      if (this.propsCharacter() === undefined) {
        this.handleFileUpload().then(thumbnail => {
          if (thumbnail.path) {
            formValue.thumbnail = thumbnail;
          }
          this.emitCharacterData(formValue);
        });
      }else {
        this.emitCharacterData(formValue);
      }
     
    } else {
      this.displayFormErrors();
    }
  }

  private async handleFileUpload() {
    if (this.fileInput) {
      const blobUrl = URL.createObjectURL(this.fileInput);
      const extension = this.fileInput.name.split('.').pop() ?? '';
      return { path: blobUrl, extension };
    }
    return { path: '', extension: '' };
  }

  private emitCharacterData(character: Character): void {
    if (this.propsCharacter()?.id) {
      character.id = this.propsCharacter()?.id ?? -1;
    }
    this.onReceiveData.emit(character);
  }

  private displayFormErrors(): void {
    const errors = Object.keys(this.characterForm.controls)
      .map(field => {
        const control = this.characterForm.get(field);
        if (control?.invalid) {
          return `Campo ${field} error: ${Object.keys(control.errors ?? {}).join(', ')}`;
        }
        return '';
      })
      .filter(error => error.length > 0)
      .join('\n');

    this.alertService.showError(errors);
  }

  handleFileInput(event: any): void {
    this.fileInput = event.target.files[0];
  }
  
}
