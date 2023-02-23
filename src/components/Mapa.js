import React from 'react'
import {useJsApiLoader, GoogleMap} from '@react-google-maps/api'
import { Box } from '@mui/system'
import { useState } from 'react'
import { Marker } from '@react-google-maps/api'

const location = {
    address: '1600 Amphitheatre Parkway, Mountain View, california.',
    lat: 37.42216,
    lng: -122.08427,
  }

const center = { lat: 48.8584, lng: 2.2945 }

export default function Mapa(props){

    const [map, setMap] = useState(/** @type google.maps.Map */ (null))

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey : process.env.REACT_APP_GOOGLE_MAPS_API_KEY
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
            <Marker position={center} />
           
          </GoogleMap>
        </Box> 
                
    )


}