import type {
	IAuthenticateGeneric,
	ICredentialType,
	ICredentialTestRequest,
	INodeProperties,
} from 'n8n-workflow';

export class LarkTenantApi implements ICredentialType {
	name = 'larkTenantApi';
	displayName = 'Lark Tenant API';
	documentationUrl =
		'https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/reference/authen-v3/tenant_access_token';

	icon = { light: 'file:lark.svg', dark: 'file:lark.svg' } as const;

	properties: INodeProperties[] = [
		{
			displayName: 'App ID',
			name: 'appId',
			type: 'string',
			default: '',
		},
		{
			displayName: 'App Secret',
			name: 'appSecret',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
		{
			displayName: 'Tenant Access Token',
			name: 'tenantAccessToken',
			type: 'hidden',
			typeOptions: {
				expirable: true,
			},
			default: '',
		},
		{
			displayName: 'Token Expiry',
			name: 'tokenExpiry',
			type: 'hidden',
			default: 0,
		},
	];

	async preAuthentication(this: any, credentials: any) {
		const now = Math.floor(Date.now() / 1000);
		const expiry = credentials.tokenExpiry ?? 0;

		if (credentials.tenantAccessToken && expiry && expiry - now > 1800) {
			return credentials;
		}

		const response = await this.helpers.httpRequest({
			method: 'POST',
			url: 'https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: {
				app_id: credentials.appId,
				app_secret: credentials.appSecret,
			},
			json: true,
		});

		if (response.code !== 0) {
			throw new Error(`Lark auth failed: ${response.msg}`);
		}

		credentials.tenantAccessToken = response.tenant_access_token;
		credentials.tokenExpiry = Math.floor(Date.now() / 1000) + response.expire;

		return credentials;
	}

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.tenantAccessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			url: 'https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal',
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: {
				app_id: '={{$credentials.appId}}',
				app_secret: '={{$credentials.appSecret}}',
			},
		},
		rules: [
			{
				type: 'responseCode',
				properties: { value: 200, message: 'Authentication failed: Non-200 response' },
			},
		],
	};
}
