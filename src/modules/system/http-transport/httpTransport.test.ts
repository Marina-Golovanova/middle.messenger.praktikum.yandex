import { HTTPTransport } from './HTTPTransport';

describe('Test HTTPTransport', () => {
  let httpTransport: HTTPTransport | null = null;
  const TEST_URL = 'https://www.example.com/';

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

    httpTransport.get(TEST_URL);

    expect(httpTransport.get).toHaveBeenCalled();
  });

  test('post request was called', () => {
    if (!httpTransport) {
      return;
    }

    httpTransport.post(TEST_URL, {
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

    httpTransport.put(TEST_URL, {
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

    httpTransport.delete(TEST_URL, {
      data: JSON.stringify({
        id: 5,
      }),
    });

    expect(httpTransport.delete).toHaveBeenCalled();
  });
});
