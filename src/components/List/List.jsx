import React, {useState ,useEffect , createRef} from 'react';
import {CircularProgress,  Grid , Typography, InputLabel, MenuItem, FormControl, Select} from '@material-ui/core';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

import useStyles from './styles';

const List = ({ Places, childClicked ,isloading, type, setType,rating,setRating}) => {
    console.log('==========Places======',Places)
    const classes = useStyles();
    const [elRefs, setelRefs] = useState([]);

    useEffect(() => {
        const refs = Array(Places?.length).fill().map((_, i) => elRefs[i] || createRef());
        setelRefs(refs);
    },[Places]);

    return (
        <div className={classes.container}>
            <Typography variant="h4" > Restaurants, Hotels & Attractions around you </Typography>
            {isloading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem"/>
                </div>
            ) : (
                <>
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="restaurants">Restaurants</MenuItem> 
                    <MenuItem value="hotels">Hotels</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Ratings</InputLabel>
                <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value={0}>All</MenuItem> 
                    <MenuItem value={3}>above 3.0</MenuItem> 
                    <MenuItem value={4}>above 4.0</MenuItem> 
                    <MenuItem value={4.5}>above 4.5</MenuItem>                     
                </Select>
            </FormControl>
            {/* {Places.length != 0 ? 
                (  */}
                    <Grid container spacing={3} className='classes.list'>
                        {Places?.map((place, i) => (
                            <Grid item key={i} xs={12}>
                            <PlaceDetails 
                                    place={place} 
                                    selected={Number(childClicked) === i}
                                    refProp={elRefs[i]}
                                /> 
                            </Grid>
                        ))}
                    </Grid>
                {/* ) : (
                    <Grid container spacing={3} className='classes.list'> 
                        please zoom out the map screen and find the {type}
                    </Grid>
                )} */}
            </>
            )}
        </div>
    );
}

export default List;