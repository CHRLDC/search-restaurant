/**
 * @file Map.jsx
 * @description Composant carte Leaflet pour afficher les restaurants et gérer les événements de sélection
 */
import React, { useContext, useEffect, useState } from 'react';
import Button from '../Button/Button';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { DatasContext } from '../../contextes/DatasContexte.jsx';
import './Map.css';

// Définir l'icône (marqueur de position) par défaut
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
})

// Appliquer l'icône par défaut à tous les marqueurs
L.Marker.prototype.options.icon = DefaultIcon

// Composant pour gérer la position de la carte en fonction de la ville sélectionnée ou du restaurant sélectionné
function Location({ center, selectedRestaurant }) {
    const map = useMap()

    // Effet pour centrer la carte sur la ville sélectionnée
    useEffect(() => {
        if (center) {
            map.flyTo(center, 13)
        }
    }, [center, map])

    // Effet pour centrer la carte et zoomer sur le restaurant sélectionné
    useEffect(() => {
        if (selectedRestaurant) {
            const position = [selectedRestaurant.position.latitude, selectedRestaurant.position.longitude]
            map.flyTo(position, 18)
        }
    }, [selectedRestaurant, map])

    return null
}

export default function Map({ onPopupEvent }) {
    // Accès aux restaurants, à la ville sélectionnée et à la fonction pour mettre à jour le restaurant sélectionné depuis le contexte
    const { restaurants, selectedCity, updateSelectedRestaurant } = useContext(DatasContext)
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)

    // Gestion des événements d'ouverture et de fermeture des popups
    const handlePopupEvent = (isOpen, restaurant) => {
        onPopupEvent(isOpen) // Appelle la fonction passée en prop pour notifier l'état de la popup
        setSelectedRestaurant(isOpen ? restaurant : null) // Met à jour le restaurant sélectionné si la popup est ouverte
    }

    return (
        <MapContainer
            style={{ height: "100%", width: "100%" }} // Taille de la carte en pourcentage pour remplir le conteneur parent
            center={selectedCity ? [selectedCity.position.latitude, selectedCity.position.longitude] : [45.444, 4.390]} // Centre initial de la carte sur la ville sélectionnée ou une position par défaut
            zoom={12} // Niveau de zoom initial
        >
            {/* Composant pour centrer la carte selon la ville ou le restaurant sélectionné */}
            <Location center={selectedCity ? [selectedCity.position.latitude, selectedCity.position.longitude] : [45.444, 4.390]} selectedRestaurant={selectedRestaurant} />
            {/* Fond de carte OpenStreetMap */}
            <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Affichage des marqueurs pour chaque restaurant trouvé */}
            {restaurants.length > 0 && restaurants.map((restaurant) => (
                <Marker
                    key={restaurant.place_id} // Clé unique pour chaque restaurant
                    position={[restaurant.position.latitude, restaurant.position.longitude]} // Position du marqueur
                    eventHandlers={{
                        popupopen: () => handlePopupEvent(true, restaurant), // Gestionnaire d'événement pour l'ouverture de la popup
                        popupclose: () => handlePopupEvent(false, null), // Gestionnaire d'événement pour la fermeture de la popup
                    }}
                >
                    <Popup>
                        <div className="column">
                            <p>{restaurant.name}</p>
                            <Button
                                className="button"
                                onClick={() => updateSelectedRestaurant(restaurant)} // Met à jour le restaurant sélectionné
                            >Sélectionner</Button>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}
