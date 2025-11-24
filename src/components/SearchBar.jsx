import { MagnifyingGlass } from 'phosphor-react'

export function SearchBar({ city, setCity, handleSearch, dateTime }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 z-50 relative">
      {/* Input Glassmorphism Profundo */}
      <div className="group flex items-center bg-blue-950/50 border border-cyan-500/20 rounded-full px-6 py-4 backdrop-blur-xl shadow-[0_0_20px_rgba(8,145,178,0.15)] w-full md:w-[500px] transition-all hover:bg-blue-900/60 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] focus-within:ring-2 focus-within:ring-cyan-400/50">
        <MagnifyingGlass size={24} className="text-cyan-500 group-focus-within:text-cyan-300 transition-colors" weight="bold" />
        <input 
          type="text" 
          value={city}
          placeholder="Localizar cidade..." 
          className="bg-transparent border-none outline-none text-white placeholder-cyan-200/40 w-full text-lg ml-4 font-medium tracking-wide"
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
      
      {/* Relógio Digital Cyberpunk */}
      <div className="flex flex-col items-end hidden md:flex drop-shadow-lg">
         <span className="text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-blue-300">
            {dateTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
         </span>
         <span className="text-cyan-400 text-sm font-bold uppercase tracking-[0.25em]">
            {dateTime.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
         </span>
      </div>
    </div>
  )
}