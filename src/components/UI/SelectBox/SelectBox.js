import React, { useState, useEffect } from 'react';
import styles from './SelectBox.css';

export default function SelectBox(props) {
	const { selected, options, changedSelected, height, width } = props;
	const [showDropdown, setShowDropdown] = useState(false);
	const [selectedValue, setSelectedValue] = useState(selected);

	const clickHandler = e => {
		setShowDropdown(!showDropdown);
	};

	const changeHandler = e => {
		setSelectedValue(e.target.textContent);
	};

	useEffect(() => {
		changedSelected(selectedValue);
	}, [selectedValue]);

	return (
		<div
			className={styles.SelectBox}
			onClick={clickHandler}
			style={{ height: height, width: width }}>
			<div>
				<p style={{ lineHeight: height }}>{selectedValue}</p>
			</div>
			{showDropdown && (
				<div className={styles.Options} style={{ top: 0, top: height }}>
					{options.map(option => {
						if (option != selectedValue) {
							return (
								<div key={option} onClick={changeHandler}>
									<p style={{ lineHeight: height }}>{option}</p>
								</div>
							);
						}
					})}
				</div>
			)}
		</div>
	);
}
