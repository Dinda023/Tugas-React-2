import { useState } from "react";
import { WeatherProvider } from "../../context/WeatherContext";
import WeatherForm from "./WeatherForm";
import WeatherList from "./WeatherList";

export default function WeatherApp() {
    const [isEdit, setIsEdit] = useState(null);

    return (
        <WeatherProvider>
            <div className="container" style={{ marginTop: "30px" }}>
                <h1 className="text-center">Weather App</h1>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <WeatherForm isEdit={isEdit} setIsEdit={setIsEdit} />
                        <WeatherList setIsEdit={setIsEdit} />
                    </div>
                </div>
            </div>
        </WeatherProvider>
    );
}
