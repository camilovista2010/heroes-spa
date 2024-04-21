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

  characterForm!: FormGroup;

  onReceiveData = output<Character>();
  propsCharacter = input<Character | undefined>();

  private fileInput : File | undefined;
  

  constructor( 
    private alertService: AlertService
  ) {
  }

  ngOnInit() { 
    this.characterForm = new FormGroup({
      name: new FormControl(this.propsCharacter()?.name ?? '' , Validators.required),
      description: new FormControl(this.propsCharacter()?.description ?? '', Validators.required),
      thumbnail: new FormGroup({
        path: new FormControl(''),
        extension: new FormControl('')
      })
    })

  }


  onSubmit() {
    if (this.characterForm.valid) {
      if (this.propsCharacter()) {
        const fileForUpload = this.handleFileUpload();
        if (fileForUpload.path !== '') {
          this.characterForm.get('thumbnail')?.setValue({
            path: fileForUpload.path,
            extension: fileForUpload.extension
          });
        } 
      }
      this.onReceiveData.emit(this.characterForm.value)
    }else { 
      const textError = Object.keys(this.characterForm.controls ?? {}).map(error => {
        const errorKeys = this.characterForm.controls[error].errors; 
        if (errorKeys) { 
          return `Campo ${error} error: ${Object.keys(errorKeys).join('\n')} `;
        }else {
          return '';
        } 
      }).join('\n')

      this.alertService.showError(textError);
    }
  }

  handleFileUpload() {

    const thumbnail = {
      extension: '',
      path: ''
    };

    if (this.fileInput) { 
      const blobUrl = URL.createObjectURL(this.fileInput); 
      const extension = this.fileInput.name.split('.').pop(); 
      thumbnail.extension = extension ?? '';
      thumbnail.path = blobUrl;
    }
    return thumbnail;
  }


  GetFileOnLoad(event: any) {
    var file = event.target.files[0];
    this.fileInput = file;
    var element = document.getElementById("fakeFileInput") as HTMLInputElement | null;
    if(element != null) {
      element.value = file?.name;
    }
  }
  
  
}
