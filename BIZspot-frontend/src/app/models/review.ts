export interface Review {
	content:string,
	postedAt:Date,
	lastEdited:Date,
	rating:number,
	userId:string,
	businessId: string,
	id?: string,
}