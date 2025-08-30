export interface TrendyolCredentials {
	supplierId: string;
	apiKey: string;
	apiSecret: string;
	environment: 'production' | 'sandbox';
}

export interface TrendyolProduct {
	id?: string;
	title?: string;
	description?: string;
	brand?: string;
	category?: string;
	barcode?: string;
	stockCode?: string;
	salePrice?: number;
	listPrice?: number;
	quantity?: number;
	approved?: boolean;
	archived?: boolean;
	[key: string]: any;
}

export interface TrendyolOrder {
	id?: string;
	orderNumber?: string;
	customerId?: string;
	customerFirstName?: string;
	customerEmail?: string;
	orderDate?: number;
	status?: string;
	totalPrice?: number;
	lines?: TrendyolOrderLine[];
	[key: string]: any;
}

export interface TrendyolOrderLine {
	id?: string;
	productId?: string;
	productName?: string;
	quantity?: number;
	price?: number;
	barcode?: string;
	[key: string]: any;
}

export interface TrendyolBrand {
	id?: number;
	name?: string;
	path?: string;
	imageUrl?: string;
	[key: string]: any;
}

export interface TrendyolCategory {
	id?: number;
	name?: string;
	parentId?: number;
	subCategories?: TrendyolCategory[];
	[key: string]: any;
}

export interface TrendyolQuestion {
	id?: string;
	customerId?: string;
	customerName?: string;
	questionText?: string;
	answerText?: string;
	productId?: string;
	productName?: string;
	creationDate?: number;
	answerDate?: number;
	status?: 'WAITING_FOR_ANSWER' | 'WAITING_FOR_APPROVE' | 'ANSWERED' | 'REPORTED' | 'REJECTED';
	[key: string]: any;
}

export interface PaginationParams {
	page?: number;
	size?: number;
}

export interface ProductFilters extends PaginationParams {
	approved?: boolean;
	archived?: boolean;
	brandIds?: string;
	barcode?: string;
	stockCode?: string;
	startDate?: number;
	endDate?: number;
	dateQueryType?: string;
	supplierId?: number;
	productMainId?: string;
	onSale?: boolean;
	rejected?: boolean;
	blacklisted?: boolean;
}

export interface OrderFilters extends PaginationParams {
	startDate?: string;
	endDate?: string;
	status?: string;
	orderByField?: string;
	orderByDirection?: string;
	orderNumber?: string;
	supplierId?: number;
	shipmentPackageIds?: number;
}

export interface QuestionFilters extends PaginationParams {
	startDate?: string;
	endDate?: string;
	status?: 'WAITING_FOR_ANSWER' | 'WAITING_FOR_APPROVE' | 'ANSWERED' | 'REPORTED' | 'REJECTED';
	barcode?: string;
	supplierId?: number;
	orderByField?: 'LastModifiedDate' | 'CreatedDate';
	orderByDirection?: 'ASC' | 'DESC';
}

export type TrendyolResource = 'product' | 'order' | 'brand' | 'category' | 'question' | 'webhook';

export type ProductOperation = 'getMany' | 'get';
export type OrderOperation = 'getMany' | 'get';
export type BrandOperation = 'getMany' | 'getByName';
export type CategoryOperation = 'getMany';
export type QuestionOperation = 'getMany' | 'answer';
export type WebhookOperation = 'getMany';

export type TrendyolOperation =
	| ProductOperation
	| OrderOperation
	| BrandOperation
	| CategoryOperation
	| QuestionOperation
	| WebhookOperation;

// Webhook Types
export interface TrendyolWebhook {
	id?: string;
	url: string;
	username?: string;
	password?: string;
	authenticationType?: 'BASIC_AUTHENTICATION' | 'API_KEY';
	apiKey?: string;
	subscribedStatuses?: TrendyolWebhookEventType[];
	eventType?: TrendyolWebhookEventType; // Legacy field for backward compatibility
	isActive?: boolean;
	supplierId?: string;
	createdDate?: number;
	lastModifiedDate?: number;
}

export interface TrendyolWebhookEvent {
	id?: string;
	eventType: TrendyolWebhookEventType;
	eventDate?: number;
	supplierId?: string;
	data?: any;
	webhookId?: string;
}

export interface TrendyolWebhookResponse {
	webhooks?: TrendyolWebhook[];
	totalElements?: number;
	totalPages?: number;
	page?: number;
	size?: number;
}

export type TrendyolWebhookEventType =
	| 'CREATED'
	| 'PICKING'
	| 'INVOICED'
	| 'SHIPPED'
	| 'CANCELLED'
	| 'DELIVERED'
	| 'UNDELIVERED'
	| 'RETURNED'
	| 'UNSUPPLIED'
	| 'AWAITING'
	| 'UNPACKED'
	| 'AT_COLLECTION_POINT'
	| 'VERIFIED';
