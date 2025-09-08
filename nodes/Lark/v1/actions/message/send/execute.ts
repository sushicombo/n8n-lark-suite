import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';

export async function send(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const receiveIdType = this.getNodeParameter('receiveIdType', index) as string;
	const receiveId = this.getNodeParameter('receiveId', index) as string;
	const msgType = this.getNodeParameter('msgType', index) as string;
	const additional = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
	const uuid = (additional.uuid as string) || '';

	let content: string;

	// Handle different message types
	if (msgType === 'text') {
		const textContent = this.getNodeParameter('textContent', index) as string;
		content = JSON.stringify({ text: textContent });
	} else {
		const contentParam = this.getNodeParameter('content', index) as IDataObject | string;
		if (typeof contentParam === 'string') {
			try {
				content = JSON.stringify(JSON.parse(contentParam));
			} catch (error) {
				throw new Error(
					'Invalid JSON format in the content parameter. Please provide a valid JSON object.',
				);
			}
		} else {
			content = JSON.stringify(contentParam);
		}
	}

	// Prepare request body
	const body: IDataObject = {
		receive_id: receiveId,
		msg_type: msgType,
		content: content,
	};

	// Add UUID if provided
	if (uuid) {
		body.uuid = uuid;
	}

	// Prepare query parameters
	const qs: IDataObject = {
		receive_id_type: receiveIdType,
	};

	const requestMethod = 'POST';
	const endpoint = 'im/v1/messages';

	const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

	return this.helpers.returnJsonArray([responseData.data] as IDataObject[]);
}
