import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class Lark implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Lark',
		name: 'lark',
		icon: 'file:lark_new.svg',
		group: ['transform'],
		subtitle: 'Get Lark user information',
		version: 1,
		description: 'Fetches user data from Lark by user_id',
		defaults: {
			name: 'Lark User Info',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'larkTenantApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://open.larksuite.com/open-apis/contact/v3/users',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				Accept: 'application/json',
			},
		},
		properties: [
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				placeholder: '7be5fg9a',
				required: true,
				description: 'User ID, must match the user_id_type in the query parameter',
				routing: {
					request: {
						method: 'GET',
						url: '=/{{$value}}',
					},
				},
			},
			{
				displayName: 'User ID Type',
				name: 'userIdType',
				type: 'options',
				default: 'open_id',
				options: [
					{
						name: 'Open ID',
						value: 'open_id',
						description: 'Identifies a user to an app',
					},
					{
						name: 'Union ID',
						value: 'union_id',
						description: 'Identifies a user to a developer',
					},
					{
						name: 'User ID',
						value: 'user_id',
						description: 'Identifies a user to a tenant',
					},
				],
				description: 'User ID category',
				routing: {
					request: {
						qs: {
							user_id_type: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Department ID Type',
				name: 'departmentIdType',
				type: 'options',
				default: 'open_department_id',
				options: [
					{
						name: 'Department ID',
						value: 'department_id',
						description: 'Unique ID for department within a tenant',
					},
					{
						name: 'Open Department ID',
						value: 'open_department_id',
						description: 'ID for department in a specific application',
					},
				],
				description: 'Type of department ID used in this call',
				routing: {
					request: {
						qs: {
							department_id_type: '={{$value}}',
						},
					},
				},
			},
		],
	};
}
