/**
 * @file UserLocationContexte.jsx
 * @description Gestion de la localisation de l'utilisateur
 */
import React, { createContext, useState, useContext } from 'react';
import { DatasContext } from './DatasContexte';

// Créer le contexte pour la localisation de l'utilisateur
export const UserLocationContext = createContext();

// Fournisseur du contexte de localisation utilisateur
export const UserLocationProvider = ({ children }) => {
    // État pour stocker la localisation de l'utilisateur
    const [userLocation, setUserLocation] = useState(null)

    // Récupérer la fonction getUserCity à partir du contexte DatasContext
    const { getUserCity } = useContext(DatasContext)

    // Fonction pour obtenir la localisation de l'utilisateur
    const getUserLocation = () => {
        // Demander la position au navigateur
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Mettre à jour l'état avec la latitude et la longitude
                const location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }
                setUserLocation(location)

                // Appeler getUserCity avec la localisation obtenue (pour trouver la ville correspondante)
                getUserCity(location)
            }
        )
    }

    return (
        // Fournir les valeurs de localisation et d'erreur, ainsi que la fonction getUserLocation aux composants enfants
        <UserLocationContext.Provider value={{ userLocation, getUserLocation }}>
            {children}
        </UserLocationContext.Provider>
    )
}
