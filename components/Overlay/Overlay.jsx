/**
 * @file Overlay.jsx
 * @description Composant d'overlay affichant les informations du restaurant sélectionné ou restaurants à proximités
 */
import React, { useContext } from 'react';
import Button from '../Button/Button';
import './Overlay.css';
import { DatasContext } from '../../contextes/DatasContexte.jsx';
import { UserLocationContext } from '../../contextes/UserLocationContexte';

export default function Overlay() {
    // Accès au restaurant sélectionné depuis DatasContexte.jsx
    const { selectedRestaurant } = useContext(DatasContext);
    // Accès à la fonction pour obtenir la localisation de l'utilisateur depuis UserLocationContexte.jsx
    const { getUserLocation } = useContext(UserLocationContext);

    return (
        <div className="overlay column gap8">
            {selectedRestaurant ? (
                <>
                    <h2>Restaurant sélectionné</h2>
                    <p>{selectedRestaurant.name}</p>
                    <div>
                        <Button>Continuer</Button>
                    </div>
                </>
            ) : (
                <>
                    <h2>Aucun restaurant sélectionné</h2>
                    <Button onClick={getUserLocation}>Restaurants à proximité</Button>
                </>
            )}
        </div>
    );
}
