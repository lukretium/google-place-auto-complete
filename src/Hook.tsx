import { useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";

export const Hook = () => {
	const [address, setAddress] = useState(null);

	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		requestOptions: {
			// region: "DE",
			/* Define search scope here */
		},
		debounce: 300,
	});
	const ref = useOnclickOutside(() => {
		// When user clicks outside of the component, we can dismiss
		// the searched suggestions by calling this method
		clearSuggestions();
	});

	const handleInput = (e) => {
		// Update the keyword of the input element
		setValue(e.target.value);
	};

	const handleSelect =
		({ description }) =>
		() => {
			// When user selects a place, we can replace the keyword without request data from API
			// by setting the second parameter to "false"
			setValue(description, false);
			clearSuggestions();

			// Get latitude and longitude via utility functions
			getGeocode({ address: description }).then((results) => {
				console.log(results[0]);
				setAddress(results[0]);
				const { lat, lng } = getLatLng(results[0]);
				console.log("📍 Coordinates: ", { lat, lng });
			});
		};

	const renderSuggestions = () =>
		data.map((suggestion) => {
			// console.log(suggestion);
			const {
				place_id,
				structured_formatting: { main_text, secondary_text },
			} = suggestion;

			return (
				<li key={place_id} onClick={handleSelect(suggestion)}>
					<strong>{main_text}</strong> <small>{secondary_text}</small>
				</li>
			);
		});

	return (
		<>
			<h1>Another approach</h1>
			<p>
				Library:
				<a
					target={"_blank"}
					href='https://www.npmjs.com/package/use-places-autocomplete'
				>
					use-places-autocomplete
				</a>
			</p>
			<div ref={ref}>
				<input
					value={value}
					onChange={handleInput}
					disabled={!ready}
					placeholder='Geben Sie einen Standort ein.'
				/>
				{/* We can use the "status" to decide whether we should display the dropdown or not */}
				{status === "OK" && <ul>{renderSuggestions()}</ul>}
			</div>
			<pre>{value}</pre>
			<>
				<code>{JSON.stringify(address)}</code>
			</>
		</>
	);
};
