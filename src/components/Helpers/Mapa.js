import React from 'react'
import {useJsApiLoader, GoogleMap, useLoadScript} from '@react-google-maps/api'
import { Box } from '@mui/system'
import { useState } from 'react'
import { Marker } from '@react-google-maps/api'


export default function Mapa(props){


    const center = {lat:props?.latitud , lng:props?.longitud}
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))

    const {isLoaded} = useLoadScript({
        googleMapsApiKey : "AIzaSyBDqZnbqvEV_yACNbuxh2srQHOjQ3_UYDc"
    })

    if(!isLoaded){
        return <div>Loading...</div>
    }
    
    return(   
        <Box  left={0} top={0} h='100%' w='100%'>
          {/* Google Map Box */}
          <GoogleMap
          style={{position:'relative'}}
            center={center}
            zoom={15}
            mapContainerStyle={{ height: '400px' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={map => setMap(map)}
          >
            <Marker position={ center } />
           
          </GoogleMap>
        </Box> 
                
    )


}