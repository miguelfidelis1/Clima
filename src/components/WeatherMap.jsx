import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin } from 'phosphor-react'
import L from 'leaflet'

// Correção para o ícone padrão do Leaflet que buga no React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Componente auxiliar para mover a câmera quando a cidade muda
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 10); // 10 é o zoom
  return null;
}

export function WeatherMap({ lat, lon, city }) {
  const position = [lat, lon]

  return (
    <div className="h-full w-full relative rounded-[2rem] overflow-hidden border border-cyan-500/20 shadow-inner group">
      
      {/* Overlay "Hacker" para deixar o mapa azulado/escuro */}
      <div className="absolute inset-0 pointer-events-none z-[400] bg-blue-900/20 mix-blend-overlay"></div>
      
      {/* Título Flutuante */}
      <div className="absolute top-4 left-4 z-[400] bg-blue-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-cyan-500/30 flex items-center gap-2">
         <MapPin className="text-cyan-400" size={16} weight="fill"/>
         <span className="text-xs font-bold text-cyan-100 tracking-widest uppercase">Satélite: {city}</span>
      </div>

      <MapContainer 
        center={position} 
        zoom={10} 
        scrollWheelZoom={false} 
        className="h-full w-full z-0"
        style={{ background: '#0f172a' }} // Fundo azul escuro enquanto carrega
      >
        <ChangeView center={position} />
        
        {/* Truque CSS: filter invert grayscale deixa o mapa Dark Mode */}
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles filter grayscale invert contrast-125 hue-rotate-180 brightness-75"
        />
        
        <Marker position={position}>
          <Popup className="custom-popup">
            <span className="font-bold text-slate-900">{city}</span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}