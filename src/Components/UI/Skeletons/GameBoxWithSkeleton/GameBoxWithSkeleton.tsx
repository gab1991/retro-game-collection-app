import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { IRootState } from 'Store/types';

import { GameBoxSkeletonController } from '../GameBoxSkeletonController';
import { fileApi } from 'Api/fileApi';
import { TPlatformNames } from 'Configs/appConfig';
import { selectBoxArt } from 'Store/contentReducer/selectors';

interface IGameBoxInfoSkeletonProps {
  imgClassName?: string;
  name: string;
  platform: TPlatformNames;
}

export function GameBoxWithSkeleton(props: IGameBoxInfoSkeletonProps): JSX.Element {
  const { name, platform, imgClassName } = props;
  const boxArtUrl = useSelector<IRootState, string | void>((state) => selectBoxArt(state, platform, name));

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {boxArtUrl && (
        <img
          src={fileApi.formPath(boxArtUrl)}
          alt={name}
          onLoad={() => setIsLoaded(true)}
          style={{ display: isLoaded ? 'inline' : 'none' }}
          className={imgClassName}
        ></img>
      )}
      {!isLoaded && <GameBoxSkeletonController platform={platform} />}
    </>
  );
}
