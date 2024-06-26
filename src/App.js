import React, {useState,useEffect} from 'react';
import {CssBaseline , Grid} from '@material-ui/core';

import Header  from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlacesData , getWeatherData} from './api';


const App = () => {
	const [places, setPlaces] = useState([]);
	const [WeatherData, setWeatherData] = useState([]);
	const [childClicked, setchildClicked] = useState(null);
	const [filteredPlaces, setFilteredPlaces] = useState([]);
	const [coordinates, setCoordinates] = useState({});
	const [bounds, setBounds] = useState({});

	const [isloading, setIsLoading] = useState(false);
	const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

	useEffect(() => {
		if(navigator.geolocation){
			navigator.permissions.query({name : "geolocation"}).then(function(result){
				if(result.state === "granted"){
					console.log(result.state);
					navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
						setCoordinates({lat:latitude, lng:longitude});
					})
				}else if(result.state === "prompt"){
					console.log(result.state)
				}else if(result.state === "denied"){
					alert('please open your location');
				}
			})
		}
	},[]);

	useEffect(() => {
		const filteredPlaces = places.filter((place) => place.rating > rating)
		setFilteredPlaces(filteredPlaces);
	},[rating])

	useEffect(() => {
		if (bounds) {
			setIsLoading(true);
			getWeatherData(coordinates.lat, coordinates.lng)
			.then((data) => setWeatherData(data));
			getPlacesData(type, bounds.sw, bounds.ne)
			.then((data) => {
				setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
				setFilteredPlaces([]);
				setIsLoading(false);
			})
		}
	}, [type, coordinates, bounds]);

	return (
		<>
			<CssBaseline />
			<Header setCoordinates={setCoordinates}/>
			<Grid container spacing={3} style={{width : '100%'}}>
				<Grid item xs={12} md={4}>
					<List 
						Places={filteredPlaces.length ? filteredPlaces : places}
						childClicked={childClicked}	
						isloading={isloading}
						type={type}
						setType={setType}
						rating={rating}
						setRating={setRating}
					/>
				</Grid>
				<Grid item xs={12} md={8}>
					<Map  
						setCoordinates={setCoordinates}
						setBounds={setBounds}
						coordinates={coordinates}
						Places={filteredPlaces.length  ? filteredPlaces : places}
						setchildClicked={setchildClicked}
						WeatherData={WeatherData}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default App;
