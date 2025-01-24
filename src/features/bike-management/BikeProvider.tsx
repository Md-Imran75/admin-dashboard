import { createContext, PropsWithChildren, useReducer } from 'react';
import { Action, State } from './types';

// Initial state
const initialState: State = {
    page: 1,
    limit: 10,
    sortBy: "_id",
    sortDirection: "asc",
};

// Reducer function
const bikeReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_PAGE":
            return { ...state, page: action.payload };
        case "SET_LIMIT":
            return { ...state, limit: action.payload };
        case "SET_SORT":
            return { ...state, ...action.payload };
        case "SET_FILTER":
            return { ...state, ...action.payload, page: 1 };
        case "SET_QUERY":
            return { ...state, query: action.payload, page: 1 };
        case "RESET":
            return initialState;
        default:
            return state;
    }
};

// Define the context type
interface AppContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}

// Create the context
export const BikeContext = createContext<AppContextProps>({
    state: initialState,
    dispatch: () => {}, // Default no-op function
});

// Context provider component
export const BikeProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(bikeReducer, initialState);

    return (
        <BikeContext value={{ state, dispatch }}>
            {children}
        </BikeContext>
    );
};
