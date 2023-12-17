import { pathsToModuleNameMapper } from 'ts-jest';
import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: '.',
  roots: ['<rootDir>'],
  modulePaths: ['.'],
  moduleNameMapper: pathsToModuleNameMapper({
    '@modules/*': ['src/modules/*'],
    '@components/*': ['src/components/*'],
    '@layouts/*': ['src/layouts/*'],
    '@pages/*': ['src/pages/*'],
    '@utils/*': ['src/utils/*'],
    '@app-router/*': ['src/app-router/*'],
    '@types': ['src/types.ts'],
    '@constants': ['src/constants.ts'],
  }),
};

export default jestConfig;
