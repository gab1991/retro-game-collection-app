import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';

import { EVideoType, IUploadableElmemnt, TToggleableEmls } from 'Routes/GameDetailed/reducer/types';

import { OvalSpinner } from 'Components/UI';
import { useGameDetailedContext } from 'Routes/GameDetailed/context';
import { selectVideos } from 'Routes/GameDetailed/reducer/selectors';
import { getVideo } from 'Routes/GameDetailed/reducer/thunks';

import styles from './VideoSection.module.scss';

import { SectionHeader } from '..';

interface IVideoElms {
  className: string;
  elm: TToggleableEmls;
  heading: string;
  video: IUploadableElmemnt;
}

export function VideoSection(): JSX.Element {
  const dispatch = useDispatch();
  const { toggleBlockVisibilty, name, platform } = useGameDetailedContext();
  const { gameplayVideo, soundtrackVideo } = useSelector(selectVideos);

  const videoElms: IVideoElms[] = [
    {
      className: styles.VideoSoundtrack,
      elm: 'soundtrackVideo',
      heading: 'Soundtrack',
      video: soundtrackVideo,
    },
    {
      className: styles.VideoGameplay,
      elm: 'gameplayVideo',
      heading: 'Gameplay',
      video: gameplayVideo,
    },
  ];

  useEffect(() => {
    if (!name) return;
    if (soundtrackVideo.show && !soundtrackVideo.url) {
      dispatch(getVideo(EVideoType.soundtrack, platform, name));
    }
    if (gameplayVideo.show && !gameplayVideo.url) {
      dispatch(getVideo(EVideoType.gameplay, platform, name));
    }
  }, [soundtrackVideo, gameplayVideo, name, platform, dispatch]);

  return (
    <div className={styles.VideoSection}>
      {videoElms.map(({ className, elm, heading, video }) => (
        <div className={className} key={elm}>
          <SectionHeader
            isOpen={video.show}
            onClick={toggleBlockVisibilty}
            data-elm={elm}
            className={styles.SectionHeader}
          >
            {heading}
          </SectionHeader>
          {video.show && (
            <div className={styles.PlayerWrapper}>
              {!video.url && (
                <div className={styles.OvalSpinnerWrapper}>
                  <OvalSpinner />
                </div>
              )}
              {video.url && (
                <ReactPlayer
                  url={video.url}
                  className={styles.ReactPlayer}
                  height='100%'
                  width='100%'
                  controls={true}
                  playing={false}
                  light
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
