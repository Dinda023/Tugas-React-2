import { useContext, useState, useEffect } from "react";
import { WEATHER_ACTIONS, WeatherContext } from "../../context/WeatherContext";

export default function WeatherForm({ isEdit, setIsEdit }) {
    const { dispatch } = useContext(WeatherContext);

    const [city, setCity] = useState("");
    const [temperature, setTemperature] = useState("");
    const [condition, setCondition] = useState("");

    useEffect(() => {
        if (isEdit) {
            setCity(isEdit.city);
            setTemperature(isEdit.temperature);
            setCondition(isEdit.condition);
        } else {
            setCity("");
            setTemperature("");
            setCondition("");
        }
    }, [isEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!city.trim() || temperature === "" || !condition.trim()) return;

        const payload = {
            id: isEdit ? isEdit.id : Date.now(),
            city,
            temperature: Number(temperature),
            condition,
        };

        dispatch({
            type: isEdit ? WEATHER_ACTIONS.EDIT_WEATHER : WEATHER_ACTIONS.ADD_WEATHER,
            payload,
        });


        setCity("");
        setTemperature("");
        setCondition("");
        setIsEdit(null);
    };

    const handleCancel = () => {
        setCity("");
        setTemperature("");
        setCondition("");
        setIsEdit(null);
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                backgroundColor: "#f9f9f9",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                maxWidth: "1000px",
                margin: "0 auto",
                marginBottom: "30px"
            }}
        >
            <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "16px"
                }}
            />
            <input
                type="number"
                placeholder="Temperature (°C)"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                required
                style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "16px"
                }}
            />
            <input
                type="text"
                placeholder="Condition (e.g. Sunny, Rainy)"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                required
                style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "16px"
                }}
            />

            <div style={{ display: "flex", gap: "10px" }}>
                <button
                    type="submit"
                    style={{
                        flex: 1,
                        padding: "10px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "16px"
                    }}
                >
                    {isEdit ? "Update" : "Add"}
                </button>
                {isEdit && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        style={{
                            flex: 1,
                            padding: "10px",
                            backgroundColor: "#aaa",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "16px"
                        }}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
