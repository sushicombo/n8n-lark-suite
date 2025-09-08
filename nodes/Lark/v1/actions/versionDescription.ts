/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import { type INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

import * as message from './message';

export const versionDescription: INodeTypeDescription = {
	displayName: 'Lark',
	name: 'lark',
	icon: 'file:../lark.svg',
	group: ['output'],
	version: 1,
	subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
	description: 'Lark suite API V1',
	defaults: {
		name: 'Lark',
	},
	inputs: [NodeConnectionType.Main],
	outputs: [NodeConnectionType.Main],
	credentials: [
		{
			name: 'larkTenantApi',
			required: true,
		},
	],
	properties: [
		{
			displayName: 'Resource',
			name: 'resource',
			type: 'options',
			noDataExpression: true,
			options: [
				{
					name: 'Message',
					value: 'message',
				},
			],
			default: 'message',
		},
		...message.descriptions,
	],
};
