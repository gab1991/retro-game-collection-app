import React from 'react';
import { useSelector } from 'react-redux';

import { DeepReadonly } from 'utility-types';

import { Slider } from 'Components/UI';
import { EbayLogo } from 'Components/UI/LogoSvg';
import { selectIsMobile } from 'Store/appStateReducer/selectors';
import { IEbayCardItemData } from 'Typings/EbayData';

import styles from './EbayCardLeftPart.module.scss';

const MOBILE_DIMENSIONS = {
  height: 190,
  width: 150,
};

const DESKTOP_DIMENSIONS = {
  height: 220,
  width: 200,
};

interface IEbayCardLeftPartProps {
  itemData: DeepReadonly<IEbayCardItemData>;
}

export function EbayCardLeftPart(props: IEbayCardLeftPartProps): JSX.Element {
  const { itemData } = props;
  const isMobile = useSelector(selectIsMobile);

  return (
    <div className={styles.ImgArea}>
      <Slider
        transition='off'
        images={[...itemData.pictures]}
        imageWidth={isMobile ? MOBILE_DIMENSIONS.width : DESKTOP_DIMENSIONS.width}
        imageHeight={isMobile ? MOBILE_DIMENSIONS.height : DESKTOP_DIMENSIONS.height}
        navDots
        imgFit={'cover'}
      />
      <a className={styles.SvgWrapper} href={itemData.itemUrl} rel='noopener noreferrer' target='_blank'>
        <EbayLogo />
      </a>
    </div>
  );
}
