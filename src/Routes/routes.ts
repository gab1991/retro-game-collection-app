import { TPlatformNames } from 'Configs/appConfig';
import { EProfileSections } from 'Routes/Profile/Profile';

type TRoutes = {
  GameDetailed: {
    makePath: (platformName: TPlatformNames, slug: string) => string;
    template: string;
  };
  GameSelector: {
    makePath: (platformName: TPlatformNames) => string;
    template: string;
  };
  PlatformSelector: {
    makePath: () => string;
    template: string;
  };
  Profile: {
    makePath: (section?: EProfileSections) => string;
    template: string;
  };
};

export const Routes: TRoutes = {
  GameDetailed: {
    makePath: (platformName: TPlatformNames, slug: string) => `/${platformName}/${slug}`,
    template: '/:platformName/:slug',
  },
  GameSelector: {
    makePath: (platformName) => `/${platformName}`,
    template: '/:platformName',
  },
  PlatformSelector: {
    makePath: () => '/',
    template: '/',
  },
  Profile: {
    makePath: (section) => `/profile/${section || ''}`,
    template: '/profile/:section?',
  },
};
