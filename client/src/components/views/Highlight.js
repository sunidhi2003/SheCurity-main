import React, { useEffect, useState } from "react";
import "./Highlight.css";

const Highlight = () => {
    const [map, setMap] = useState(null);
    const [city, setCity] = useState("");
    const [polygons, setPolygons] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [selectedZones, setSelectedZones] = useState([]);

    const allAlertZones = {
        mumbai: [
            {
                name: "Red Alert Zone 1 - Mumbai Central",
                coords: [
                    {lat: 19.0760, lng: 72.8777},
                    {lat: 19.0850, lng: 72.8877},
                    {lat: 19.0650, lng: 72.8877},
                    {lat: 19.0650, lng: 72.8777}
                ],
                description: "This area is known for frequent pickpocketing and harassment. Avoid isolated areas, especially after dark.",
                googleMapsLink: "https://www.google.com/maps?q=19.0760,72.8777"
            },
            {
                name: "Red Alert Zone 2 - Andheri East",
                coords: [
                    {lat: 19.0700, lng: 72.8750},
                    {lat: 19.0700, lng: 72.8650},
                    {lat: 19.0600, lng: 72.8650},
                    {lat: 19.0600, lng: 72.8750}
                ],
                description: "A commercial area that sees high rates of street harassment. Women should avoid late-night travel alone.",
                googleMapsLink: "https://www.google.com/maps?q=19.0700,72.8750"
            }
        ],
        delhi: [
            {
                name: "Red Alert Zone 1 - Connaught Place",
                coords: [
                    {lat: 28.6139, lng: 77.2090},
                    {lat: 28.6200, lng: 77.2150},
                    {lat: 28.6000, lng: 77.2150},
                    {lat: 28.6000, lng: 77.2090}
                ],
                description: "A busy area with a high volume of foot traffic. Be cautious of groping, stalking, and other crimes, especially late at night.",
                googleMapsLink: "https://www.google.com/maps?q=28.6139,77.2090"
            },
            {
                name: "Red Alert Zone 2 - Outer Delhi (Rohini & Jahangirpuri)",
                coords: [
                    {lat: 28.7081, lng: 77.1088},
                    {lat: 28.7176, lng: 77.1183},
                    {lat: 28.6950, lng: 77.1183},
                    {lat: 28.6950, lng: 77.1088}
                ],
                description: "This area has witnessed rising incidents of assault and harassment. Women traveling alone should be extra cautious.",
                googleMapsLink: "https://www.google.com/maps?q=28.7081,77.1088"
            }
        ],
        bengaluru: [
            {
                name: "Red Alert Zone 1 - MG Road",
                coords: [
                    {lat: 12.9716, lng: 77.6068},
                    {lat: 12.9748, lng: 77.6100},
                    {lat: 12.9675, lng: 77.6100},
                    {lat: 12.9675, lng: 77.6068}
                ],
                description: "MG Road is a commercial hub where instances of harassment are prevalent. Be cautious when navigating through crowded areas.",
                googleMapsLink: "https://www.google.com/maps?q=12.9716,77.6068"
            },
            {
                name: "Red Alert Zone 2 - Whitefield",
                coords: [
                    {lat: 12.9769, lng: 77.7507},
                    {lat: 12.9869, lng: 77.7607},
                    {lat: 12.9669, lng: 77.7607},
                    {lat: 12.9669, lng: 77.7507}
                ],
                description: "Whitefield, known for its IT hubs, is becoming notorious for harassment cases. Night commuting is particularly risky.",
                googleMapsLink: "https://www.google.com/maps?q=12.9769,77.7507"
            }
        ]
    };

    useEffect(() => {
        const loadGoogleMaps = () => {
            if (window.google && window.google.maps) {
                initMap();
                return;
            }

            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDAiR37j4UpcQlbKp0-GlW27up3XXyTAmI&callback=initMap`;
            script.async = true;
            script.defer = true;
            script.onload = initMap;
            document.body.appendChild(script);
        };
        loadGoogleMaps();
    }, []);

    const initMap = () => {
        const newMap = new window.google.maps.Map(document.getElementById("map"), {
            center: { lat: 28.6139, lng: 77.2090 },
            zoom: 12,
            mapTypeId: "roadmap"
        });
        setMap(newMap);
    };

    const loadAlertZones = () => {
        const lowerCity = city.trim().toLowerCase();
        if (allAlertZones[lowerCity]) {
            setSelectedZones(allAlertZones[lowerCity]);
        } else {
            alert("No red alert zones available for this city.");
        }
    };

    const clearAlertZones = () => {
        polygons.forEach(polygon => polygon.setMap(null));
        setPolygons([]);

        markers.forEach(marker => marker.setMap(null));
        setMarkers([]);
    };

    const highlightZone = (zone) => {
        if (!map) return;
        
        clearAlertZones();
        
        const newPolygon = new window.google.maps.Polygon({
            paths: zone.coords,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35
        });
        newPolygon.setMap(map);
        setPolygons(prev => [...prev, newPolygon]);
        
        const bounds = new window.google.maps.LatLngBounds();
        zone.coords.forEach(coord => bounds.extend(new window.google.maps.LatLng(coord.lat, coord.lng)));
        map.fitBounds(bounds);
        
        const marker = new window.google.maps.Marker({
            position: bounds.getCenter(),
            map: map,
            title: zone.name
        });
        setMarkers(prev => [...prev, marker]);

        const infoWindow = new window.google.maps.InfoWindow({
            content: `<b>${zone.name}</b><br>${zone.description}<br><br>
                      <a href="${zone.googleMapsLink}" target="_blank">View on Google Maps</a>`
        });

        newPolygon.addListener("click", (event) => {
            infoWindow.setPosition(event.latLng);
            infoWindow.open(map);
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    };

    const selectZone = (zone) => {
        highlightZone(zone);
    };

    return (
        <div className="alert-map-container">
            <h1>Girls' Security Alert Map</h1>
            <div className="controls">
                <label>Enter City: </label>
                <input
                    type="text"
                    placeholder="e.g., Delhi"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={loadAlertZones}>Load Alerts</button>
            </div>
            {selectedZones.length > 0 && (
                <table className="zones-table">
                    <thead>
                        <tr>
                            <th>Zone Name</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedZones.map((zone, index) => (
                            <tr key={index} onClick={() => selectZone(zone)} className="zone-row">
                                <td>{zone.name}</td>
                                <td>{zone.description}</td>
                                <td>
                                    <button>View on Map</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div id="map" className="map-container"></div>
        </div>
    );
};

export default Highlight;