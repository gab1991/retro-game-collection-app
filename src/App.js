import React, { useEffect, useState } from 'react';
import { withRouter, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import PlatformSelector from './components/PlatformSelector/PlatformSelector';
import Backend from './Backend/Backend';
import GameSelector from './components/GameSelector/GameSelector';

function App(props) {
	const availablePlatforms = ['Genesis', 'NES'];
	const [allPlatromsList, setAllPlatformsList] = useState();
	const [selectedPlatform, setSelectedPlatform] = useState();
	const [selectedPlatformInfo, setSelectedPlatformInfo] = useState();

	useEffect(() => {
		Backend.getAllPlatfroms().then(res =>
			setAllPlatformsList([...res.results])
		);
		props.history.push('/home');
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
		if (platformName) props.history.push('/selectGame');
	};
	console.log(props);
	return (
		<div className="App">
			<Layout>
				<Navigation />
				{!selectedPlatform && (
					<Route
						path="/home"
						render={props => (
							<PlatformSelector
								{...props}
								platforms={availablePlatforms}
								selectPlatform={selectPlatformHandler}
							/>
						)}
					/>
				)}
				{selectedPlatform && selectedPlatformInfo && (
					<Route
						path="/selectGame"
						render={props => (
							<GameSelector
								{...props}
								platform={selectedPlatform}
								platformInfo={selectedPlatformInfo}
								selectPlatform={selectPlatformHandler}
							/>
						)}
					/>
				)}
			</Layout>
		</div>
	);
}

export default withRouter(App);
