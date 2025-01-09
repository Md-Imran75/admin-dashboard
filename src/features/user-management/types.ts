export type Role = "user" | "seller" | "manager" | "technician";
export type Status = "active" | "rejected" | "pending" | "blocked";

export type User = {
	_id: string;
	userName: string;
	fullName: string;
	email: string;
	phone: string;
	balance: number;
	role: Role;
	status: Status;
};


export type State = {
	page: number;
	limit: number;
	sortBy: keyof User;
	sortDirection: "asc" | "desc";
	role?: Role;
	status?: Status;
	query?: string;
};

export type Action =
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_LIMIT"; payload: number }
  | { type: "SET_SORT"; payload: { sortBy: keyof User; sortDirection: "asc" | "desc" } }
  | { type: "SET_FILTER"; payload: { role?: Role; status?: Status } }
  | { type: "SET_QUERY"; payload: string }
  | { type: "RESET"};

  