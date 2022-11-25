import { useState } from "react";
import AutoComplete from "react-google-autocomplete";
import "./App.css";

/**
 * docs:
 * place types: https://developers.google.com/maps/documentation/places/web-service/supported_types
 *
 */
function App() {
	const [predictions, setPredictions] = useState<Place>({});
	return (
		<div className='card'>
			<h1>Type in your street</h1>
			<p>
				Library:
				<a
					target={"_blank"}
					href='https://www.npmjs.com/package/react-google-autocomplete'
				>
					react-google-autocomplete
				</a>
			</p>
			<AutoComplete
				apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
				onPlaceSelected={(place: Place) => {
					console.log(place);
					setPredictions(place);
				}}
				options={{
					types: ["geocode"],
				}}
			/>
			<br />
			<code>{JSON.stringify(predictions)}</code>
		</div>
	);
}

export default App;

type Place = google.maps.places.PlaceResult;
