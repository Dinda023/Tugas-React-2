import { useEffect, useState } from "react";

const getColors = (condition) => {
    switch (condition.toLowerCase()) {
        case "sunny":
            return { bg: "#ffe082", text: "#000" };
        case "rainy":
            return { bg: "#90caf9", text: "#000" };
        case "cloudy":
            return { bg: "#cfd8dc", text: "#000" };
        case "stormy":
            return { bg: "#78909c", text: "#fff" };
        default:
            return { bg: "#e0e0e0", text: "#000" };
    }
};

function TemperatureAlert({ temperature }) {
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (temperature > 30) {
            setAlert({ message: "Suhu Sangat Panas!", color: "red" });
        } else if (temperature < 20) {
            setAlert({ message: "Suhu Sangat Dingin!", color: "blue" });
        } else {
            setAlert({ message: "Suhu Normal.", color: "green" });
        }
    }, [temperature]);

    if (!alert) return null;

    return (
        <p style={{ color: alert.color, margin: 0 }}>{alert.message}</p>
    );
}

export default function Weather({ weather, deleteWeather, editWeather }) {
    const { bg, text } = getColors(weather.condition);

    return (
        <li
            key={weather.id}
            style={{
                backgroundColor: bg,
                color: text,
                padding: "15px",
                marginBottom: "12px",
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <div>
                <h3 style={{ margin: "0 0 5px" }}>{weather.city}</h3>
                <p style={{ margin: 0 }}>
                    {weather.temperature}°C - {weather.condition}
                </p>
                <TemperatureAlert temperature={weather.temperature} />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => editWeather(weather)}>Edit</button>
                <button onClick={() => deleteWeather(weather.id)}>Delete</button>
            </div>
        </li>
    );
}
