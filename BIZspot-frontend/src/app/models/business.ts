export interface Business {
	id?:string,
	title: string,
	status: string,
	email: string,
	number: string,
	openingHours: Object[],
	level: number,
	members: Object[],
	categoryId: string,
	locationId: string,
	creatorId: string,
	about: string,
	thumbnail: string
}