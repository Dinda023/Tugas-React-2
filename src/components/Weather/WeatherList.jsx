import { useContext } from "react";
import Weather from "./Weather";
import { WeatherContext } from "../../context/WeatherContext";

export default function WeatherList({ setIsEdit }) {
    const { weathers, dispatch } = useContext(WeatherContext);

    const handleDelete = (id) => {
        dispatch({ type: "DELETE_WEATHER", payload: { id } });
    };

    const handleEdit = (weather) => {
        if (!weather || typeof weather.city !== "string") return;
        setIsEdit(weather);
    };

    if (!weathers || weathers.length === 0) {
        return <h2 className="text-center">No weather data available</h2>;
    }

    return (
        <ul style={{ listStyle: "none", padding: 0 }}>
            {weathers.map((weather) => (
                <Weather
                    key={weather.id}
                    weather={weather}
                    deleteWeather={handleDelete}
                    editWeather={handleEdit}
                />
            ))}
        </ul>
    );
}
