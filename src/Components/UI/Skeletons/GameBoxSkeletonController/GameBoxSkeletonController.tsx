import React from 'react';

import { GenesisBoxSvg, NesBoxSvg, PsOneBoxSvg, SkeletonLinGradId, SkeletonLinGradSvg } from 'Components/UI/LogoSvg';
import { TPlatformNames } from 'Configs/appConfig';

interface IGameBoxSkeletonController extends React.SVGProps<SVGSVGElement> {
  platform: TPlatformNames;
}

export function GameBoxSkeletonController(props: IGameBoxSkeletonController): JSX.Element | null {
  const { platform, ...restProps } = props;

  const commonProps = {
    innerComponent: <SkeletonLinGradSvg />,
    pathFill: `url(#${SkeletonLinGradId})`,
    ...restProps,
  };

  switch (platform) {
    case 'Genesis':
      return <GenesisBoxSvg {...commonProps} />;
    case 'PlayStation':
      return <PsOneBoxSvg {...commonProps} />;
    case 'NES':
      return <NesBoxSvg {...commonProps} />;
    default:
      return null;
  }
}
