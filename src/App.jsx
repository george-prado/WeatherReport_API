import { useEffect, useState } from "react";
import "./styles.css";
import styles from "./answer.module.css";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    async function HttpRequest() {
      const result = await fetch(
        `https://goweather.herokuapp.com/weather/${city}`
      );
      const res = await result.json();
      return res;
    }

    HttpRequest().then((res) => setWeather(res));
  }, [city]);

  return (
    <div className="containerInput">
      <input
        type="text"
        id="textEntry"
        placeholder="Qual cidade deseja consultar?"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
        className="cityInput"
      />
      <div className="weatherAnswer">
        <h1>Clima atual em: {city}</h1>
        {weather.temperature && (
          <p>
            A temperatura atual em {city} é de <span className={styles.answer}>{weather.temperature}</span>
          </p>
        )}
        {weather.wind && (
          <p>
            A velocidade do vento em {city} é de <span className={styles.answer}>{weather.wind}</span>
          </p>
        )}
      </div>
    </div>
  );
}
