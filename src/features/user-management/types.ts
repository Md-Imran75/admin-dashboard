export type Role = 'User' | 'Seller' | 'Manager' | 'Technician';
export type Status = 'pending' | 'active' | 'blocked' | 'rejected';

export type User = {
	id: string;
    userName: string;
	fullName: string;
	email: string;
    phone: string;
    balance: number;
	role: Role;
	status: Status;
};

export type SortColumn = keyof User;
export type SortDirection = 'asc' | 'desc';

export type State = {
	users: User[];
	filter: {
		role?: Role;
		status?: Status;
		query?: string;
	};
	sort: {
		column: SortColumn;
		direction: SortDirection;
	};
	page: number;
	pageSize: number;
	totalPages: number;
	totalUsers: number;
};

export type SetStateAction = {
	type: 'SET_STATE';
	payload: State;
};

export type UpdateState = {
	type: 'UPDATE_STATE';
	payload: Partial<State>;
};

export type ResetAction = {
	type: 'RESET';
};

export type Action = SetStateAction | UpdateState | ResetAction;