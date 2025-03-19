import {useEffect, useState, useRef, useCallback} from 'react';
import {
    Pin, 
    AdvancedMarker, 
    APIProvider, 
    Map, 
    MapCameraChangedEvent, 
    useMap
    } from '@vis.gl/react-google-maps';
import {MarkerClusterer} from '@googlemaps/markerclusterer';
import type {Marker} from '@googlemaps/markerclusterer';

type Poi = { key: string, location: google.maps.LatLngLiteral }
const locations: Poi[] = [
    {key: 'Luminary by La Terza', location: {lat: 39.2028426, lng: -84.5577283}},
    {key: 'Bacalls Cafe', location: {lat: 39.2025175, lng: -84.5577855}},
    {key: 'The Coffee Exchange', location: {lat: 39.1818841, lng: -84.440004}},
    {key: 'Deeper Roots Coffee', location: {lat: 39.2252124, lng: -84.3575411}},
    {key: 'Rohs Street Cafe', location: {lat: 39.1276809, lng: -84.5240077}},
    {key: 'Square Mile Coffee Roasters', location: {lat: 39.2309091, lng: -84.5506915}},
    {key: 'Carabello Coffee', location: {lat: 39.0885723, lng: -84.4926571}},
    {key: 'Coffee Emporium', location: {lat: 39.088565, lng: -84.5313728}},
    {key: '1215 Wine Bar & Coffee Lab', location: {lat: 39.1087445, lng: -84.5199201}},  
    {key: 'Lookout Joe', location: {lat: 39.1295482, lng: -84.430314}},
    {key: 'Trailhead Coffee', location: {lat: 39.0902117, lng: -84.4953343}},
    {key: 'Sidewinder Coffee', location: {lat: 39.1629902, lng: -84.5427382}}

]




export default function MapView() {
    const mapContainerStyle = { width: '100%', height: '100vh' }; // Ensure the map occupies visible space

    return (
        <APIProvider 
            apiKey={process.env.GOOGLE_MAPS_API_KEY || import.meta.env.VITE_GOOGLE_MAPS_API_KEY} 
            onLoad={() => console.log('Maps API has loaded.')}
            onError={(error) => console.error('Failed to load Maps API:', error)} // Add error handling
        >
            <Map
                defaultZoom={13}
                defaultCenter={{lat: 39.2028426, lng: -84.5577283}}
                mapId='4991ba7a280d184e'
                style={mapContainerStyle} // Apply styles to the map container
                onCameraChanged={(ev: MapCameraChangedEvent) => 
                    console.log('camera changed:', ev.detail.center, 'zoom: ', ev.detail.zoom)
                }
            >
                <PoiMarkers pois={locations} />
            </Map>
        </APIProvider>
    );
}

const PoiMarkers = (props: {pois: Poi[]}) => {
    const map = useMap();
    // const [markers, setMarkers] = useState<{[key: string]: Marker}>({});
    // const clusterer = useRef<MarkerClusterer | null>(null);

    // useEffect(() => {
    //     if (!map) return;
    //     if (!clusterer.current) {
    //         clusterer.current = new MarkerClusterer({map});
    //     }
    // }, [map])

    // useEffect(() => {
    //     clusterer.current?.clearMarkers();
    //     clusterer.current?.addMarkers(Object.values(markers));
    // }, [markers])
    
    // const setMarkerRef = (marker: Marker | null, key: string) => {
    //     if (marker && markers[key]) return;
    //     if (!marker && !markers[key]) return;

    //     setMarkers(prev => {
    //         if(marker) {
    //             return {...prev, [key]: marker};
    //         } else {
    //             const newMarkers = {...prev};
    //             delete newMarkers[key];
    //             return newMarkers;
    //         }
    //     });
    // };

    const handleClick = useCallback((ev: google.maps.MapMouseEvent) => {
        
        if (!map) return;
        if (!ev.latLng) return;
        console.log('clicked:', ev.latLng.toJSON());
        map.panTo(ev.latLng);
    }, [map]);
    

    return (
        <>
            {props.pois.map( (poi: Poi) => {
                console.log(poi)
                return (
                <AdvancedMarker
                    key={poi.key}
                    position={poi.location}
                    // ref={marker => setMarkerRef(marker, poi.key)}
                    onClick={handleClick}
                    >

                    <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
                </AdvancedMarker>
                )
                
            })}
        </>
    )
}