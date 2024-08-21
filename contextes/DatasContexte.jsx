/**
 * @file DatasContexte.jsx
 * @description Gestion et transmission des datas 
 */
import React, { createContext, useState } from 'react';
import { searchCitiesByKeyword, searchRestaurantsByCity } from '../datas/datas.jsx';
import { searchCityByLocation } from '../datas/datas';

// Créer le contexte pour les données
export const DatasContext = createContext();

export const DatasProvider = ({ children }) => {
    // État pour stocker les villes trouvées par la recherche
    const [cities, setCities] = useState([])

    // État pour stocker les restaurants trouvés dans une ville
    const [restaurants, setRestaurants] = useState([])

    // État pour stocker la ville sélectionnée
    const [selectedCity, setSelectedCity] = useState(null)

    // État pour stocker le restaurant sélectionné
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)

    // Fonction pour rechercher des villes par mot-clé et mettre à jour l'état
    const handleSearchCitiesByKeyword = async (keyword) => {
        const results = await searchCitiesByKeyword(keyword)
        setCities(results)
    }

    // Fonction pour rechercher des restaurants dans une ville spécifique et mettre à jour l'état
    const handleSearchRestaurantsByCity = async (city) => {
        const results = await searchRestaurantsByCity(city)
        setRestaurants(results)
    }

    // Fonction pour mettre à jour le restaurant sélectionné
    const updateSelectedRestaurant = (restaurant) => {
        setSelectedRestaurant(restaurant)
    }

    // Fonction pour obtenir la ville de l'utilisateur à partir de sa localisation
    // et rechercher des restaurants dans cette ville
    const getUserCity = async (location) => {
        const city = await searchCityByLocation(location)
        if (city) {
            setSelectedCity(city)
            // Recherche des restaurants dans la ville trouvée
            const restaurantsFound = await searchRestaurantsByCity(city)
            // Fonction pour mettre à jour les restaurants trouvés
            setRestaurants(restaurantsFound)
        }
    }

    // Fournir les valeurs et fonctions aux composants enfants via le contexte
    return (
        <DatasContext.Provider
            value={{
                cities, // Liste des villes trouvées
                getUserCity, // Obtenir la ville à partir de la localisation de l'utilisateur
                restaurants, // Liste des restaurants trouvés
                selectedCity, // Ville actuellement sélectionnée
                setSelectedCity, // Fonction pour mettre à jour la ville sélectionnée
                selectedRestaurant, // Restaurant actuellement sélectionné
                handleSearchCitiesByKeyword, // Rechercher des villes par mot-clé
                setSelectedRestaurant, // Mettre à jour le restaurant sélectionné
                updateSelectedRestaurant, // Mettre à jour manuellement le restaurant sélectionné
                handleSearchRestaurantsByCity, // Rechercher des restaurants dans une ville
            }}
        >
            {children}
        </DatasContext.Provider>
    )
}
