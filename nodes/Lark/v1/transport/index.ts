import type {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	GenericValue,
	IDataObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
} from 'n8n-workflow';

/**
 * Make an API request to Lark
 */
export async function apiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject | GenericValue | GenericValue[] = {},
	query: IDataObject = {},
) {
	const baseUrl = 'https://open.larksuite.com/open-apis';

	const options: IHttpRequestOptions = {
		method,
		body,
		qs: query,
		url: `${baseUrl}/${endpoint}`,
		headers: {
			'content-type': 'application/json; charset=utf-8',
		},
		json: true,
	};

	try {
		const response = await this.helpers.httpRequestWithAuthentication.call(
			this,
			'larkTenantApi',
			options,
		);

		// Check if the response has a Lark API error
		if (response && typeof response === 'object' && 'code' in response && response.code !== 0) {
			throw new Error(`Lark API Error: ${response.msg} (Code: ${response.code})`);
		}

		return response;
	} catch (error) {
		console.error('Lark API Error:', error);

		// Enhanced error handling
		if (error.response?.data) {
			const errorBody = error.response.data;
			throw new Error(
				`Lark API Error: ${errorBody.msg || error.message} (Code: ${errorBody.code || 'Unknown'})`,
			);
		}
		throw error;
	}
}

export async function apiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD',
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
) {
	const returnData: IDataObject[] = [];

	let responseData;
	query.page = 0;
	query.per_page = 100;

	do {
		responseData = await apiRequest.call(this, method, endpoint, body, query);
		query.page++;
		returnData.push.apply(returnData, responseData as IDataObject[]);
	} while (responseData.length !== 0);

	return returnData;
}
