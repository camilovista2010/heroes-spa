import { CapitalizeFirstPipe } from './capitalize-first.pipe';

describe('CapitalizeFirstPipe', () => {
  let pipe: CapitalizeFirstPipe;

  beforeEach(() => {
    pipe = new CapitalizeFirstPipe();
  });

  it('debería crear una instancia', () => {
    expect(pipe).toBeTruthy();
  });

  it('debería retornar la misma cadena si es vacía', () => {
    expect(pipe.transform('')).toEqual('');
  });

  it('debería capitalizar la primera letra y poner en minúscula el resto', () => {
    expect(pipe.transform('hola mundo')).toEqual('Hola mundo');
  });

  it('debería funcionar correctamente con mayúsculas en el medio de la palabra', () => {
    expect(pipe.transform('anGULAR')).toEqual('Angular');
  });

  it('debería manejar correctamente las cadenas con solo una letra', () => {
    expect(pipe.transform('a')).toEqual('A');
    expect(pipe.transform('B')).toEqual('B');
  });

  it('debería manejar correctamente las cadenas con espacios al inicio o al final', () => {
    expect(pipe.transform(' angular ')).toEqual(' angular ');
  });
});
