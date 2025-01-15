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

  
export const roleOptions = [
	{ value: 'user', text: 'User' },
	{ value: 'seller', text: 'Seller' },
	{ value: 'manager', text: 'Manager' },
	{ value: 'technician', text: 'Technician' },
  ];
  
export   const statusOptions = [
	{ value: 'pending', text: 'Pending' },
	{ value: 'active', text: 'Active' },
	{ value: 'rejected', text: 'Rejected' },
	{ value: 'blocked', text: 'Blocked' },
  ];