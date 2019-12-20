export interface Review {
	content:string,
	postedAt:Date,
	lastEdited:Date,
	rating:Number,
	userId:string,
	businessId: string,
	id?: string,
}