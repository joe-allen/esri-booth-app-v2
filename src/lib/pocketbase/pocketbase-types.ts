/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';

export enum Collections {
	Authorigins = '_authOrigins',
	Externalauths = '_externalAuths',
	Mfas = '_mfas',
	Otps = '_otps',
	Superusers = '_superusers',
	Engagements = 'engagements',
	Industries = 'industries',
	Links = 'links',
	Media = 'media',
	Tags = 'tags',
	Users = 'users'
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T };

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString;
	collectionId: string;
	collectionName: Collections;
} & ExpandType<T>;

export type AuthSystemFields<T = unknown> = {
	email: string;
	emailVisibility: boolean;
	username: string;
	verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string;
	created?: IsoDateString;
	fingerprint: string;
	id: string;
	recordRef: string;
	updated?: IsoDateString;
};

export type ExternalauthsRecord = {
	collectionRef: string;
	created?: IsoDateString;
	id: string;
	provider: string;
	providerId: string;
	recordRef: string;
	updated?: IsoDateString;
};

export type MfasRecord = {
	collectionRef: string;
	created?: IsoDateString;
	id: string;
	method: string;
	recordRef: string;
	updated?: IsoDateString;
};

export type OtpsRecord = {
	collectionRef: string;
	created?: IsoDateString;
	id: string;
	password: string;
	recordRef: string;
	sentTo?: string;
	updated?: IsoDateString;
};

export type SuperusersRecord = {
	created?: IsoDateString;
	email: string;
	emailVisibility?: boolean;
	id: string;
	password: string;
	tokenKey: string;
	updated?: IsoDateString;
	verified?: boolean;
};

export type EngagementsRecord = {
	archived?: boolean;
	background_image?: string;
	color_accent?: string;
	color_background?: string;
	color_primary?: string;
	color_secondary?: string;
	created?: IsoDateString;
	id: string;
	industries?: RecordIdString[];
	links?: RecordIdString[];
	media?: RecordIdString[];
	tags?: RecordIdString[];
	title?: string;
	updated?: IsoDateString;
};

export type IndustriesRecord = {
	archived?: boolean;
	background_image?: string;
	created?: IsoDateString;
	id: string;
	title?: string;
	updated?: IsoDateString;
};

export type LinksRecord = {
	archive?: boolean;
	created?: IsoDateString;
	id: string;
	title?: string;
	updated?: IsoDateString;
	url?: string;
};

export type MediaRecord = {
	archive?: boolean;
	created?: IsoDateString;
	description?: HTMLString;
	documents?: string[];
	id: string;
	images?: string[];
	related_links?: RecordIdString[];
	title?: string;
	updated?: IsoDateString;
	videos?: string[];
};

export type TagsRecord = {
	archived?: boolean;
	created?: IsoDateString;
	global?: boolean;
	id: string;
	title?: string;
	updated?: IsoDateString;
};

export type UsersRecord = {
	avatar?: string;
	created?: IsoDateString;
	email: string;
	emailVisibility?: boolean;
	id: string;
	name?: string;
	password: string;
	tokenKey: string;
	updated?: IsoDateString;
	verified?: boolean;
};

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> &
	BaseSystemFields<Texpand>;
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> &
	BaseSystemFields<Texpand>;
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>;
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>;
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> &
	AuthSystemFields<Texpand>;
export type EngagementsResponse<Texpand = unknown> = Required<EngagementsRecord> &
	BaseSystemFields<Texpand>;
export type IndustriesResponse<Texpand = unknown> = Required<IndustriesRecord> &
	BaseSystemFields<Texpand>;
export type LinksResponse<Texpand = unknown> = Required<LinksRecord> & BaseSystemFields<Texpand>;
export type MediaResponse<Texpand = unknown> = Required<MediaRecord> & BaseSystemFields<Texpand>;
export type TagsResponse<Texpand = unknown> = Required<TagsRecord> & BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord;
	_externalAuths: ExternalauthsRecord;
	_mfas: MfasRecord;
	_otps: OtpsRecord;
	_superusers: SuperusersRecord;
	engagements: EngagementsRecord;
	industries: IndustriesRecord;
	links: LinksRecord;
	media: MediaRecord;
	tags: TagsRecord;
	users: UsersRecord;
};

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse;
	_externalAuths: ExternalauthsResponse;
	_mfas: MfasResponse;
	_otps: OtpsResponse;
	_superusers: SuperusersResponse;
	engagements: EngagementsResponse;
	industries: IndustriesResponse;
	links: LinksResponse;
	media: MediaResponse;
	tags: TagsResponse;
	users: UsersResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>;
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>;
	collection(idOrName: '_mfas'): RecordService<MfasResponse>;
	collection(idOrName: '_otps'): RecordService<OtpsResponse>;
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>;
	collection(idOrName: 'engagements'): RecordService<EngagementsResponse>;
	collection(idOrName: 'industries'): RecordService<IndustriesResponse>;
	collection(idOrName: 'links'): RecordService<LinksResponse>;
	collection(idOrName: 'media'): RecordService<MediaResponse>;
	collection(idOrName: 'tags'): RecordService<TagsResponse>;
	collection(idOrName: 'users'): RecordService<UsersResponse>;
};
