import type { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

type LarkMap = {
	message: 'send';
};

export type Lark = AllEntities<LarkMap>;

export type LarkMessage = Entity<LarkMap, 'message'>;

export type MessageProperties = PropertiesOf<LarkMessage>;

export interface IAttachment {
	fields: {
		item?: object[];
	};
	actions: {
		item?: object[];
	};
}
