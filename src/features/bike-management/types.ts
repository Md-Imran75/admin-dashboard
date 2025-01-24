export type Verified = "self" | "online" | "offline";
export type Status = "pending" | "active" | "rejected";

export type Bike = {
    _id: string;
    title: string;
    slug?: string;
    price: number;
    engine: string;
    power?: string;
    torque?: string;
    mileage: string;
    brakes?: string;
    tyreType?: string;
    views?: number;
    bikeModel: string;
    brand: string;
    regYear: number;
    abs: string;
    description: string;
    used?: boolean;
    featured?: boolean;
    scooter?: boolean;
    verified: Verified;
    status: Status;
    userId?: string;
    bikeId?: string;
}

export type State = {
	page: number;
	limit: number;
	sortBy: keyof Bike;
	sortDirection: "asc" | "desc";
	verified?: Verified;
	status?: Status;
	query?: string;
};

export type Action =
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_LIMIT"; payload: number }
  | { type: "SET_SORT"; payload: { sortBy: keyof Bike; sortDirection: "asc" | "desc" } }
  | { type: "SET_FILTER"; payload: { verified?: Verified; status?: Status } }
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