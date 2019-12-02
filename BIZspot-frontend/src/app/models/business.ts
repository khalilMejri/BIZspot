export interface Business {
	id:string,
	title: string,
	status: string,
	email: string,
	number: number,
	openingHours: Object[],
	level: number,
	members: Object[],
	categoryId: string,
	locationId: string
}