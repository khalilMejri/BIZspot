export interface Subscription {
	id?:string,
	type: string;
	created: Date;
	view_notify: Date;
	userId: string;
	businessId: string;
  }