import React from 'react';

import { TPlatformNames } from 'Configs/appConfig';
import { EProfileSections } from 'Routes/Profile/Profile';

//ASYNC ROUTES
export const GameDetailedAsync = React.lazy(() =>
  import(
    /* webpackChunkName: "GameDetailedPage" */
    './GameDetailed'
  ).then((module) => ({ default: module.GameDetailed }))
);

export const ProfileAsync = React.lazy(() =>
  import(
    /* webpackChunkName: "ProfilePage" */
    './Profile'
  ).then((module) => ({ default: module.Profile }))
);

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
