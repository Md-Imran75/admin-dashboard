import { createContext, PropsWithChildren, useReducer} from 'react';
import { Action, State } from './types';

const initialState: State = {
	page: 1,
	limit: 10,
	sortBy: "_id",
	sortDirection: "asc",
};

const userReducer = (state: State, action: Action): State => {
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

// Context types
interface AppContextProps {
	state: State;
	dispatch: React.Dispatch<Action>;
}


export const UserContext = createContext<AppContextProps>(
	{
		state: initialState,
		dispatch: () => { }
	}
);

export const UserProvider = (props: PropsWithChildren) => {
	const [state, dispatch] = useReducer(userReducer, initialState);

	return (
		<UserContext value={{ state, dispatch }}>{props.children}</UserContext>
	);
};

