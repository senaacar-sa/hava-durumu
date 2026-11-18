function getWeatherInfo(code) {
  if (code === 0) return { label: "Açık", icon: "☀️" };
  if (code === 3) return { label: "Kapalı", icon: "☁️" };
  if ([1, 2].includes(code)) return { label: "Parçalı bulutlu", icon: "⛅" };
  if ([45, 48].includes(code)) return { label: "Sisli", icon: "🌫️" };
  if ([51, 53, 55, 56, 57].includes(code))
    return { label: "Çiseleme", icon: "🌦️" };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code))
    return { label: "Yağmurlu", icon: "🌧️" };
  if ([71, 73, 75, 77, 85, 86].includes(code))
    return { label: "Karlı", icon: "❄️" };
  if ([95, 96, 99].includes(code)) return { label: "Fırtınalı", icon: "⛈️" };

  return { label: "Bilinmiyor", icon: "❓" };
}
function WeatherCard({weather}){

     const info =  getWeatherInfo(weather.code) ;
     return(

<div className="weather-card">
  <p className="location">     📍 Şehir, Ülke: {weather.name} / {weather.country}</p>
  <p className="condition">Hava durumu: {info.label}   <span className="weather-icon"> {info.icon}</span>   </p>

  <p className="temperature"> 🌡️ Sıcaklık (°C): {Math.round(weather.temperature) }°C</p>
  
  <div className="details">
    <span>💧 Nem (%): {weather.humidity}</span>
    <span> 💨 Rüzgar (km/s): {weather.wind}</span>
    </div>
    </div>
        
     );

}
export default WeatherCard;