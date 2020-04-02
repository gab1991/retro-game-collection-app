import React from 'react';
import styles from './EbaySection.css';
import EbayItemCard from '../EbaySection/EbayItemCard/EbayItemCard';

export default function EbaySection(props) {
  const sample = [
    {
      Timestamp: '2020-04-02T18:22:20.504Z',
      Ack: 'Warning',
      Errors: [
        {
          ShortMessage: 'Cannot calculate shipping cost.',
          LongMessage:
            'Item 313042006138 need more data to calculate shipping cost. Use GetShippingCosts or contact the seller for additional details about shipping costs and services.',
          ErrorCode: '10.94',
          SeverityCode: 'Warning',
          ErrorParameters: [{ Value: '313042006138', ParamID: '0' }],
          ErrorClassification: 'RequestError'
        }
      ],
      Build: 'E1141_CORE_APILW_19170841_R1',
      Version: '1141',
      Item: {
        Description:
          '<p>1991 Sonic the Hedgehog First Print Sega Genesis. </p><br><p>Condition is Good. </p><br><p>Cart is in great conditions. Tested and working ✅</p><br><p>Box does have wear and the plastic that covers the sleeve ripped partially. </p><br><p>Shipped with USPS First Class Package.</p>',
        ItemID: '313042006138',
        EndTime: '2020-04-09T12:24:02.000Z',
        ViewItemURLForNaturalSearch:
          'https://www.ebay.com/itm/1991-Sonic-Hedgehog-First-Print-Sega-Genesis-NOT-RESALE-Version-/313042006138',
        ListingType: 'Chinese',
        Location: 'San Fernando, California',
        GalleryURL:
          'https://thumbs3.ebaystatic.com/pict/3130420061388080_1.jpg',
        PictureURL: [
          'https://i.ebayimg.com/00/s/MTYwMFgxMjAw/z/KDUAAOSwPPledK9L/$_12.JPG?set_id=880000500F',
          'https://i.ebayimg.com/00/s/MTYwMFgxMjAw/z/6MQAAOSwlD5edK9M/$_12.JPG?set_id=880000500F',
          'https://i.ebayimg.com/00/s/MTYwMFgxMjAw/z/fQQAAOSw13hedK9U/$_12.JPG?set_id=880000500F',
          'https://i.ebayimg.com/00/s/MTYwMFgxMjAw/z/KBYAAOSwHr1edK9V/$_12.JPG?set_id=880000500F',
          'https://i.ebayimg.com/00/s/MTYwMFgxMjAw/z/nRcAAOSwIM5edK9W/$_12.JPG?set_id=880000500F',
          'https://i.ebayimg.com/00/s/MTYwMFgxMjAw/z/ExoAAOSwymtedK9Y/$_12.JPG?set_id=880000500F'
        ],
        PrimaryCategoryID: '139973',
        PrimaryCategoryName: 'Video Games & Consoles:Video Games',
        BidCount: 0,
        ConvertedCurrentPrice: { Value: 2.3, CurrencyID: 'USD' },
        ListingStatus: 'Active',
        TimeLeft: 'P6DT18H1M42S',
        Title:
          '1991 Sonic the Hedgehog First Print Sega Genesis ~ NOT FOR RESALE Version.',
        ShippingCostSummary: { ShippingType: 'Calculated' },
        ItemSpecifics: {
          NameValueList: [
            { Name: 'Publisher', Value: ['SEGA'] },
            { Name: 'Custom Bundle', Value: ['Yes'] },
            { Name: 'Modified Item', Value: ['No'] },
            { Name: 'Game Name', Value: ['Sonic the Hedgehog: Genesis'] },
            { Name: 'Release Year', Value: ['1991'] },
            { Name: 'Region Code', Value: ['NTSC-U/C (US/Canada)'] },
            { Name: 'Video Game Series', Value: ['Sonic the Hedgehog'] },
            { Name: 'Platform', Value: ['Sega Genesis'] }
          ]
        },
        Country: 'US',
        AutoPay: false,
        ConditionID: 5000,
        ConditionDisplayName: 'Good',
        GlobalShipping: true
      }
    }
  ];

  return (
    <div className={styles.EbaySection}>
      {sample &&
        sample.map((item, index) => <EbayItemCard key={index} {...item} />)}
    </div>
  );
}
