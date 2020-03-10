import React, { useEffect, useState } from 'react';
import { withRouter, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import PlatformSelector from './components/PlatformSelector/PlatformSelector';
import Backend from './Backend/Backend';
import GameSelector from './components/GameSelector/GameSelector';
import GameDetailed from './components/GameDetailed/GameDetailed';

const fakeSelecredGame = {
  id: 53551,
  slug: 'sonic-the-hedgehog',
  name: 'Sonic the Hedgehog (1991)',
  name_original: 'Sonic the Hedgehog (1991)',
  description:
    '<p>Sonic The Hedgehog is a 2D platform game, the first installment in Sega’s Sonic the Hedgehog series. </p>\n<h3>Plot</h3>\n<p>The game takes place on South Island and follows Sonic — an anthropomorphic blue hedgehog. The game’s antagonist, a brilliant but insane scientist Dr. Robotnik attempts to take possession of the power of six Chaos Emeralds by entrapping South Island’s animal inhabitants inside hostile robots. Sonic decides to hinder Robotnik’s plans by freeing animals and collecting the emeralds himself.  </p>\n<h3>Gameplay</h3>\n<p>The game consists of six zones each of which is divided into three acts. In the first two acts, your goal is to reach the finish while the third act ends with a boss fight against Dr. Robotnik. After completing the sixth zone, you enter the Final Zone which consists of one act and the final battle against Robotnik. The level in the game is usually relatively roomy and implicate various ways of completing. The gameplay is centered on Sonic’s ability to run at high speed. Thereby the levels involve many slopes, loops, springs. Sonic can use Spin Attack to attack enemies or destroy certain obstacles.<br />\nThe Spin Attack can be activated by gaining high speed while rolling on the ground or jumping. The players’ health depends on the main collectibles of the game – golden rings placed throughout the levels and collecting one hundred of them gives you an extra life. Also, as long as Sonic has at least one ring, upon getting hit he scatters rings instead of losing a life.</p>',
  metacritic: null,
  released: '1991-06-23',
  tba: false,
  updated: '2019-10-22T14:09:19',
  background_image:
    'https://media.rawg.io/media/screenshots/8a6/8a6c27f641d5d55a2b6dc8ffd5629ae2.jpg',
  background_image_additional:
    'https://media.rawg.io/media/screenshots/5a2/5a295e5997237d9e34c560a85f29f98d.jpg',
  website: '',
  rating: 4.13,
  rating_top: 4,
  ratings: [
    {
      id: 4,
      title: 'recommended',
      count: 137,
      percent: 59.57
    },
    {
      id: 5,
      title: 'exceptional',
      count: 67,
      percent: 29.13
    },
    {
      id: 3,
      title: 'meh',
      count: 20,
      percent: 8.7
    },
    {
      id: 1,
      title: 'skip',
      count: 6,
      percent: 2.61
    }
  ],
  reactions: {
    '3': 1,
    '4': 1,
    '12': 1
  },
  added: 793,
  added_by_status: {
    yet: 10,
    owned: 494,
    beaten: 193,
    toplay: 8,
    dropped: 81,
    playing: 7
  },
  playtime: 4,
  screenshots_count: 41,
  movies_count: 0,
  creators_count: 7,
  achievements_count: 47,
  parent_achievements_count: 35,
  reddit_url: '',
  reddit_name: '',
  reddit_description: '',
  reddit_logo: '',
  reddit_count: 0,
  twitch_count: 0,
  youtube_count: 372379,
  reviews_text_count: 1,
  ratings_count: 229,
  suggestions_count: 298,
  alternative_names: [],
  metacritic_url: '',
  parents_count: 0,
  additions_count: 0,
  game_series_count: 0,
  user_game: null,
  reviews_count: 230,
  saturated_color: '0f0f0f',
  dominant_color: '0f0f0f',
  parent_platforms: [
    {
      platform: {
        id: 1,
        name: 'PC',
        slug: 'pc'
      }
    },
    {
      platform: {
        id: 2,
        name: 'PlayStation',
        slug: 'playstation'
      }
    },
    {
      platform: {
        id: 3,
        name: 'Xbox',
        slug: 'xbox'
      }
    },
    {
      platform: {
        id: 4,
        name: 'iOS',
        slug: 'ios'
      }
    },
    {
      platform: {
        id: 8,
        name: 'Android',
        slug: 'android'
      }
    },
    {
      platform: {
        id: 7,
        name: 'Nintendo',
        slug: 'nintendo'
      }
    },
    {
      platform: {
        id: 11,
        name: 'SEGA',
        slug: 'sega'
      }
    }
  ],
  platforms: [
    {
      platform: {
        id: 24,
        name: 'Game Boy Advance',
        slug: 'game-boy-advance',
        image: null,
        year_end: null,
        year_start: null,
        games_count: 892,
        image_background:
          'https://media.rawg.io/media/games/da7/da77171112e11fbc2ad2114186bcd2bf.jpg'
      },
      released_at: '1991-06-23',
      requirements: null
    },
    {
      platform: {
        id: 21,
        name: 'Android',
        slug: 'android',
        image: null,
        year_end: null,
        year_start: null,
        games_count: 28030,
        image_background:
          'https://media.rawg.io/media/games/be0/be084b850302abe81675bc4ffc08a0d0.jpg'
      },
      released_at: '1991-06-23',
      requirements: null
    },
    {
      platform: {
        id: 77,
        name: 'Game Gear',
        slug: 'game-gear',
        image: null,
        year_end: null,
        year_start: null,
        games_count: 150,
        image_background:
          'https://media.rawg.io/media/games/e48/e4852b9be5eb6859870288d91f74aab6.jpg'
      },
      released_at: '1991-06-23',
      requirements: null
    },
    {
      platform: {
        id: 8,
        name: 'Nintendo 3DS',
        slug: 'nintendo-3ds',
        image: null,
        year_end: null,
        year_start: null,
        games_count: 1708,
        image_background:
          'https://media.rawg.io/media/games/89a/89ac2742fcfeba3b95ac94457af766ef.jpg'
      },
      released_at: '1991-06-23',
      requirements: null
    },
    {
      platform: {
        id: 11,
        name: 'Wii',
        slug: 'wii',
        image: null,
        year_end: null,
        year_start: null,
        games_count: 2303,
        image_background:
          'https://media.rawg.io/media/screenshots/25d/25df88db8714961a93e5ae1ecaa50e45.jpg'
      },
      released_at: '1991-06-23',
      requirements: null
    },
    {
      platform: {
        id: 14,
        name: 'Xbox 360',
        slug: 'xbox360',
        image: null,
        year_end: null,
        year_start: null,
        games_count: 2491,
        image_background:
          'https://media.rawg.io/media/games/198/1988a337305e008b41d7f536ce9b73f6.jpg'
      },
      released_at: '1991-06-23',
      requirements: null
    },
    {
      platform: {
        id: 16,
        name: 'PlayStation 3',
        slug: 'playstation3',
        image: null,
        year_end: null,
        year_start: null,
        games_count: 3568,
        image_background:
          'https://media.rawg.io/media/games/d1a/d1a2e99ade53494c6330a0ed945fe823.jpg'
      },
      released_at: '1991-06-23',
      requirements: null
    },
    {
      platform: {
        id: 3,
        name: 'iOS',
        slug: 'ios',
        image: null,
        year_end: null,
        year_start: null,
        games_count: 65273,
        image_background:
          'https://media.rawg.io/media/games/bc0/bc06a29ceac58652b684deefe7d56099.jpg'
      },
      released_at: '1991-06-23',
      requirements: null
    },
    {
      platform: {
        id: 4,
        name: 'PC',
        slug: 'pc',
        image: null,
        year_end: null,
        year_start: null,
        games_count: 207283,
        image_background:
          'https://media.rawg.io/media/games/c88/c885ae6a24bbce21df93b6c4e1c78899.jpg'
      },
      released_at: '1991-06-23',
      requirements: null
    },
    {
      platform: {
        id: 167,
        name: 'Genesis',
        slug: 'genesis',
        image: null,
        year_end: null,
        year_start: null,
        games_count: 775,
        image_background:
          'https://media.rawg.io/media/screenshots/8ec/8ec4602c7f3e9f3a1ee51dd8582a7b78.jpeg'
      },
      released_at: '1991-06-23',
      requirements: null
    }
  ],
  stores: [
    {
      id: 245826,
      url:
        'https://store.playstation.com/en-us/product/UP0177-NPUB30442_00-SVCSONICHEDGEHOG',
      store: {
        id: 3,
        name: 'PlayStation Store',
        slug: 'playstation-store',
        domain: 'store.playstation.com',
        games_count: 6228,
        image_background:
          'https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg'
      }
    },
    {
      id: 245827,
      url:
        'https://apps.apple.com/app/sonic-the-hedgehog/id316025912?mt=8&uo=4',
      store: {
        id: 4,
        name: 'App Store',
        slug: 'apple-appstore',
        domain: 'apps.apple.com',
        games_count: 63794,
        image_background:
          'https://media.rawg.io/media/games/81b/81b138691f027ed1f8720758daa0d895.jpg'
      }
    },
    {
      id: 245829,
      url:
        'https://marketplace.xbox.com/en-us/product/sonic-the-hedgehog/66acd000-77fe-1000-9115-d802534507d6',
      store: {
        id: 7,
        name: 'Xbox 360 Store',
        slug: 'xbox360',
        domain: 'marketplace.xbox.com',
        games_count: 1759,
        image_background:
          'https://media.rawg.io/media/games/f99/f9979698c43fd84c3ab69280576dd3af.jpg'
      }
    },
    {
      id: 245828,
      url:
        'https://www.nintendo.com/games/detail/4lfd-f60qanio7sndl4scm2mr7uuexvw',
      store: {
        id: 6,
        name: 'Nintendo Store',
        slug: 'nintendo',
        domain: 'nintendo.com',
        games_count: 7645,
        image_background:
          'https://media.rawg.io/media/games/73e/73eecb8909e0c39fb246f457b5d6cbbe.jpg'
      }
    },
    {
      id: 245825,
      url: 'http://store.steampowered.com/app/71113/',
      store: {
        id: 1,
        name: 'Steam',
        slug: 'steam',
        domain: 'store.steampowered.com',
        games_count: 39796,
        image_background:
          'https://media.rawg.io/media/games/490/49016e06ae2103881ff6373248843069.jpg'
      }
    }
  ],
  developers: [
    {
      id: 425,
      name: 'SEGA',
      slug: 'sega',
      games_count: 497,
      image_background:
        'https://media.rawg.io/media/screenshots/50a/50a5ff62488509688cd51845eb9defbd.jpg'
    },
    {
      id: 8254,
      name: 'Sonic Team',
      slug: 'sonic-team',
      games_count: 62,
      image_background:
        'https://media.rawg.io/media/screenshots/3a6/3a66a199ed4c3907cb406b91bdcc57a2.jpg'
    }
  ],
  genres: [
    {
      id: 4,
      name: 'Action',
      slug: 'action',
      games_count: 81371,
      image_background:
        'https://media.rawg.io/media/games/81b/81b138691f027ed1f8720758daa0d895.jpg'
    },
    {
      id: 3,
      name: 'Adventure',
      slug: 'adventure',
      games_count: 55797,
      image_background:
        'https://media.rawg.io/media/games/4a0/4a0a1316102366260e6f38fd2a9cfdce.jpg'
    },
    {
      id: 11,
      name: 'Arcade',
      slug: 'arcade',
      games_count: 22006,
      image_background:
        'https://media.rawg.io/media/screenshots/ee5/ee5b9a08f766c4f97a348b09b4a97034.jpg'
    }
  ],
  tags: [
    {
      id: 243,
      name: "1990's",
      slug: '1990s',
      language: 'eng',
      games_count: 136,
      image_background:
        'https://media.rawg.io/media/screenshots/d8b/d8bd640838b87758b35a110238946784.jpg'
    },
    {
      id: 45,
      name: '2D',
      slug: '2d',
      language: 'eng',
      games_count: 55355,
      image_background:
        'https://media.rawg.io/media/games/dd5/dd50d4266915d56dd5b63ae1bf72606a.jpg'
    },
    {
      id: 40845,
      name: 'Partial Controller Support',
      slug: 'partial-controller-support',
      language: 'eng',
      games_count: 5971,
      image_background:
        'https://media.rawg.io/media/games/bc0/bc06a29ceac58652b684deefe7d56099.jpg'
    },
    {
      id: 193,
      name: 'Classic',
      slug: 'classic',
      language: 'eng',
      games_count: 1358,
      image_background:
        'https://media.rawg.io/media/games/7a2/7a2500ee8b2c0e1ff268bb4479463dea.jpg'
    },
    {
      id: 165,
      name: 'Colorful',
      slug: 'colorful',
      language: 'eng',
      games_count: 5013,
      image_background:
        'https://media.rawg.io/media/games/9a1/9a18c226cf379272c698f26d2b79b3da.jpg'
    },
    {
      id: 107,
      name: 'Family Friendly',
      slug: 'family-friendly',
      language: 'eng',
      games_count: 952,
      image_background:
        'https://media.rawg.io/media/games/2a2/2a2f9a0035544500e59a171c7038ec3a.jpg'
    },
    {
      id: 131,
      name: 'Fast-Paced',
      slug: 'fast-paced',
      language: 'eng',
      games_count: 4563,
      image_background:
        'https://media.rawg.io/media/games/88a/88af17cc08783ccdd1608ae63c47eeac.jpg'
    },
    {
      id: 42,
      name: 'Great Soundtrack',
      slug: 'great-soundtrack',
      language: 'eng',
      games_count: 2783,
      image_background:
        'https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg'
    },
    {
      id: 106,
      name: 'Pinball',
      slug: 'pinball',
      language: 'eng',
      games_count: 485,
      image_background:
        'https://media.rawg.io/media/screenshots/793/793f50cc86bce0713d494c5ec5e6563f.jpg'
    },
    {
      id: 122,
      name: 'Pixel Graphics',
      slug: 'pixel-graphics',
      language: 'eng',
      games_count: 25760,
      image_background:
        'https://media.rawg.io/media/games/4cb/4cb855e8ef1578415a928e53c9f51867.png'
    },
    {
      id: 74,
      name: 'Retro',
      slug: 'retro',
      language: 'eng',
      games_count: 12140,
      image_background:
        'https://media.rawg.io/media/games/003/0031c0067559d41df19cf98ad87e02aa.jpg'
    },
    {
      id: 31,
      name: 'Singleplayer',
      slug: 'singleplayer',
      language: 'eng',
      games_count: 65617,
      image_background:
        'https://media.rawg.io/media/games/8d6/8d69eb6c32ed6acfd75f82d532144993.jpg'
    }
  ],
  publishers: [
    {
      id: 3408,
      name: 'SEGA',
      slug: 'sega-2',
      games_count: 1065,
      image_background:
        'https://media.rawg.io/media/screenshots/e1e/e1e549193e18bc25124d4484395ae37f.jpg'
    }
  ],
  esrb_rating: null,
  clip: null,
  description_raw:
    'Sonic The Hedgehog is a 2D platform game, the first installment in Sega’s Sonic the Hedgehog series. \n\n###Plot \nThe game takes place on South Island and follows Sonic — an anthropomorphic blue hedgehog. The game’s antagonist, a brilliant but insane scientist Dr. Robotnik attempts to take possession of the power of six Chaos Emeralds by entrapping South Island’s animal inhabitants inside hostile robots. Sonic decides to hinder Robotnik’s plans by freeing animals and collecting the emeralds himself.  \n\n###Gameplay \nThe game consists of six zones each of which is divided into three acts. In the first two acts, your goal is to reach the finish while the third act ends with a boss fight against Dr. Robotnik. After completing the sixth zone, you enter the Final Zone which consists of one act and the final battle against Robotnik. The level in the game is usually relatively roomy and implicate various ways of completing. The gameplay is centered on Sonic’s ability to run at high speed. Thereby the levels involve many slopes, loops, springs. Sonic can use Spin Attack to attack enemies or destroy certain obstacles.\nThe Spin Attack can be activated by gaining high speed while rolling on the ground or jumping. The players’ health depends on the main collectibles of the game – golden rings placed throughout the levels and collecting one hundred of them gives you an extra life. Also, as long as Sonic has at least one ring, upon getting hit he scatters rings instead of losing a life.'
};

function App(props) {
  const availablePlatforms = ['Genesis', 'NES'];
  const [allPlatromsList, setAllPlatformsList] = useState();
  const [selectedPlatform, setSelectedPlatform] = useState('Genesis');
  const [selectedPlatformInfo, setSelectedPlatformInfo] = useState();
  const [selectedGame, setSelectedGame] = useState(fakeSelecredGame);

  useEffect(() => {
    Backend.getAllPlatfroms().then(res =>
      setAllPlatformsList([...res.results])
    );
  }, []);

  useEffect(() => {
    if (selectedPlatform && allPlatromsList) {
      allPlatromsList.forEach(platform => {
        if (platform.name === selectedPlatform) {
          setSelectedPlatformInfo(platform);
        }
      });
    }
  }, [selectedPlatform, allPlatromsList]);

  const selectPlatformHandler = platformName => {
    setSelectedPlatform(platformName);
    if (platformName) props.history.push('/select_game');
  };

  const openGameDetailsHandler = slug => {
    Backend.getGameDetails(slug).then(res => {
      //   setSelectedGame(res);
    });
    props.history.push(`/select_game/${slug}`);
  };

  return (
    <div className="App">
      <Layout>
        <Navigation />
        <Route
          exact
          path="/home"
          render={props => (
            <PlatformSelector
              {...props}
              platforms={availablePlatforms}
              selectPlatform={selectPlatformHandler}
            />
          )}
        />
        {selectedPlatform && selectedPlatformInfo && (
          <Route
            exact
            path="/select_game"
            render={props => (
              <GameSelector
                {...props}
                platform={selectedPlatform}
                platformInfo={selectedPlatformInfo}
                selectPlatform={selectPlatformHandler}
                openGameDetails={openGameDetailsHandler}
              />
            )}
          />
        )}
        {selectedGame && (
          <Route
            path={`/select_game/:gameSlug`}
            render={props => (
              <GameDetailed {...props} gameInfo={selectedGame} />
            )}
          />
        )}
      </Layout>
    </div>
  );
}

export default withRouter(App);
