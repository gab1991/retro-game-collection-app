import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';

import { EVideoType, IUploadableElmemnt, TToggleableEmls } from 'Routes/GameDetailed/reducer/types';

import { OvalSpinner } from 'Components/UI';
import { ChevronSvg, EscSvg } from 'Components/UI/LogoSvg';
import { useGameDetailedContext } from 'Routes/GameDetailed/context';
import { selectVideos } from 'Routes/GameDetailed/reducer/selectors';
import { getVideo } from 'Routes/GameDetailed/reducer/thunks';

import styles from './VideoSection.module.scss';

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
          <div
            role='button'
            tabIndex={0}
            className={`${styles.VideoLabel}`}
            data-elm={elm}
            onKeyPress={toggleBlockVisibilty}
            onClick={toggleBlockVisibilty}
          >
            <h2>{heading}</h2>
            <div className={styles.DropDownSvgContainer}>
              {video.show ? <EscSvg /> : <ChevronSvg className={styles.ChevronSvg} />}
            </div>
            <hr></hr>
          </div>
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
