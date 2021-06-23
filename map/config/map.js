// store map configuration & layers

// initial conditions
export const config = {
    accessToken: "pk.eyJ1IjoicGFzaWgiLCJhIjoiY2pybzJqdTVjMHJzeDQ0bW80aGdzaXV3ayJ9.yxD8Nqu7FLnf8-lBo7F1zQ",
    minZoom: 2,
    padding: 0.1
}

// sources for the map layers
export const sources = {
    places: {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/shelbygreen/wedding-map/main/data/places.geojson',
    },
}

// settings for the map layers
export const layers = [
    {
      id: "places-fill",
      source: 'places',
      type: 'circle',
      paint: {
        'circle-color': 'orange',
        // 'circle-outline-color': 'white'
      },
      layout: {
        visibility: 'visible',
        },
    }
]