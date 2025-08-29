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
}

export type TrendyolResource = 'product' | 'order' | 'brand' | 'category';

export type ProductOperation = 'getAll' | 'get';
export type OrderOperation = 'getAll' | 'get';
export type BrandOperation = 'getAll' | 'getByName';
export type CategoryOperation = 'getAll';

export type TrendyolOperation = ProductOperation | OrderOperation | BrandOperation | CategoryOperation;
