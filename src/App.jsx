import { useState } from 'react';
import Map from '../components/Map/Map';
import SearchBar from '../components/SearchBar/SearchBar';
import './App.css';
import Overlay from '../components/Overlay/Overlay';

export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handlePopupEvent = (isOpen) => {
    setIsPopupOpen(isOpen);
  };

  return (
    <div>
      <div className="top-bar">
        <SearchBar isPopupOpen={isPopupOpen} />
      </div>
      <div className="container-map">
        <Map onPopupEvent={handlePopupEvent} />
      </div>
      <div className="tap-bar">
        <Overlay />
      </div>
    </div>
  );
}
