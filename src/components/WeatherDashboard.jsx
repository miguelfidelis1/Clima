// REMOVIDO O 'Radar' DA IMPORTAÇÃO ABAIXO
import { Wind, Drop, MapPin, Sun, Moon, Lightning } from 'phosphor-react'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis } from 'recharts'
import { WeatherMap } from './WeatherMap'

export function WeatherDashboard({ weather, forecast }) {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  }
  const item = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    show: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
  }

  const chartData = forecast.map(i => ({name: new Date(i.dt*1000).toLocaleDateString('pt-BR',{weekday:'short'}), temp: Math.round(i.main.temp)}));

  return (
    <motion.div 
      variants={container} initial="hidden" animate="show"
      className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-8 relative z-10"
    >
      {/* 1. CARD PRINCIPAL */}
      <Tilt className="md:col-span-2 row-span-2 h-full min-h-[400px]" perspective={1500} scale={1.02} glareEnable={true} glareColor="#22d3ee" glareMaxOpacity={0.2}>
          <motion.div variants={item} className="h-full bg-gradient-to-br from-blue-900/40 to-blue-950/60 border border-cyan-500/20 backdrop-blur-xl rounded-[3rem] p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
             <div className="absolute -right-32 -top-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
             
             <div className="flex justify-between items-start z-10">
                <div>
                   <div className="flex items-center gap-2 text-cyan-300 mb-3 bg-blue-950/50 w-fit px-4 py-1.5 rounded-full border border-cyan-500/20 shadow-inner">
                      <MapPin weight="fill" />
                      <h2 className="font-bold tracking-[0.2em] uppercase text-xs">{weather.sys.country}</h2>
                   </div>
                   <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-2xl tracking-tight">{weather.name}</h1>
                </div>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} className="absolute top-0 right-0 w-64 h-64 opacity-10 mix-blend-overlay pointer-events-none" />
             </div>
             
             <div className="relative z-10 mt-6 flex items-end gap-6">
                  <h2 className="text-[7rem] md:text-[9rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-blue-400 drop-shadow-2xl">
                      {Math.round(weather.main.temp)}°
                  </h2>
                  <div className="pb-8">
                      <p className="text-2xl font-bold capitalize text-cyan-100 mb-1">{weather.weather[0].description}</p>
                      <p className="text-cyan-400/80 font-medium">Sensação {Math.round(weather.main.feels_like)}°</p>
                  </div>
             </div>
          </motion.div>
      </Tilt>

      {/* 2. MAPA INTERATIVO */}
      <motion.div variants={item} className="md:col-span-2 row-span-2 min-h-[400px] bg-blue-950/50 border border-cyan-500/20 backdrop-blur-xl rounded-[3rem] p-2 shadow-xl relative overflow-hidden">
         {/* Garante que lat/lon existem antes de renderizar o mapa */}
         {weather.coord && (
            <WeatherMap lat={weather.coord.lat} lon={weather.coord.lon} city={weather.name} />
         )}
      </motion.div>

      {/* 3. GRÁFICO */}
      <motion.div variants={item} className="md:col-span-2 bg-blue-950/50 border border-cyan-500/20 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-xl relative overflow-hidden h-[280px]">
         <h3 className="font-bold text-lg mb-6 flex gap-2 text-white items-center uppercase tracking-wider">
            <Lightning className="text-cyan-400" weight="fill" size={20}/> 
            Projeção
         </h3>
         <div className="h-[80%] w-full">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
               <defs>
                 <linearGradient id="colorTempBlue" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.7}/>
                   <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                 </linearGradient>
               </defs>
               <XAxis dataKey="name" tick={{fill: '#67e8f9', fontSize: 12}} axisLine={false} tickLine={false} dy={10}/>
               <Tooltip contentStyle={{backgroundColor:'#020617e6', borderRadius:'12px', border:'1px solid #1e293b'}} itemStyle={{color:'#22d3ee', fontWeight:'bold'}} cursor={{stroke: '#22d3ee', strokeWidth: 2}} />
               <Area type="monotone" dataKey="temp" stroke="#22d3ee" strokeWidth={4} fill="url(#colorTempBlue)" />
             </AreaChart>
           </ResponsiveContainer>
         </div>
      </motion.div>

      {/* 4. DETALHES MENORES */}
      <Tilt className="h-full" scale={1.05}>
        <motion.div variants={item} className="h-full bg-blue-900/30 border border-cyan-500/20 backdrop-blur-xl rounded-[2rem] p-6 flex flex-col items-center justify-center gap-3 shadow-lg group">
          <div className="p-3 bg-cyan-500/10 rounded-full group-hover:bg-cyan-500/20 transition-colors">
             <Wind size={32} className="text-cyan-400" weight="duotone" />
          </div>
          <span className="text-cyan-200/60 uppercase font-bold text-[10px] tracking-[0.2em]">Vento</span>
          <span className="text-2xl font-black text-white">{weather.wind.speed} km/h</span>
        </motion.div>
      </Tilt>

      <Tilt className="h-full" scale={1.05}>
        <motion.div variants={item} className="h-full bg-blue-900/30 border border-cyan-500/20 backdrop-blur-xl rounded-[2rem] p-6 flex flex-col items-center justify-center gap-3 shadow-lg group">
          <div className="p-3 bg-cyan-500/10 rounded-full group-hover:bg-cyan-500/20 transition-colors">
             <Drop size={32} className="text-cyan-400" weight="duotone" />
          </div>
          <span className="text-cyan-200/60 uppercase font-bold text-[10px] tracking-[0.2em]">Umidade</span>
          <span className="text-2xl font-black text-white">{weather.main.humidity}%</span>
        </motion.div>
      </Tilt>
    </motion.div>
  )
}