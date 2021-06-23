// import modules
import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import { siteMetadata } from '../../../gatsby-config'
import { sources, layers } from '../../../config/map'
import styled from '../../../util/style'

// wrapper component
const Wrapper = styled.div`
    height: 100%;
`

// mapbox token
const mapboxToken = siteMetadata.mapboxToken

// map component
const Map = () => {

    if (!mapboxToken) {
        console.error(
            'ERROR: Mapbox token is required in gatsby-config.js siteMetadata'
        )
    }

    const mapContainer = useRef(null)
    const mapRef = useRef(null)
    const baseStyleRef = useRef(null) 
    
    // initialize map when component mounts
    useEffect(() => {
        mapboxgl.accessToken = siteMetadata.mapboxToken
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: `mapbox://styles/shelby-green/ckpe45kll0we417n7cgs8cxne`,
            center: [-84.28, 30.44],
            zoom: 8, 
            minZoom: 2
        })

        mapRef.current = map
        window.map = map

        map.on('load', () => { 

            // snapshot existing map config
            baseStyleRef.current = fromJS(map.getStyle())
            window.baseStyle = baseStyleRef.current
            
            // add every source
            Object.entries(sources).forEach(([id, source]) => {
                map.addSource(id, source)
            })
            
            // add every layer to the map 
            // layers is an array of the individual layers
            layers.forEach(layer => {
                map.addLayer(layer)
            })

            map.resize();
        });

        map.on('click', function(mapElement) {
            // when you click a point on the map, query the features under the point and store
            // in the variable 'features'
            const features = map.queryRenderedFeatures(mapElement.point, {
                layers: ['places-fill']
            })

            const html = ``; 

            // create tooltip variable for the floating card div
            const tooltip = document.getElementById('floating-card')
            
            // store html in the tooltip, which will be displayed in the floating card div
            tooltip.innerHTML = html
            
        });

        // change cursor to pointer when hovering over a point
        map.on('mouseenter', function(mapElement) {
            // when you hover over a point on the map, query the features under the point and store
            // in the variable 'features'
            const features = map.queryRenderedFeatures(mapElement.point, {
                layers: ['places-fill']
            })
            // if there's something under the point (the features variable is not null)
            // then change the style of the cursor to pointer
            // to signal that you can click here
            if (features.length) {
                map.getCanvas().style.cursor = 'pointer';
            }
        });

        // change the cursor back to the "grabbing" mouse when you're not hovering over a clickable feature -- which is just a district
        map.on('mouseleave', function () {
            map.getCanvas().style.cursor = '';
        });

        // clean up on unmount
        return () => map.remove();
    
    }, [])

    return (
    <Wrapper>
        <MapContainer ref={mapContainer} style={{ width: '100%', height: '100%' }}/>
        <Sidebar>
            <div id="floating-card">
                <b>Places Details</b>
            </div>
            </Sidebar>
    </Wrapper>
    )

}

export default Map