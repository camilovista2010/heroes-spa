import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from './alert.service';
import { of } from 'rxjs';

describe('AlertService', () => {
  let service: AlertService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        AlertService,
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    });

    service = TestBed.inject(AlertService);
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería abrir un snackbar con mensaje de error', () => {
    const message = "Error al cargar los datos";
    service.showError(message);
    expect(snackBarSpy.open).toHaveBeenCalledWith(message, 'Ok', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['mat-snack-bar-container-error']
    });
  });

  it('debería abrir un snackbar con mensaje de información', () => {
    const message = "Información actualizada correctamente";
    service.showInfo(message);
    expect(snackBarSpy.open).toHaveBeenCalledWith(message, 'Ok', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['mat-snack-bar-container-info']
    });
  });

  it('debería abrir un snackbar con mensaje de éxito', () => {
    const message = "Operación exitosa";
    service.showSuccess(message);
    expect(snackBarSpy.open).toHaveBeenCalledWith(message, 'Ok', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['mat-snack-bar-container-success']
    });
  });
});