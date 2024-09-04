Si raccourcie vers lien Notion ne fonctionne pas:

https://marshy-baker-849.notion.site/Projet-Wacdo-99b5b2b38d854e42a982bc22bcced108


# Structure et Fonctionnement Global de l'Application

### 1. **Contextes**

- **`DatasContext`** : Ce contexte gère les données principales de l'application, telles que les villes trouvées par la recherche, les restaurants associés à ces villes, et les éléments sélectionnés par l'utilisateur (ville ou restaurant).
    - **Fonctions Principales** :
        - `handleSearchCitiesByKeyword(keyword)`: Rechercher des villes en fonction d'un mot-clé entré par l'utilisateur.
        - `handleSearchRestaurantsByCity(city)`: Rechercher des restaurants dans la ville sélectionnée.
        - `getUserCity(location)`: Obtenir la ville de l'utilisateur à partir de sa localisation actuelle et rechercher des restaurants dans cette ville.
    - **États Gérés** :
        - `cities`: Liste des villes trouvées.
        - `restaurants`: Liste des restaurants trouvés dans une ville sélectionnée.
        - `selectedCity`: La ville actuellement sélectionnée.
        - `selectedRestaurant`: Le restaurant actuellement sélectionné.
- **`UserLocationContext`** : Ce contexte gère la localisation de l'utilisateur et fournit des fonctions pour obtenir et utiliser cette localisation dans l'application.

### 2. **Composants**

- **`SearchBar.jsx`** :
    - Affiche une barre de recherche où l'utilisateur peut entrer le nom d'une ville pour rechercher des restaurants.
    - Gère la soumission du formulaire, valide l'entrée utilisateur, et met à jour la liste des villes trouvées en utilisant `handleSearchCitiesByKeyword`.
    - Permet à l'utilisateur de sélectionner une ville parmi les résultats de la recherche, puis déclenche la recherche des restaurants dans cette ville.
- **`Map.jsx`** :
    - Affiche une carte interactive (basée sur Leaflet) centrée sur la ville sélectionnée ou sur la position actuelle de l'utilisateur.
    - Affiche des marqueurs pour les restaurants trouvés dans la ville sélectionnée.
    - Permet à l'utilisateur de voir les détails d'un restaurant et de sélectionner celui qu'il souhaite.
    - Utilise le composant `Location` pour centrer la carte sur la ville ou le restaurant sélectionné.
- **`Overlay.jsx`** :
    - Affiche une superposition d'informations concernant le restaurant sélectionné.
    - Si aucun restaurant n'est sélectionné, il propose un bouton permettant de rechercher des restaurants à proximité de la position de l'utilisateur.
- **`Button.jsx`** :
    - Composant bouton réutilisable, stylisé via `Button.css`, utilisé dans plusieurs parties de l'application pour déclencher des actions (par exemple, sélectionner un restaurant, continuer le processus).

### 3. **Fonctionnement Global**

- **Recherche et Sélection** :
    - L'utilisateur commence par rechercher une ville en entrant un mot-clé dans la `SearchBar`. Le système valide l'entrée, nettoie les caractères non autorisés, et affiche les résultats.
    - Une fois la ville sélectionnée, le système recherche les restaurants disponibles dans cette ville et les affiche sur la `Map`.
- **Interaction avec la Carte** :
    - La carte est centrée sur la ville sélectionnée, et les restaurants y sont affichés sous forme de marqueurs. L'utilisateur peut cliquer sur un marqueur pour voir les détails du restaurant.
    - L'utilisateur peut sélectionner un restaurant, ce qui met à jour l'état de l'application et affiche les informations pertinentes dans l'`Overlay`.
- **Localisation Utilisateur** :
    - Si l'utilisateur ne sélectionne pas de ville, il peut cliquer sur un bouton pour trouver des restaurants à proximité de sa localisation actuelle, gérée via le `UserLocationContext`.
- **Superposition d'Informations** :
    - L'`Overlay` montre les détails du restaurant sélectionné et propose des actions supplémentaires (par exemple, continuer avec ce restaurant).

### Workflow de l'Utilisateur

1. L'utilisateur ouvre l'application et voit la `SearchBar` pour commencer une recherche de restaurant.
2. Il entre un mot-clé pour rechercher une ville. La recherche est traitée et les résultats s'affichent.
3. L'utilisateur sélectionne une ville dans la liste des résultats.
4. Les restaurants de cette ville sont affichés sur la carte. L'utilisateur peut interagir avec les marqueurs pour voir les détails des restaurants.
5. L'utilisateur sélectionne un restaurant, et les détails sont affichés dans l'`Overlay`.
6. S'il le souhaite, l'utilisateur peut aussi rechercher des restaurants proches de sa position actuelle.