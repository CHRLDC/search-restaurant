/**
 * @file datas.jsx
 * @description Fournit des fonctions pour interagir avec l'API Nominatim d'OpenStreetMap pour rechercher des villes et des restaurants.
 */

// URL de l'API Nominatim
const urlNominatim = 'https://nominatim.openstreetmap.org';

/**
 * Rechercher des villes par mot-clé.
 * 
 * @param {string} keyword - Les mots clés
 * @returns {Promise<Array>} - Un tableau d'objets villes
 */
export async function searchCitiesByKeyword(keyword) {
    try {
        // Exécution de la requête API avec le mot-clé
        const response = await fetch(`${urlNominatim}/search?q=${encodeURIComponent(keyword)}&format=json&addressdetails=1&limit=2`);
        if (!response.ok) {
            // Gestion des erreurs HTTP
            throw new Error(`Erreur: ${response.statusText}`);
        }

        // Conversion de la réponse en JSON
        const data = await response.json();

        // Filtrage des résultats pour exclure certains types d'adresses comme 'suburb' et 'municipality'
        const cities = data.filter(item =>
            item.addresstype !== 'suburb' &&
            item.addresstype !== 'municipality'
        );

        // Si aucune ville n'est trouvée, alerte l'utilisateur
        if (cities.length === 0) {
            alert(`${keyword} n'a pas été trouvée...`);
            return [];
        }

        // Retourne un tableau d'objets avec des informations structurées sur chaque ville
        return cities.map(item => ({
            name: item.name,  // Nom
            display_name: item.display_name,  // Nom complet affiché (incluant région, pays, etc...)
            country: item.address.country,  // Pays
            department: item.address.state, // Région
            code_post: item.address.postcode,  // Code postal
            position: {
                latitude: item.lat,  // Latitude
                longitude: item.lon  // Longitude
            },
            city_id: item.place_id  // Identifiant unique dans l'API
        }));
    } catch (error) {
        // En cas d'erreur, log l'erreur et retourne un tableau vide
        console.error(error);
        return [];
    }
}

/**
 * Rechercher une ville par coordonnées géographiques
 * 
 * @param {Object} location - Objet latitude et longitude
 * @returns {Promise<Object|null>} - Objet ville trouvé, ou null
 */
export async function searchCityByLocation(location) {
    try {
        // Exécution de la requête API (reverse))
        const response = await fetch(`${urlNominatim}/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}`);
        if (!response.ok) {
            // Gestion des erreurs HTTP
            throw new Error(`Erreur: ${response.statusText}`);
        }

        // Conversion de la réponse en JSON
        const data = await response.json();
        if (data) {
            // Reconstruction d'une chaîne `display_name`
            const display_name = [
                data.address.amenity,  // Nom
                data.address.county,  // Département
                data.address.state,  // Région
                data.address.region,  // Pays
                data.address.postcode  // Code postal
            ]
                .filter(Boolean)  // Supprime les valeurs `null`, `undefined`, ou vides
                .join(', ');

            // Retourne un objet structuré avec les informations sur la ville
            return {
                display_name: display_name,
                country: data.address.country,
                department: data.address.state,
                code_post: data.address.postcode,
                position: {
                    latitude: data.lat,
                    longitude: data.lon
                },
                city_id: data.place_id
            };
        } else {
            // Si aucune donnée n'est trouvée, lance une erreur
            throw new Error("Aucune ville trouvée à cette position.");
        }
    } catch (error) {
        // En cas d'erreur, log l'erreur et retourne `null`
        console.error("Erreur lors de la recherche de la ville par localisation:", error);
        return null;
    }
}

/**
 * Rechercher des restaurants McDonald's dans une ville
 * 
 * @param {Object} city - Objet ville (recomposé)
 * @returns {Promise<Array|string>} - Un tableau d'objets de restaurant ou un message d'info
 */
export async function searchRestaurantsByCity(city) {
    try {
        // Construction de la requête de recherche avec le nom de la ville
        const city_name = city.name;
        const query = `McDonald's, ${city.display_name}`;

        // Exécution de la requête API pour rechercher des restaurants McDonald's dans la ville
        const response = await fetch(`${urlNominatim}/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`);
        if (!response.ok) {
            // Gestion des erreurs HTTP
            throw new Error(`Erreur: ${response.statusText}`);
        }

        // Conversion de la réponse en JSON
        const data = await response.json();

        // Filtrage des résultats pour eviter les doublons (ville administratives)
        const restaurants = data.filter(item =>
            item.address.village === city_name ||
            item.address.city === city_name ||
            item.address.town === city_name
        );

        // Si aucun restaurant n'est trouvé, retourne un message
        if (restaurants.length === 0) {
            return `Aucun restaurant n'a été trouvé à ${city.name}`;
        }

        // Retourne un tableau d'objets avec des informations structurées sur chaque restaurant
        return restaurants.map((item) => ({
            name: item.display_name,  // Nom complet du restaurant
            address: item.address.road || item.address.suburb || item.address.village || item.address.city,  // Adresse du restaurant
            position: {
                latitude: item.lat,  // Latitude du restaurant
                longitude: item.lon  // Longitude du restaurant
            },
            place_id: item.place_id  // Identifiant unique du restaurant dans l'API
        }));
    } catch (error) {
        // En cas d'erreur, log l'erreur et retourne un tableau vide
        console.error(error);
        return [];
    }
}
