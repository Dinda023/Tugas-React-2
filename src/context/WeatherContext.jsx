import { createContext, useEffect, useReducer } from "react";

export const WeatherContext = createContext();

export const WEATHER_ACTIONS = {
    INIT_WEATHER: "INIT_WEATHER",
    ADD_WEATHER: "ADD_WEATHER",
    DELETE_WEATHER: "DELETE_WEATHER",
    EDIT_WEATHER: "EDIT_WEATHER",
};

const weatherReducer = (state, action) => {
    switch (action.type) {
        case WEATHER_ACTIONS.INIT_WEATHER:
            return action.payload;

        case WEATHER_ACTIONS.ADD_WEATHER:
            return [
                ...state,
                {
                    id: Date.now(),
                    city: action.payload.city,
                    temperature: action.payload.temperature,
                    condition: action.payload.condition,
                    isDay: action.payload.isDay,
                },
            ];

        case WEATHER_ACTIONS.DELETE_WEATHER:
            return state.filter((w) => w.id !== action.payload.id);

        case WEATHER_ACTIONS.EDIT_WEATHER:
            return state.map((w) =>
                w.id === action.payload.id
                    ? {
                          ...w,
                          city: action.payload.city,
                          temperature: action.payload.temperature,
                          condition: action.payload.condition,
                          isDay: action.payload.isDay,
                      }
                    : w
            );

        default:
            return state;
    }
};

export const WeatherProvider = ({ children }) => {
    const [weathers, dispatch] = useReducer(weatherReducer, [], () => {
        const saved = localStorage.getItem("weathers");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("weathers", JSON.stringify(weathers));
    }, [weathers]);

    return (
        <WeatherContext.Provider value={{ weathers, dispatch }}>
            {children}
        </WeatherContext.Provider>
    );
};
