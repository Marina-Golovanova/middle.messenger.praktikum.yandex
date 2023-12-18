import { appRouter } from '@app-router/appRouter';
import { paths } from '@app-router/paths';

describe('Test router', () => {
  test('Test forward', () => {
    appRouter.forward();
    expect(window.history.length).toBe(1);
  });

  test('Test back', () => {
    appRouter.back();
    expect(window.history.length).toBe(1);
  });

  test('Router go to messenger', () => {
    appRouter.go(paths.messenger);
    expect(document.location.href).toBe(`http://localhost${paths.messenger}`);
  });

  test('Router go to notFount', () => {
    appRouter.go('some strange href');
    expect(document.location.href).toBe(`http://localhost${paths.notFound}`);
  });
});
