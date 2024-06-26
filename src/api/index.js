import axios from 'axios';


export const getPlacesData = async (type, sw, ne) => {
    console.log('swsw',sw)
    try{
        const {data : {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng, 
            },
            headers: {
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
              'X-RapidAPI-Key': 'd640df6a15msh223138c43cf8689p1a2ee2jsn426c7b85412e'
            }
          });
        return data
    }catch(error){
        console.log(error)

    }
}

export const getWeatherData = async (lat, lng) => {
  try{
    const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find',{
      params: {
        lat: lat,
        lon: lng,
      },
      headers: {
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_WEATHER_API_KEY
      }

    })
  }catch (error){
    console.log('===error====',error)
  }
}