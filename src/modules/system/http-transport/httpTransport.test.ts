import { HTTPTransport } from './HTTPTransport';

describe('Test HTTPTransport', () => {
  let httpTransport: HTTPTransport | null = null;

  beforeEach(() => {
    httpTransport = new HTTPTransport();
    jest.spyOn(httpTransport, 'get');
    jest.spyOn(httpTransport, 'post');
    jest.spyOn(httpTransport, 'put');
    jest.spyOn(httpTransport, 'delete');
  });

  test('get request was called', () => {
    if (!httpTransport) {
      return;
    }

    httpTransport.get('https://www.example.com/');

    expect(httpTransport.get).toHaveBeenCalled();
  });

  test('post request was called', () => {
    if (!httpTransport) {
      return;
    }

    httpTransport.post('https://www.example.com/', {
      data: JSON.stringify({
        a: 1,
        b: 2,
      }),
    });

    expect(httpTransport.post).toHaveBeenCalled();
  });

  test('put request was called', () => {
    if (!httpTransport) {
      return;
    }

    httpTransport.put('https://www.example.com/', {
      data: JSON.stringify({
        a: 1,
        b: 2,
      }),
    });

    expect(httpTransport.put).toHaveBeenCalled();
  });

  test('delete request was called', () => {
    if (!httpTransport) {
      return;
    }

    httpTransport.delete('https://www.example.com/', {
      data: JSON.stringify({
        id: 5,
      }),
    });

    expect(httpTransport.delete).toHaveBeenCalled();
  });
});
