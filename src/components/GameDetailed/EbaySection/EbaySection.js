import React, { useState, useEffect } from 'react';
import styles from './EbaySection.css';
import Backend from '../../../Backend/Backend';
import EbayItemCard from '../EbaySection/EbayItemCard/EbayItemCard';

const sample = [
  {
    itemId: ['223956138479'],
    title: [
      'Spider-Man Venom Maximum Carnage (Sega Genesis, 1994) Case Only Authentic'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['182175'],
        categoryName: ['Original Game Cases & Boxes']
      }
    ],
    galleryURL: [
      'https://thumbs4.ebaystatic.com/m/mDYYzKwqlarNz7LoFPby7vA/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Spider-Man-Venom-Maximum-Carnage-Sega-Genesis-1994-Case-Only-Authentic-/223956138479'
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    postalCode: ['701**'],
    location: ['New Orleans,LA,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '3.99'
          }
        ],
        shippingType: ['Flat'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '9.99'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '9.99'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P21DT3H13M31S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-03-24T19:01:55.000Z'],
        endTime: ['2020-04-24T19:01:55.000Z'],
        listingType: ['StoreInventory'],
        gift: ['false'],
        watchCount: ['2']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['6000'],
        conditionDisplayName: ['Acceptable']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['true']
  },
  {
    itemId: ['323949635012'],
    title: [
      'Seperation Anxiety Venom Carnage Spiderman Sega Genesis Original Case + Insert'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['182174'],
        categoryName: ['Manuals, Inserts & Box Art']
      }
    ],
    galleryURL: [
      'https://thumbs1.ebaystatic.com/m/mjXsk8FbaXm-VV4OFqTm7tQ/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Seperation-Anxiety-Venom-Carnage-Spiderman-Sega-Genesis-Original-Case-Insert-/323949635012'
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    postalCode: ['981**'],
    location: ['Seattle,WA,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['2']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '12.5'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '12.5'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P13DT0H35M42S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2019-10-16T16:24:06.000Z'],
        endTime: ['2020-04-16T16:24:06.000Z'],
        listingType: ['StoreInventory'],
        gift: ['false'],
        watchCount: ['2']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['4000'],
        conditionDisplayName: ['Very Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['223963526197'],
    title: [
      'Spider-Man & Venom: Maximum Carnage (Sega Genesis) - CIB Manual Game - Rep Cover'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs2.ebaystatic.com/m/mUGEDZUtddLsMjbLJoGTqFA/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Spider-Man-Venom-Maximum-Carnage-Sega-Genesis-CIB-Manual-Game-Rep-Cover-/223963526197'
    ],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '1363'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    postalCode: ['800**'],
    location: ['Louisville,CO,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['FlatDomesticCalculatedInternational'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['3']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '19.98'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '19.98'
          }
        ],
        bidCount: ['0'],
        sellingState: ['Active'],
        timeLeft: ['P4DT18H58M57S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['true'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-04-01T10:47:21.000Z'],
        endTime: ['2020-04-08T10:47:21.000Z'],
        listingType: ['Auction'],
        gift: ['false'],
        watchCount: ['3']
      }
    ],
    returnsAccepted: ['false'],
    condition: [
      {
        conditionId: ['4000'],
        conditionDisplayName: ['Very Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['153881479114'],
    title: [
      'Maximum Carnage Sega Genesis Game Authentic Cartridge Only Spider-Man Venom'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs3.ebaystatic.com/m/m2FZ39y0kuIxUg9fz96bAOA/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Maximum-Carnage-Sega-Genesis-Game-Authentic-Cartridge-Only-Spider-Man-Venom-/153881479114'
    ],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '1363'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    postalCode: ['193**'],
    location: ['Downingtown,PA,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingType: ['Calculated'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '1.25'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '1.25'
          }
        ],
        bidCount: ['2'],
        sellingState: ['Active'],
        timeLeft: ['P2DT10H28M4S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-03-30T02:16:28.000Z'],
        endTime: ['2020-04-06T02:16:28.000Z'],
        listingType: ['Auction'],
        gift: ['false'],
        watchCount: ['14']
      }
    ],
    returnsAccepted: ['false'],
    condition: [
      {
        conditionId: ['5000'],
        conditionDisplayName: ['Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['254550752735'],
    title: ['Spider-Man Venom Separation Anxiety Sega Genesis Complete CIB'],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs4.ebaystatic.com/m/mbVgcShc2CDi6i_1Ohd3umw/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Spider-Man-Venom-Separation-Anxiety-Sega-Genesis-Complete-CIB-/254550752735'
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    postalCode: ['917**'],
    location: ['Claremont,CA,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['0']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '39.99'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '39.99'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P21DT16H35M8S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-03-25T08:23:32.000Z'],
        endTime: ['2020-04-25T08:23:32.000Z'],
        listingType: ['FixedPrice'],
        gift: ['false'],
        watchCount: ['7']
      }
    ],
    returnsAccepted: ['false'],
    condition: [
      {
        conditionId: ['6000'],
        conditionDisplayName: ['Acceptable']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['223852999194'],
    title: [
      'Spider-Man Venom Maximum Carnage Sega Genesis SNES Magazine Art Ad Print Poster'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['182174'],
        categoryName: ['Manuals, Inserts & Box Art']
      }
    ],
    galleryURL: [
      'https://thumbs3.ebaystatic.com/m/mFc6QTJFni_SblITNmpA9cg/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Spider-Man-Venom-Maximum-Carnage-Sega-Genesis-SNES-Magazine-Art-Ad-Print-Poster-/223852999194'
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['true'],
    postalCode: ['970**'],
    location: ['Beaverton,OR,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['true'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '14.95'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '14.95'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P11DT7H32M29S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-01-14T23:20:53.000Z'],
        endTime: ['2020-04-14T23:20:53.000Z'],
        listingType: ['StoreInventory'],
        gift: ['false'],
        watchCount: ['4']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['4000'],
        conditionDisplayName: ['Very Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['true']
  },
  {
    itemId: ['333559867530'],
    title: [
      'SPIDER MAN VENOM MAXIMUM CARNAGE SEGA Genesis ORIGINAL Box GAME Authentic Tested'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs3.ebaystatic.com/m/mZnmgJVXJJCe9lZmElVwzcw/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/SPIDER-MAN-VENOM-MAXIMUM-CARNAGE-SEGA-Genesis-ORIGINAL-Box-GAME-Authentic-Tested-/333559867530'
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    postalCode: ['129**'],
    location: ['Champlain,NY,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '3.99'
          }
        ],
        shippingType: ['Flat'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '29.95'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '29.95'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P24DT1H41M46S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['true'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-03-27T17:30:10.000Z'],
        endTime: ['2020-04-27T17:30:10.000Z'],
        listingType: ['StoreInventory'],
        gift: ['false']
      }
    ],
    returnsAccepted: ['false'],
    condition: [
      {
        conditionId: ['5000'],
        conditionDisplayName: ['Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['313019722696'],
    title: [
      'Spider Man Venom MAXIMUM CARNAGE Sega Genesis red cart manual and case'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs1.ebaystatic.com/m/mm5ZoL4xT-F8PyTySxouBZQ/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Spider-Man-Venom-MAXIMUM-CARNAGE-Sega-Genesis-red-cart-manual-and-case-/313019722696'
    ],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '1363'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['true'],
    postalCode: ['495**'],
    location: ['Grand Rapids,MI,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['2']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '44.99'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '44.99'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P2DT12H20M22S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-03-06T04:08:46.000Z'],
        endTime: ['2020-04-06T04:08:46.000Z'],
        listingType: ['StoreInventory'],
        gift: ['false'],
        watchCount: ['4']
      }
    ],
    returnsAccepted: ['false'],
    condition: [
      {
        conditionId: ['5000'],
        conditionDisplayName: ['Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['233472645326'],
    title: [
      'Factory Sealed Spiderman Vs Venom Seperation Anxiety Sega Genesis Very Rare HTF'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs3.ebaystatic.com/m/mzWUXrXtN5A3Bhn3srMym-g/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Factory-Sealed-Spiderman-Vs-Venom-Seperation-Anxiety-Sega-Genesis-Very-Rare-HTF-/233472645326'
    ],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '79271599'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    postalCode: ['454**'],
    location: ['Dayton,OH,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '299.95'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '299.95'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P19DT0H54M37S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['true'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-01-22T16:43:01.000Z'],
        endTime: ['2020-04-22T16:43:01.000Z'],
        listingType: ['StoreInventory'],
        gift: ['false'],
        watchCount: ['6']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['1000'],
        conditionDisplayName: ['Brand New']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['true']
  },
  {
    itemId: ['283378831246'],
    title: ['Maximum Carnage (Sega Genesis, 1994) Spider-Man Venom COMPLETE!'],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs3.ebaystatic.com/m/muZUx3NWouOwGgI3VfbSkLA/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Maximum-Carnage-Sega-Genesis-1994-Spider-Man-Venom-COMPLETE-/283378831246'
    ],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '1363'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['true'],
    postalCode: ['974**'],
    location: ['Eugene,OR,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingType: ['Calculated'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['true'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '27.95'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '27.95'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P10DT18H14M9S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2019-02-14T10:02:33.000Z'],
        endTime: ['2020-04-14T10:02:33.000Z'],
        listingType: ['FixedPrice'],
        gift: ['false'],
        watchCount: ['5']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['5000'],
        conditionDisplayName: ['Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['true']
  },
  {
    itemId: ['392732038636'],
    title: ['Spider-Man Venom Separation Anxiety - Sega Genesis'],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs1.ebaystatic.com/m/mtSppM_0nO-bfGan5VSh-7A/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Spider-Man-Venom-Separation-Anxiety-Sega-Genesis-/392732038636'
    ],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '79271599'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    postalCode: ['331**'],
    location: ['Miami,FL,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '2.95'
          }
        ],
        shippingType: ['Flat'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '17.97'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '17.97'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P15DT11H44M31S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-03-19T03:32:55.000Z'],
        endTime: ['2020-04-19T03:32:55.000Z'],
        listingType: ['FixedPrice'],
        gift: ['false']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['4000'],
        conditionDisplayName: ['Very Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['true']
  },
  {
    itemId: ['372785078053'],
    title: [
      'Spider Man Venom Seperation Anxiety Video Game Only (Sega Genesis, 1995) '
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs2.ebaystatic.com/m/mdYmze5ZgKzS-mw-KZHbcIA/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Spider-Man-Venom-Seperation-Anxiety-Video-Game-Only-Sega-Genesis-1995-/372785078053'
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    postalCode: ['100**'],
    location: ['New York,NY,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '5.0'
          }
        ],
        shippingType: ['Flat'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '24.99'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '24.99'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P23DT2H9M30S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2019-09-26T17:57:54.000Z'],
        endTime: ['2020-04-26T17:57:54.000Z'],
        listingType: ['StoreInventory'],
        gift: ['false'],
        watchCount: ['1']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['5000'],
        conditionDisplayName: ['Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['133239013012'],
    title: [
      'Spider-Man and Venom Maximum Carnage Sega Genesis Video Game Box Only'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['182175'],
        categoryName: ['Original Game Cases & Boxes']
      }
    ],
    galleryURL: [
      'https://thumbs1.ebaystatic.com/m/mAdM2v29_dpDxk4uoouMgVQ/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Spider-Man-and-Venom-Maximum-Carnage-Sega-Genesis-Video-Game-Box-Only-/133239013012'
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['true'],
    postalCode: ['852**'],
    location: ['Chandler,AZ,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['FlatDomesticCalculatedInternational'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '17.37'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '17.37'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P10DT6H52M0S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2019-11-13T22:40:24.000Z'],
        endTime: ['2020-04-13T22:40:24.000Z'],
        listingType: ['FixedPrice'],
        gift: ['false'],
        watchCount: ['2']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['5000'],
        conditionDisplayName: ['Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['true']
  },
  {
    itemId: ['153885626039'],
    title: ['Spider-Man / Venom: Maximum Carnage'],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs4.ebaystatic.com/m/mBF0MkJcTT9_aJ6ILLG3QWg/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Spider-Man-Venom-Maximum-Carnage-/153885626039'
    ],
    charityId: ['50296'],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '1363'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['true'],
    postalCode: ['992**'],
    location: ['Spokane,WA,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '18.25'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '18.25'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P29DT2H17M17S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-04-02T18:05:41.000Z'],
        endTime: ['2020-05-02T18:05:41.000Z'],
        listingType: ['FixedPrice'],
        gift: ['false']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['5000'],
        conditionDisplayName: ['Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['202839947199'],
    title: [
      'Sega Genesis Spider-Man + Venom: Separation Anxiety Cartridge Tested Working!'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs4.ebaystatic.com/m/mjlsEmL2yzeB_U0tY0K5tDQ/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Sega-Genesis-Spider-Man-Venom-Separation-Anxiety-Cartridge-Tested-Working-/202839947199'
    ],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '79271599'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['true'],
    postalCode: ['836**'],
    location: ['Nampa,ID,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['0']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '23.32'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '23.32'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P28DT5H19M32S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['true'],
        buyItNowAvailable: ['false'],
        startTime: ['2019-12-01T21:07:56.000Z'],
        endTime: ['2020-05-01T21:07:56.000Z'],
        listingType: ['FixedPrice'],
        gift: ['false'],
        watchCount: ['3']
      }
    ],
    returnsAccepted: ['false'],
    condition: [
      {
        conditionId: ['4000'],
        conditionDisplayName: ['Very Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['174233785523'],
    title: ['Spiderman Vs Venom: Seperation anxiety(sega genesis)'],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs4.ebaystatic.com/m/mTziisCrzwtRhF3jPNc0uXQ/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Spiderman-Vs-Venom-Seperation-anxiety-sega-genesis-/174233785523'
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    postalCode: ['357**'],
    location: ['Madison,AL,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingType: ['Calculated'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['2']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '35.0'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '35.0'
          }
        ],
        bidCount: ['0'],
        sellingState: ['Active'],
        timeLeft: ['P1DT1H39M15S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['true'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-03-28T17:27:39.000Z'],
        endTime: ['2020-04-04T17:27:39.000Z'],
        listingType: ['Auction'],
        gift: ['false'],
        watchCount: ['1']
      }
    ],
    returnsAccepted: ['false'],
    condition: [
      {
        conditionId: ['4000'],
        conditionDisplayName: ['Very Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['383488599094'],
    title: [
      'Sega Genesis Video Game Cartridge Spiderman Venom Maximum Carnage - RED Cart'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs3.ebaystatic.com/m/mqOHyqJKGiDtoCxFmPQ04kg/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Sega-Genesis-Video-Game-Cartridge-Spiderman-Venom-Maximum-Carnage-RED-Cart-/383488599094'
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    postalCode: ['431**'],
    location: ['Grove City,OH,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['true'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '14.99'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '14.99'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P29DT3H11M12S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['true'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-04-02T18:59:36.000Z'],
        endTime: ['2020-05-02T18:59:36.000Z'],
        listingType: ['StoreInventory'],
        gift: ['false'],
        watchCount: ['1']
      }
    ],
    returnsAccepted: ['false'],
    condition: [
      {
        conditionId: ['4000'],
        conditionDisplayName: ['Very Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['264539901860'],
    title: [
      'Spider-Man - Venom: Maximum Carnage (Sega Genesis) *COMPLETE - CLEANED & TESTED*'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs1.ebaystatic.com/m/mhNYeZHUaa2KqICrz-wew6g/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Spider-Man-Venom-Maximum-Carnage-Sega-Genesis-COMPLETE-CLEANED-TESTED-/264539901860'
    ],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '1363'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['true'],
    postalCode: ['067**'],
    location: ['Prospect,CT,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '21.49'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '21.49'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P17DT3H25M57S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2019-11-20T19:14:21.000Z'],
        endTime: ['2020-04-20T19:14:21.000Z'],
        listingType: ['StoreInventory'],
        gift: ['false'],
        watchCount: ['1']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['6000'],
        conditionDisplayName: ['Acceptable']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['true']
  },
  {
    itemId: ['324043773989'],
    title: ['Venom-Spider-Man: Separation Anxiety Sega Genesis Game '],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs2.ebaystatic.com/m/mj_Vxv9sIUaz4dGsOcYCMGA/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Venom-Spider-Man-Separation-Anxiety-Sega-Genesis-Game-/324043773989'
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['true'],
    postalCode: ['258**'],
    location: ['MacArthur,WV,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '28.95'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '28.95'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P12DT9H47M16S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-01-16T01:35:40.000Z'],
        endTime: ['2020-04-16T01:35:40.000Z'],
        listingType: ['StoreInventory'],
        gift: ['false']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['5000'],
        conditionDisplayName: ['Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['264379103480'],
    title: [
      'SPIDERMAN VS VENOM: MAXIMUM CARNAGE - SEGA GENESIS - RED CART ONLY!!'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs1.ebaystatic.com/m/m2nEAzydq4tKJ5gxZ4zFT4Q/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/SPIDERMAN-VS-VENOM-MAXIMUM-CARNAGE-SEGA-GENESIS-RED-CART-ONLY-/264379103480'
    ],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '1363'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['true'],
    postalCode: ['027**'],
    location: ['New Bedford,MA,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['3']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '21.95'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '21.95'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P24DT3H55M11S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2019-06-27T19:43:35.000Z'],
        endTime: ['2020-04-27T19:43:35.000Z'],
        listingType: ['FixedPrice'],
        gift: ['false'],
        watchCount: ['2']
      }
    ],
    returnsAccepted: ['false'],
    condition: [
      {
        conditionId: ['5000'],
        conditionDisplayName: ['Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['114127761904'],
    title: [
      'NO GAME - Box & Manual ONLY - VENOM SPIDER-MAN SEPARTION ANXIETY - Sega GENESIS'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs1.ebaystatic.com/m/mlAPqpo2ndw4kIn71AjMb3Q/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/NO-GAME-Box-Manual-ONLY-VENOM-SPIDER-MAN-SEPARTION-ANXIETY-Sega-GENESIS-/114127761904'
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    postalCode: ['945**'],
    location: ['Fremont,CA,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '30.0'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '30.0'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P20DT5H17M37S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-02-23T21:06:01.000Z'],
        endTime: ['2020-04-23T21:06:01.000Z'],
        listingType: ['StoreInventory'],
        gift: ['false'],
        watchCount: ['1']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['5000'],
        conditionDisplayName: ['Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['193333997011'],
    title: [
      'SEGA GENESIS - SPIDER-MAN & VENOM: MAXIMUM CARNAGE - FACTORY SEALED - WATA 9.4 A'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs4.ebaystatic.com/m/mdnTW1p2W_GtcKv2zgzPKyw/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/SEGA-GENESIS-SPIDER-MAN-VENOM-MAXIMUM-CARNAGE-FACTORY-SEALED-WATA-9-4-/193333997011'
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    postalCode: ['910**'],
    location: ['Sierra Madre,CA,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['2']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '1999.99'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '1999.99'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P2DT16H46M15S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-02-06T08:34:39.000Z'],
        endTime: ['2020-04-06T08:34:39.000Z'],
        listingType: ['StoreInventory'],
        gift: ['false'],
        watchCount: ['1']
      }
    ],
    returnsAccepted: ['false'],
    condition: [
      {
        conditionId: ['1000'],
        conditionDisplayName: ['Brand New']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['174237771889'],
    title: [
      'Sega Genesis Spider-Man Venom: Maximum Carnage Complete Red Cart Free Ship A1'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs2.ebaystatic.com/m/m3-E5kldGsWsO4N6JfXoEVw/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Sega-Genesis-Spider-Man-Venom-Maximum-Carnage-Complete-Red-Cart-Free-Ship-A1-/174237771889'
    ],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '1363'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['true'],
    postalCode: ['554**'],
    location: ['Minneapolis,MN,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['3']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '34.99'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '34.99'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P28DT0H14M20S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['true'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-04-01T16:02:44.000Z'],
        endTime: ['2020-05-01T16:02:44.000Z'],
        listingType: ['FixedPrice'],
        gift: ['false']
      }
    ],
    returnsAccepted: ['false'],
    condition: [
      {
        conditionId: ['4000'],
        conditionDisplayName: ['Very Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['133360511009'],
    title: [
      'Maximum Carnage (Sega Genesis, 1994) *BOX & ART ONLY* Good Cond Spider-Man Venom'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['182174'],
        categoryName: ['Manuals, Inserts & Box Art']
      }
    ],
    galleryURL: [
      'https://thumbs2.ebaystatic.com/m/m0AyTmI8Dcy8S7DecOF70DQ/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Maximum-Carnage-Sega-Genesis-1994-BOX-ART-ONLY-Good-Cond-Spider-Man-Venom-/133360511009'
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    postalCode: ['891**'],
    location: ['Las Vegas,NV,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '4.1'
          }
        ],
        shippingType: ['Flat'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '11.0'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '11.0'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P10DT10H46M51S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-03-14T02:35:15.000Z'],
        endTime: ['2020-04-14T02:35:15.000Z'],
        listingType: ['FixedPrice'],
        gift: ['false']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['5000'],
        conditionDisplayName: ['Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['true']
  },
  {
    itemId: ['153850425389'],
    title: [
      'Spider-Man and Venom: Maximum Carnage (Sega Genesis) NEW SEALED NEAR-MINT, RARE!'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs2.ebaystatic.com/m/mteSdW-zGeWZ2u-WKf4o13A/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Spider-Man-and-Venom-Maximum-Carnage-Sega-Genesis-NEW-SEALED-NEAR-MINT-RARE-/153850425389'
    ],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '1363'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    postalCode: ['222**'],
    location: ['Arlington,VA,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '6.0'
          }
        ],
        shippingType: ['Flat'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['5']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '499.99'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '499.99'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P28DT2H34M41S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['true'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-03-01T18:23:05.000Z'],
        endTime: ['2020-05-01T18:23:05.000Z'],
        listingType: ['StoreInventory'],
        gift: ['false'],
        watchCount: ['3']
      }
    ],
    returnsAccepted: ['false'],
    condition: [
      {
        conditionId: ['1000'],
        conditionDisplayName: ['Brand New']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['202880546403'],
    title: [
      'Maximum Carnage Sega Genesis 1994 Authentic spider man Venom Cartridge Only'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs4.ebaystatic.com/m/m8Vkpp2SyCtt1a98X-IJbwA/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Maximum-Carnage-Sega-Genesis-1994-Authentic-spider-man-Venom-Cartridge-Only-/202880546403'
    ],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '1363'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['true'],
    postalCode: ['836**'],
    location: ['Nampa,ID,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['0']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '21.95'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '21.95'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P14DT9H28M41S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['true'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-01-18T01:17:05.000Z'],
        endTime: ['2020-04-18T01:17:05.000Z'],
        listingType: ['FixedPrice'],
        gift: ['false'],
        watchCount: ['1']
      }
    ],
    returnsAccepted: ['false'],
    condition: [
      {
        conditionId: ['4000'],
        conditionDisplayName: ['Very Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['283836317375'],
    title: [
      'Maximum Carnage Spiderman Venom SEGA Genesis Red Cart Tested CIB Complete 1994'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs4.ebaystatic.com/m/mCBgGD-kOjIuPR7Rgzh8Ayw/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Maximum-Carnage-Spiderman-Venom-SEGA-Genesis-Red-Cart-Tested-CIB-Complete-1994-/283836317375'
    ],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '1363'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['true'],
    postalCode: ['151**'],
    location: ['Monroeville,PA,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingType: ['Calculated'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['3']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '31.0'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '31.0'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P29DT22H39M25S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-04-03T14:27:49.000Z'],
        endTime: ['2020-05-03T14:27:49.000Z'],
        listingType: ['FixedPrice'],
        gift: ['false']
      }
    ],
    returnsAccepted: ['false'],
    condition: [
      {
        conditionId: ['4000'],
        conditionDisplayName: ['Very Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['273837398751'],
    title: [
      'Spider-Man and Venom Maximum Carnage Sega Genesis CIB w/ Poster and Black Cart'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs4.ebaystatic.com/m/mJ1dQWRGsqSM_v34eAU_o_Q/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Spider-Man-and-Venom-Maximum-Carnage-Sega-Genesis-CIB-w-Poster-and-Black-Cart-/273837398751'
    ],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '1363'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['true'],
    postalCode: ['430**'],
    location: ['Heath,OH,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['true'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '49.15'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '49.15'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P4DT16H22M55S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2019-05-08T08:11:19.000Z'],
        endTime: ['2020-04-08T08:11:19.000Z'],
        listingType: ['FixedPrice'],
        gift: ['false'],
        watchCount: ['2']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['5000'],
        conditionDisplayName: ['Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['352818880822'],
    title: ['Spider-Man Venom Game - Separation Anxiety (Sega Genesis, 1995)'],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs3.ebaystatic.com/m/msZpsovoM8D3TIJU1iJS5Ng/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Spider-Man-Venom-Game-Separation-Anxiety-Sega-Genesis-1995-/352818880822'
    ],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '79271599'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    postalCode: ['324**'],
    location: ['Cottondale,FL,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '3.5'
          }
        ],
        shippingType: ['Flat'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['3']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '30.0'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '30.0'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P6DT8H30M55S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2019-10-10T00:20:19.000Z'],
        endTime: ['2020-04-10T00:19:19.000Z'],
        listingType: ['FixedPrice'],
        gift: ['false'],
        watchCount: ['3']
      }
    ],
    returnsAccepted: ['false'],
    condition: [
      {
        conditionId: ['6000'],
        conditionDisplayName: ['Acceptable']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['113927189985'],
    title: ['Spider-Man and Venom: Maximum Carnage (Sega Genesis)'],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs2.ebaystatic.com/m/m0f_9EVYMQJ5X_55zGLXc8w/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Spider-Man-and-Venom-Maximum-Carnage-Sega-Genesis-/113927189985'
    ],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '1363'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['true'],
    postalCode: ['924**'],
    location: ['San Bernardino,CA,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['FlatDomesticCalculatedInternational'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '19.99'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '19.99'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P14DT4H8M43S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2019-10-17T19:57:07.000Z'],
        endTime: ['2020-04-17T19:57:07.000Z'],
        listingType: ['FixedPrice'],
        gift: ['false']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['5000'],
        conditionDisplayName: ['Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['133288688812'],
    title: [
      'Maximum Carnage Sega Genesis 1994 Authentic spiderman Venom Game Only'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs1.ebaystatic.com/m/mREIo0SRITbmtfgyh-HgstA/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Maximum-Carnage-Sega-Genesis-1994-Authentic-spiderman-Venom-Game-Only-/133288688812'
    ],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '1363'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['true'],
    postalCode: ['356**'],
    location: ['Decatur,AL,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['2']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '17.99'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '17.99'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P26DT16H8M35S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2019-12-30T07:56:59.000Z'],
        endTime: ['2020-04-30T07:56:59.000Z'],
        listingType: ['StoreInventory'],
        gift: ['false']
      }
    ],
    returnsAccepted: ['false'],
    condition: [
      {
        conditionId: ['6000'],
        conditionDisplayName: ['Acceptable']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['264559023977'],
    title: [
      'Separation Anxiety Venom Spider-Man Sega Genesis WATA 9.4 A MINT Spiderman RARE'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs2.ebaystatic.com/m/mE-faSzToIe3HDQOXxV9P4Q/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Separation-Anxiety-Venom-Spider-Man-Sega-Genesis-WATA-9-4-MINT-Spiderman-RARE-/264559023977'
    ],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '79271599'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    postalCode: ['113**'],
    location: ['Forest Hills,NY,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['true'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['3']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '1429.0'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '1429.0'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P3DT13H58M7S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2019-12-07T05:46:31.000Z'],
        endTime: ['2020-04-07T05:46:31.000Z'],
        listingType: ['StoreInventory'],
        gift: ['false'],
        watchCount: ['2']
      }
    ],
    returnsAccepted: ['false'],
    condition: [
      {
        conditionId: ['1000'],
        conditionDisplayName: ['Brand New']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['143473809937'],
    title: [
      'Sega Genesis 3 Games Lot: NFL QB Club Primal Rage  Spider Man VS Venom Maxim Car'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs2.ebaystatic.com/m/mip-So-gV9GBMgpLnzLEJpg/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Sega-Genesis-3-Games-Lot-NFL-QB-Club-Primal-Rage-Spider-Man-VS-Venom-Maxim-Car-/143473809937'
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    postalCode: ['550**'],
    location: ['Farmington,MN,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '33.0'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '33.0'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P13DT3H5M16S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2019-12-16T18:53:40.000Z'],
        endTime: ['2020-04-16T18:53:40.000Z'],
        listingType: ['StoreInventory'],
        gift: ['false']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['6000'],
        conditionDisplayName: ['Acceptable']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['123906195685'],
    title: [
      'Spider-Man and Venom: Maximum Carnage Sega Genesis Game Complete *Clean *VG'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs2.ebaystatic.com/m/mGs2ywvil0HkxsRx92aWkgQ/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Spider-Man-and-Venom-Maximum-Carnage-Sega-Genesis-Game-Complete-Clean-VG-/123906195685'
    ],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '1363'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['true'],
    postalCode: ['334**'],
    location: ['Jupiter,FL,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['FlatDomesticCalculatedInternational'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['true'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '47.24'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '47.24'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P10DT9H33M10S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2019-09-14T01:21:34.000Z'],
        endTime: ['2020-04-14T01:21:34.000Z'],
        listingType: ['FixedPrice'],
        gift: ['false'],
        watchCount: ['1']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['4000'],
        conditionDisplayName: ['Very Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['163987507731'],
    title: [
      'Spider Man Venom - Maximum Carnage Sega Genesis Game Cartridge Marvel 1993'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs4.ebaystatic.com/m/m4-ndKRGzxZT64GL5-p_NKw/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Spider-Man-Venom-Maximum-Carnage-Sega-Genesis-Game-Cartridge-Marvel-1993-/163987507731'
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    location: ['China'],
    country: ['CN'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '7.89'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '7.89'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P9DT21H57M49S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2019-12-13T13:46:13.000Z'],
        endTime: ['2020-04-13T13:46:13.000Z'],
        listingType: ['StoreInventory'],
        gift: ['false'],
        watchCount: ['13']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['1000'],
        conditionDisplayName: ['Brand New']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['124035853413'],
    title: [
      'Spider-Man and Venom: Maximum Carnage Sega Genesis Game In Box w/Manual *NTSC-U*'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs2.ebaystatic.com/m/mB5Lk1zJWTJFYcudK8sX60w/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Spider-Man-and-Venom-Maximum-Carnage-Sega-Genesis-Game-Box-w-Manual-NTSC-U-/124035853413'
    ],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '1363'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['true'],
    location: ['Lithuania'],
    country: ['LT'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['2']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '37.99'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '37.99'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P2DT21H36M49S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-01-06T13:25:13.000Z'],
        endTime: ['2020-04-06T13:25:13.000Z'],
        listingType: ['StoreInventory'],
        gift: ['false'],
        watchCount: ['6']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['5000'],
        conditionDisplayName: ['Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['383477327736'],
    title: [
      'Spider-Man And Venom: Maximum Carnage (1994) 16 Bit Game Card For Sega Genesis'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs1.ebaystatic.com/m/m6-FVhpssTiEIxd3eziiCig/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Spider-Man-And-Venom-Maximum-Carnage-1994-16-Bit-Game-Card-Sega-Genesis-/383477327736'
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    location: ['China'],
    country: ['CN'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '7.99'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '7.99'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P21DT6H1M25S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['true'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-03-24T21:49:49.000Z'],
        endTime: ['2020-04-24T21:49:49.000Z'],
        listingType: ['FixedPrice'],
        gift: ['false']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['1000'],
        conditionDisplayName: ['Brand New']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['192946639066'],
    title: [
      'Spider Man & Venom Maximum Carnage Cartridge Game Sega Genesis MD 16bit USA NTSC'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs3.ebaystatic.com/m/ma-zaK3nluIG_iBf3UWVnkg/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Spider-Man-Venom-Maximum-Carnage-Cartridge-Game-Sega-Genesis-MD-16bit-USA-NTSC-/192946639066'
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['true'],
    location: ['China'],
    country: ['CN'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['3']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '10.99'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '10.99'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P7DT14H29M18S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2019-06-11T06:17:42.000Z'],
        endTime: ['2020-04-11T06:17:42.000Z'],
        listingType: ['StoreInventory'],
        gift: ['false'],
        watchCount: ['2']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['1000'],
        conditionDisplayName: ['Brand New']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['113892638540'],
    title: [
      'Games Cartridge - Venom - Spider-Man 16 Bit MD Sega Mega Drive Genesis '
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs1.ebaystatic.com/m/m9Dgqz5BIqtlQj4QHOEFWzA/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Games-Cartridge-Venom-Spider-Man-16-Bit-MD-Sega-Mega-Drive-Genesis-/113892638540'
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['true'],
    location: ['Brazil'],
    country: ['BR'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '3.2'
          }
        ],
        shippingType: ['Flat'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['10']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '18.8'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '18.8'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P14DT9H44M27S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2019-09-18T01:32:51.000Z'],
        endTime: ['2020-04-18T01:32:51.000Z'],
        listingType: ['FixedPrice'],
        gift: ['false']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['1000'],
        conditionDisplayName: ['Brand New']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['113892621504'],
    title: [
      'Games Cartridge - Spider-Man And Venom 16 Bit MD Sega Mega Drive Genesis '
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs1.ebaystatic.com/m/mgDHWBbM9RSZQ9QIU5h2-jg/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Games-Cartridge-Spider-Man-And-Venom-16-Bit-MD-Sega-Mega-Drive-Genesis-/113892621504'
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['true'],
    location: ['Brazil'],
    country: ['BR'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '3.2'
          }
        ],
        shippingType: ['Flat'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['10']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '18.8'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '18.8'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P14DT9H34M8S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2019-09-18T01:22:32.000Z'],
        endTime: ['2020-04-18T01:22:32.000Z'],
        listingType: ['FixedPrice'],
        gift: ['false']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['1000'],
        conditionDisplayName: ['Brand New']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['153787325523'],
    title: ['Sega Genesis Spider-Man Venom Maximum Carnage'],
    globalId: ['EBAY-ENCA'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs4.ebaystatic.com/m/mssICrNXUjwETVOxpjoFV0Q/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Sega-Genesis-Spider-Man-Venom-Maximum-Carnage-/153787325523'
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    postalCode: ['R3J2E3'],
    location: ['Canada'],
    country: ['CA'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '0.0'
          }
        ],
        shippingType: ['Free'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'CAD',
            __value__: '27.5'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '19.47'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P2DT21H53M33S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['true'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-01-06T13:41:57.000Z'],
        endTime: ['2020-04-06T13:41:57.000Z'],
        listingType: ['StoreInventory'],
        gift: ['false']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['5000'],
        conditionDisplayName: ['Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  },
  {
    itemId: ['392740335744'],
    title: ['Spider-Man Venom Separation Sega Genesis Game Complete'],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs1.ebaystatic.com/m/mtSppM_0nO-bfGan5VSh-7A/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Spider-Man-Venom-Separation-Sega-Genesis-Game-Complete-/392740335744'
    ],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '79271599'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    postalCode: ['331**'],
    location: ['Miami,FL,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingServiceCost: [
          {
            '@currencyId': 'USD',
            __value__: '2.95'
          }
        ],
        shippingType: ['Flat'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['false'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['1']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '73.47'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '73.47'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P23DT7H23M27S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2020-03-26T23:11:51.000Z'],
        endTime: ['2020-04-26T23:11:51.000Z'],
        listingType: ['FixedPrice'],
        gift: ['false'],
        watchCount: ['1']
      }
    ],
    returnsAccepted: ['true'],
    condition: [
      {
        conditionId: ['4000'],
        conditionDisplayName: ['Very Good']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['true']
  },
  {
    itemId: ['264358967530'],
    title: [
      'Spider-man Venom in Separation Anxiety Sega Genesis New Sealed MINT WATA 9.6 A+'
    ],
    globalId: ['EBAY-US'],
    primaryCategory: [
      {
        categoryId: ['139973'],
        categoryName: ['Video Games']
      }
    ],
    galleryURL: [
      'https://thumbs3.ebaystatic.com/m/mKtEJytp26f-2QQQE1mHc8g/140.jpg'
    ],
    viewItemURL: [
      'https://www.ebay.com/itm/Spider-man-Venom-Separation-Anxiety-Sega-Genesis-New-Sealed-MINT-WATA-9-6-A-/264358967530'
    ],
    productId: [
      {
        '@type': 'ReferenceID',
        __value__: '79271599'
      }
    ],
    paymentMethod: ['PayPal'],
    autoPay: ['false'],
    postalCode: ['113**'],
    location: ['Forest Hills,NY,USA'],
    country: ['US'],
    shippingInfo: [
      {
        shippingType: ['Calculated'],
        shipToLocations: ['Worldwide'],
        expeditedShipping: ['true'],
        oneDayShippingAvailable: ['false'],
        handlingTime: ['3']
      }
    ],
    sellingStatus: [
      {
        currentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '1899.0'
          }
        ],
        convertedCurrentPrice: [
          {
            '@currencyId': 'USD',
            __value__: '1899.0'
          }
        ],
        sellingState: ['Active'],
        timeLeft: ['P8DT12H46M39S']
      }
    ],
    listingInfo: [
      {
        bestOfferEnabled: ['false'],
        buyItNowAvailable: ['false'],
        startTime: ['2019-06-12T04:35:03.000Z'],
        endTime: ['2020-04-12T04:35:03.000Z'],
        listingType: ['StoreInventory'],
        gift: ['false'],
        watchCount: ['5']
      }
    ],
    returnsAccepted: ['false'],
    condition: [
      {
        conditionId: ['1000'],
        conditionDisplayName: ['Brand New']
      }
    ],
    isMultiVariationListing: ['false'],
    topRatedListing: ['false']
  }
];

export default function EbaySection(props) {
  const { platform, game } = props;
  // const [ebayItems, setEbayItems] = useState([]);

  useEffect(() => {
    // Backend.getEbayItems(platform, game).then(res => {
    //   console.log(res);
    //   setEbayItems(res[0].item);
    // });
  }, []);

  console.log(sample);

  return (
    <div className={styles.EbaySection}>
      {sample &&
        sample.map((item, index) => {
          return index === 2 ? (
            <EbayItemCard key={index} itemId={item.itemId} />
          ) : null;
        })}
      {/* {ebayItems &&
        ebayItems.map((item, index) => <EbayItemCard key={index} {...item} />)} */}
    </div>
  );
}
