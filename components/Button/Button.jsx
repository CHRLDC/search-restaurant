/**
 * @file Button.jsx
 * @description Composant bouton réutilisable avec styles personnalisés
 */
import './Button.css';

export default function Button({ onClick, children, type = 'button' }) {
    return (
        <button className="custom-button"
            type={type}  // Type du bouton, par défaut 'button' (options: "submit" ou "reset")
            onClick={onClick}  // Fonction appelée lors du clic sur le bouton
        >
            {children}
        </button>
    );
};
