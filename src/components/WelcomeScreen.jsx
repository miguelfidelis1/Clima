import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Globe, CloudRain, Sun, Snowflake, Lightning, MapPin } from 'phosphor-react'

const FloatingTag = ({ city, temp, icon: Icon, delay, x, y }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 0.8, 0.8, 0], 
      scale: [0.5, 1, 1, 0.5],
      y: [y, y - 30],
      x: [x, x + 15]
    }}
    transition={{ duration: 6, repeat: Infinity, delay: delay, repeatDelay: Math.random() * 2 }}
    className="absolute hidden lg:flex items-center gap-2 bg-blue-950/60 border border-cyan-500/30 backdrop-blur-md px-3 py-2 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.15)]"
    style={{ top: y, left: x }}
  >
    <Icon className="text-cyan-400" size={14} weight="fill" />
    <span className="text-cyan-100 text-[10px] font-bold uppercase tracking-wider">{city}</span>
    <span className="text-white text-xs font-bold">{temp}</span>
  </motion.div>
)

export function WelcomeScreen() {
  const hour = new Date().getHours()
  let greeting = 'Bom dia'
  if (hour >= 12) greeting = 'Boa tarde'
  if (hour >= 18) greeting = 'Boa noite'

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full overflow-hidden">
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <div className="w-[600px] h-[600px] border border-cyan-500/5 rounded-full border-dashed animate-spin-slow" />
         <div className="absolute w-[800px] h-[800px] border border-blue-500/5 rounded-full opacity-40 animate-reverse-spin" />
         <div className="absolute w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] animate-pulse-soft" />
      </div>

      <div className="absolute inset-0 w-full max-w-6xl mx-auto pointer-events-none">
          <FloatingTag city="Tokyo HQ" temp="18°C" icon={CloudRain} delay={0} x="15%" y="25%" />
          <FloatingTag city="NY Station" temp="-2°C" icon={Snowflake} delay={2.5} x="75%" y="35%" />
          <FloatingTag city="London Link" temp="12°C" icon={Lightning} delay={4} x="25%" y="75%" />
          <FloatingTag city="Dubai Sat" temp="38°C" icon={Sun} delay={1.5} x="70%" y="65%" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-blue-950/30 p-12 md:p-16 rounded-[4rem] backdrop-blur-xl border border-cyan-500/20 shadow-[0_0_60px_rgba(8,145,178,0.2)] text-center max-w-3xl"
      >
        <div className="flex justify-center mb-8 relative">
            <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full animate-pulse"></div>
            <div className="relative p-4 bg-gradient-to-br from-blue-900 to-blue-950 rounded-full ring-2 ring-cyan-400/30 shadow-lg">
                <Globe size={56} className="text-cyan-300 animate-spin-slow" weight="thin" />
            </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-200 to-blue-500 drop-shadow-sm leading-tight">
           {greeting}.
        </h1>
        
        <p className="text-cyan-300/70 text-sm uppercase tracking-[0.4em] mb-10 font-bold">
            Centro de Comando Climático Global
        </p>

        <div className="h-20 flex items-center justify-center bg-blue-950/50 rounded-2xl border border-cyan-500/10 px-8">
          <TypeAnimation
            sequence={[
              'Inicializando sistemas...', 1000,
              'Aguardando vetor de busca...', 1000,
              'Digite a cidade acima.', 2000,
              'Conexão satélites...', 1000,
            ]}
            wrapper="span"
            speed={70}
            repeat={Infinity}
            cursor={true}
            className="font-mono text-lg md:text-xl text-cyan-300 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]"
          />
        </div>

        <motion.div 
            animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center"
        >
            <MapPin className="text-cyan-400 mb-2" size={24} weight="fill" />
            <div className="w-px h-10 bg-gradient-to-t from-cyan-400/50 to-transparent"></div>
        </motion.div>
      </motion.div>
    </div>
  )
}