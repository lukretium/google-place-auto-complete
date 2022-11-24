import { useState } from "react";
import AutoComplete from "react-google-autocomplete";
import "./App.css";
import { Hook } from "./Hook";

function App() {
	const [predictions, setPredictions] = useState({});

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
				apiKey={import.meta.env.GOOGLE_API_KEY}
				onPlaceSelected={(place) => setPredictions(place)}
				options={{
					types: ["geocode", "establishment"],
				}}
			/>
			<br />
			<code>{JSON.stringify(predictions)}</code>
			<Hook />
		</div>
	);
}

export default App;
