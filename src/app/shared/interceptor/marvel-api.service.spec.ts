import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AlertService } from '@shared/services/alert.service';
import { environment } from 'src/environments/environment';
import { MarvelApiInterceptor } from './marvel-api.service';

describe('MarvelApiInterceptor', () => {
  let client: HttpClient;
  let httpMock: HttpTestingController;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;

  beforeEach(() => {
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['showError']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: MarvelApiInterceptor, multi: true },
        { provide: AlertService, useValue: alertServiceSpy }
      ]
    });

    client = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('debería agregar parámetros de autenticación a la petición HTTP', () => {
    const dummyResponse = { success: true };
    client.get('/data').subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(r => r.url === '/data');
    expect(req.request.params.get('apikey')).toEqual(environment.PUBLIC_KEY);
    expect(req.request.params.get('ts')).toBeTruthy();
    expect(req.request.params.get('hash')).toBeTruthy();
    req.flush(dummyResponse);
  });

  it('debería manejar errores HTTP y mostrar un mensaje de error', () => {
    client.get('/data').subscribe(
      response => fail('should have failed with the 401 error'),
      error => {
        expect(error).toContain('Error 401:');
      }
    );

    const req = httpMock.expectOne('/data');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    expect(alertServiceSpy.showError).toHaveBeenCalled();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
