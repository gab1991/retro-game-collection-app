import { TPlatformNames } from 'Configs/appConfig';

export const SORTABLE_ID_DELIMETER = '^';

export const formSortableId = (platform: TPlatformNames, slug: string): string =>
  `${platform}${SORTABLE_ID_DELIMETER}${slug}`;
