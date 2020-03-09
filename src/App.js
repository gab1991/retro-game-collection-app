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
	const [selectedPlatform, setSelectedPlatform] = useState('Genesis');
	const [selectedPlatformInfo, setSelectedPlatformInfo] = useState();

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
				{selectedPlatform && selectedPlatformInfo && (
					<GameSelector
						platform={selectedPlatform}
						platformInfo={selectedPlatformInfo}
					/>
				)}
			</Layout>
		</div>
	);
}

export default App;
