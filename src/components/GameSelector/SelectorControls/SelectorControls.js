import React from 'react';
import styles from './SelectorControls.css';
import Input from '../../UI/Input/Input';
import SelectBox from '../../UI/SelectBox/SelectBox';
import Button from '../../UI/Button/Button';

export default function SelectorControls(props) {
	const {
		gameSearchChange,
		selectChange,
		directionChange,
		sendRequest,
		ordering,
		orderingOptions
	} = props;

	return (
		<div className={styles.SelectorControls}>
			<div className={styles.SearchContainer}>
				<div>
					<p>Search game :</p>
				</div>
				<div>
					{' '}
					<Input
						type="text"
						placeholder="Name of a game"
						name="gameSearch"
						onChange={gameSearchChange}
						onKeyPress={sendRequest}
					/>
					<Button txtContent="Search" onClick={sendRequest} name="searchBtn" />
				</div>
			</div>
			<div className={styles.FilterContainer}>
				<div>
					<p>Filter by :</p>
				</div>
				<div>
					<SelectBox
						selected={ordering.name}
						options={orderingOptions}
						changedSelected={selectChange}
						height={'20px'}
						width={'80%'}
					/>
					<Button txtContent="↓" onClick={directionChange} direction="desc" />
					<Button txtContent="↑" onClick={directionChange} direction="acs" />
				</div>
			</div>
		</div>
	);
}
