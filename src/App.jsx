import './App.css'
import WeatherApp from './components/Weather/WeatherApp'

function App() {
  const brandName = `CityWeather`;

  return (
    <div className="container">
      <h1>Welcome to {brandName}!</h1>
      <Paragraph />
    </div>
  );
}

export default App;

const Paragraph = () => {
  return (
    <>
      <p>Input weather conditions in different cities</p>
      <WeatherApp />
    </>
  );
};
