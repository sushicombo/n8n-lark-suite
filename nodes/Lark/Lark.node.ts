import {   VersionedNodeType } from 'n8n-workflow';
import type {INodeTypeBaseDescription, IVersionedNodeType} from 'n8n-workflow';

import { LarkV1 } from './v1/LarkV1.node';

export class Lark extends VersionedNodeType {
	constructor() {
			const baseDescription: INodeTypeBaseDescription = {
			displayName: 'Lark',
			name: 'lark',
			icon: 'file:lark.svg',
			group: ['input'],
			description: 'Lark Suite node',
			defaultVersion: 1,
		};

		const nodeVersions: IVersionedNodeType['nodeVersions'] = {
			1: new LarkV1(baseDescription),
		};

		super(nodeVersions, baseDescription);
	}
}
