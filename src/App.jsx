import { useState, useEffect } from 'react'
import { getWeather, getForecast } from './services/api'
import { SearchBar } from './components/SearchBar'
import { WelcomeScreen } from './components/WelcomeScreen'
import { WeatherDashboard } from './components/WeatherDashboard'
import { CircleNotch } from 'phosphor-react'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [dateTime, setDateTime] = useState(new Date())
  const [error, setError] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Seleção de vídeo cinemático
  const getBgVideo = () => {
    if (!weather) return 'https://cdn.pixabay.com/video/2016/09/21/5320-183786499_large.mp4' // Espaço
    const main = weather.weather[0].main.toLowerCase()
    if (main.includes('clear')) return 'https://cdn.pixabay.com/video/2021/03/13/67888-523684463_large.mp4' // Sol Oceano
    if (main.includes('cloud')) return 'https://cdn.pixabay.com/video/2019/04/13/22792-330685934_large.mp4' // Nuvens
    if (main.includes('rain') || main.includes('drizzle')) return 'https://cdn.pixabay.com/video/2021/08/04/83868-583525492_large.mp4' // Chuva Vidro
    if (main.includes('snow')) return 'https://cdn.pixabay.com/video/2016/01/06/1865-151042571_large.mp4' // Neve
    if (main.includes('thunder')) return 'https://cdn.pixabay.com/video/2020/06/18/42369-432240905_large.mp4' // Raios
    return 'https://cdn.pixabay.com/video/2020/05/25/40149-424177693_large.mp4' // Default
  }

  const handleSearch = async (e) => {
    if ((e.key === 'Enter' || e.type === 'click') && city.trim()) {
      setLoading(true)
      setError(null)
      try {
        const weatherData = await getWeather(city)
        const forecastData = await getForecast(city)
        if (weatherData && forecastData) {
           // Filtra para pegar 1 previsão por dia (aprox. meio-dia)
          const dailyForecast = forecastData.list.filter((reading) => 
            reading.dt_txt.includes("12:00:00")
          ).slice(0, 5)
          setForecast(dailyForecast)
          setWeather(weatherData)
        }
      } catch (err) {
        setError('Cidade não localizada. Verifique a grafia.')
        setWeather(null)
      }
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen font-sans overflow-hidden text-white selection:bg-cyan-500/30 selection:text-cyan-100 bg-slate-950">
      
      {/* CAMADA DE VÍDEO E COR (DEEP OCEAN) */}
      <div className="fixed inset-0 z-0">
        <video
          key={weather ? weather.weather[0].main : 'default'}
          autoPlay loop muted playsInline
          className="w-full h-full object-cover transition-opacity duration-1000 scale-[1.03] blur-[3px]"
        >
          <source src={getBgVideo()} type="video/mp4" />
        </video>
        {/* A mágica do azul profundo acontece aqui */}
        <div className="absolute inset-0 bg-blue-950/80 mix-blend-multiply perspective-distant"></div> 
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-blue-950/50 to-transparent"></div>
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 py-8 flex flex-col min-h-screen">
        
        <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} dateTime={dateTime} />

        {/* Estado de Erro */}
        {error && !loading && (
            <div className="flex-1 flex items-center justify-center">
                <div className="bg-red-950/50 border border-red-500/30 p-6 rounded-2xl backdrop-blur-md text-red-200 font-medium animate-pulse">
                    ⚠️ {error}
                </div>
            </div>
        )}

        {/* Estado de Carregamento Sci-Fi */}
        {loading && (
           <div className="flex-1 flex flex-col items-center justify-center z-50">
             <div className="relative flex items-center justify-center">
                <CircleNotch size={80} className="text-cyan-500/30 animate-spin-slow absolute" weight="thin"/>
                <CircleNotch size={80} className="text-cyan-400 animate-spin" weight="bold"/>
             </div>
             <p className="mt-8 text-cyan-300 font-bold tracking-[0.3em] text-sm uppercase animate-pulse">
                Processando dados orbitais...
             </p>
           </div>
        )}

        {!weather && !loading && !error && <WelcomeScreen />}
        {!loading && weather && <WeatherDashboard weather={weather} forecast={forecast} />}

      </div>
    </div>
  )
}

export default App