import type { INodeProperties } from 'n8n-workflow';
import { paginationFields } from '../common';

export const categoryGetManyFields: INodeProperties[] = [...paginationFields];
