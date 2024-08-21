/**
 * @file SearchBar.jsx
 * @description Composant de barre de recherche pour trouver des restaurants en fonction de mots clés
 */
import React, { useContext } from 'react';
import './SearchBar.css';
import { DatasContext } from '../../contextes/DatasContexte';

export default function SearchBar({ isPopupOpen }) {
    // Accès aux villes, aux fonctions de recherche, et à la ville sélectionnée depuis le contexte
    const { cities, handleSearchCitiesByKeyword, handleSearchRestaurantsByCity, setSelectedCity } = useContext(DatasContext);

    // Gestion de la soumission du formulaire de recherche
    const handleSubmit = (event) => {
        event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
        const query = event.target.elements.search.value.trim(); // Récupère la valeur de l'input et supprime les espaces en début et fin

        // Validation de l'entrée utilisateur
        const validQuery = validateInput(query);
        if (validQuery) {
            // Lance la recherche des villes si l'entrée est valide
            handleSearchCitiesByKeyword(validQuery);
        }
    };

    // Gestion de la sélection d'une ville dans les résultats
    const handleCitySelect = async (city) => {
        // Met à jour la ville sélectionnée dans le contexte
        setSelectedCity(city);
        // Recherche les restaurants dans la ville sélectionnée
        await handleSearchRestaurantsByCity(city);
    };

    // Fonction de validation du formulaire
    const validateInput = (input) => {
        if (input.length < 2) {
            alert("La recherche doit contenir au moins 2 caractères.");
            return null;
        } else if (input.length > 35) {
            alert("La recherche ne peut pas contenir plus de 35 caractères.");
            return null;
        }
        if (/\d/.test(input)) {
            alert("La recherche ne doit pas contenir de chiffres.");
            return null;
        }

        // Nettoie l'entrée pour enlever les caractères non autorisés
        const sanitizedInput = sanitizeInput(input);
        return sanitizedInput;
    };

    // Fonction de nettoyage de l'entrée utilisateur
    const sanitizeInput = (input) => {
        // Autorise les lettres, espaces, tirets, apostrophes, et caractères accentués
        const sanitizedInput = input.replace(/[^a-zA-Z\s-'\u00C0-\u017F]/g, '');
        if (sanitizedInput !== input) {
            alert("Certains caractères spéciaux ne sont pas autorisés.");
            return null;
        }
        return sanitizedInput;
    };

    return (
        <div className="searchBar column gap8">
            <form className="column" onSubmit={handleSubmit}>
                <label htmlFor="search">Rechercher un restaurant</label>
                <div className="w100 flex align-center gap8">
                    <input
                        type="text"
                        id="search"
                        placeholder="Où mange t-on ?"
                        aria-label="Rechercher un restaurant"
                    />
                    <button type="submit"></button> {/* Bouton de soumission de la recherche */}
                </div>
            </form>
            {/* Affichage des résultats de la recherche de villes s'il y en a et s'il n'y a pas de popup ouvertes */}
            {cities.length > 0 && !isPopupOpen && (
                <ul className="column gap8">
                    {cities.map((city) => (
                        <li key={city.city_id} onClick={() => handleCitySelect(city)}>
                            {city.name}, {city.department}, {city.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
