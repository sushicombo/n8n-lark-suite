import type { MessageProperties } from '../../interfaces';

export const messageSendDescription: MessageProperties = [
	{
		displayName: 'Receiver ID Type',
		name: 'receiveIdType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['send'],
			},
		},
		default: 'open_id',
		description: 'ID type of the message receiver',
		options: [
			{
				name: 'Chat ID',
				value: 'chat_id',
				description: 'Identifies group chats by chat_id',
			},
			{
				name: 'Email',
				value: 'email',
				description: 'Identifies users by their actual email address',
			},
			{
				name: 'Open ID',
				value: 'open_id',
				description:
					'Identifies a user to an app. The same user has different Open IDs in different apps.',
			},
			{
				name: 'Union ID',
				value: 'union_id',
				description: 'Identifies a user to a tenant that acts as a developer',
			},
			{
				name: 'User ID',
				value: 'user_id',
				description:
					'Identifies a user to a tenant. The same user has different User IDs in different tenants.',
			},
		],
	},
	{
		displayName: 'Receiver ID',
		name: 'receiveId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['send'],
			},
		},
		default: '',
		description:
			'ID of the message receiver. Fill in the corresponding message receiver ID based on the receive_id_type value.',
		placeholder: 'ou_7d8a6e6df7621556ce0d21922b676706ccs',
	},
	{
		displayName: 'Message Type',
		name: 'msgType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['send'],
			},
		},
		default: 'text',
		description: 'Type of message to send',
		options: [
			{
				name: 'Audio',
				value: 'audio',
				description: 'Audio message',
			},
			{
				name: 'File',
				value: 'file',
				description: 'File attachment',
			},
			{
				name: 'Image',
				value: 'image',
				description: 'Image message',
			},
			{
				name: 'Interactive Card',
				value: 'interactive',
				description: 'Interactive message card',
			},
			{
				name: 'Rich Text',
				value: 'post',
				description: 'Rich text message with formatting',
			},
			{
				name: 'Share Chat',
				value: 'share_chat',
				description: 'Share a chat',
			},
			{
				name: 'Share User',
				value: 'share_user',
				description: 'Share a user',
			},
			{
				name: 'Sticker',
				value: 'sticker',
				description: 'Sticker/emoji message',
			},
			{
				name: 'Text',
				value: 'text',
				description: 'Plain text message',
			},
			{
				name: 'Video',
				value: 'media',
				description: 'Video message',
			},
		],
	},
	{
		displayName: 'Text Content',
		name: 'textContent',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['send'],
				msgType: ['text'],
			},
		},
		default: '',
		description: 'The text content of the message',
		placeholder: 'Hello, this is a test message',
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['send'],
				msgType: [
					'post',
					'image',
					'file',
					'audio',
					'media',
					'sticker',
					'interactive',
					'share_chat',
					'share_user',
				],
			},
		},
		default: '{}',
		description: 'Message content as JSON object. The structure depends on the message type.',
		placeholder: '{"text": "Hello World"}',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['send'],
			},
		},
		options: [
			{
				displayName: 'UUID',
				name: 'uuid',
				type: 'string',
				default: '',
				description:
					'A unique string sequence for request deduplication. Requests with the same uuid can successfully send at most one message within 1 hour.',
				placeholder: 'a0d69e20-1dd1-458b-k525-dfeca4015204',
			},
		],
	},
];
