export interface Location {
	id?:string,
	number?:number,
	locality: string,
	country: string,
	postal_code: string,
	state: string,
	latitude?: number,
	longitude?: number,
	marker?: Marker
}