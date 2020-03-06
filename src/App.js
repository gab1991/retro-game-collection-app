import React, { useEffect, useState } from 'react';
import Layout from './components/Layout/Layout';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import PlatformSelector from './components/PlatformSelector/PlatformSelector';
import Backend from './Backend/Backend';
import GameSelector from './components/GameSelector/GameSelector';

function App(props) {
  const availablePlatforms = ['Genesis', 'NES'];
  const [allPlatromsList, setAllPlatformsList] = useState();
  const [availablePlatformsInfo, setAvailablePlatformsInfo] = useState();
  const [selectedPlatform, setSelectedPlatform] = useState('Genesis');

  useEffect(() => {
    Backend.getAllPlatfroms().then(res =>
      setAllPlatformsList([...res.results])
    );
  }, []);

  useEffect(() => {
    console.log(selectedPlatform);
  }, [selectedPlatform]);

  useEffect(() => {
    console.log(availablePlatformsInfo);
  }, [availablePlatformsInfo]);

  useEffect(() => {
    if (allPlatromsList) {
      let platformInfo = [];
      availablePlatforms.forEach(platformName => {
        for (let i = 0; i < allPlatromsList.length; i++) {
          if (allPlatromsList[i].name === platformName) {
            platformInfo.push([platformName, allPlatromsList[i]]);
          }
        }
      });
      setAvailablePlatformsInfo(platformInfo);
    }
  }, [allPlatromsList]);

  const selectPlatformHandler = platformName => {
    setSelectedPlatform(platformName);
  };

  return (
    <div className="App">
      <Layout>
        <Navigation />
        {!selectedPlatform && (
          <PlatformSelector
            platforms={availablePlatforms}
            selectPlatform={selectPlatformHandler}
          />
        )}
        {selectedPlatform && <GameSelector platform={selectedPlatform} />}
      </Layout>
    </div>
  );
}

export default App;
