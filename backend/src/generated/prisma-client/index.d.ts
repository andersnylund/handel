// Code generated by Prisma (prisma@1.30.0). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export interface Exists {
  item: (where?: ItemWhereInput) => Promise<boolean>;
  offer: (where?: OfferWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  item: (where: ItemWhereUniqueInput) => ItemPromise;
  items: (
    args?: {
      where?: ItemWhereInput;
      orderBy?: ItemOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => FragmentableArray<Item>;
  itemsConnection: (
    args?: {
      where?: ItemWhereInput;
      orderBy?: ItemOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => ItemConnectionPromise;
  offer: (where: OfferWhereUniqueInput) => OfferPromise;
  offers: (
    args?: {
      where?: OfferWhereInput;
      orderBy?: OfferOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => FragmentableArray<Offer>;
  offersConnection: (
    args?: {
      where?: OfferWhereInput;
      orderBy?: OfferOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => OfferConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createItem: (data: ItemCreateInput) => ItemPromise;
  updateItem: (
    args: { data: ItemUpdateInput; where: ItemWhereUniqueInput }
  ) => ItemPromise;
  updateManyItems: (
    args: { data: ItemUpdateManyMutationInput; where?: ItemWhereInput }
  ) => BatchPayloadPromise;
  upsertItem: (
    args: {
      where: ItemWhereUniqueInput;
      create: ItemCreateInput;
      update: ItemUpdateInput;
    }
  ) => ItemPromise;
  deleteItem: (where: ItemWhereUniqueInput) => ItemPromise;
  deleteManyItems: (where?: ItemWhereInput) => BatchPayloadPromise;
  createOffer: (data: OfferCreateInput) => OfferPromise;
  updateOffer: (
    args: { data: OfferUpdateInput; where: OfferWhereUniqueInput }
  ) => OfferPromise;
  updateManyOffers: (
    args: { data: OfferUpdateManyMutationInput; where?: OfferWhereInput }
  ) => BatchPayloadPromise;
  upsertOffer: (
    args: {
      where: OfferWhereUniqueInput;
      create: OfferCreateInput;
      update: OfferUpdateInput;
    }
  ) => OfferPromise;
  deleteOffer: (where: OfferWhereUniqueInput) => OfferPromise;
  deleteManyOffers: (where?: OfferWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  item: (
    where?: ItemSubscriptionWhereInput
  ) => ItemSubscriptionPayloadSubscription;
  offer: (
    where?: OfferSubscriptionWhereInput
  ) => OfferSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type ItemOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "title_ASC"
  | "title_DESC"
  | "description_ASC"
  | "description_DESC"
  | "price_ASC"
  | "price_DESC"
  | "image_ASC"
  | "image_DESC"
  | "largeImage_ASC"
  | "largeImage_DESC"
  | "userId_ASC"
  | "userId_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type OfferType = "ACCEPT" | "REJECT";

export type OfferOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "type_ASC"
  | "type_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export interface OfferUpdateInput {
  type?: OfferType;
  maker?: ItemUpdateOneRequiredInput;
  receiver?: ItemUpdateOneRequiredInput;
}

export interface ItemCreateInput {
  title: String;
  description: String;
  price: Int;
  image: String;
  largeImage: String;
  userId: String;
}

export interface ItemWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  title?: String;
  title_not?: String;
  title_in?: String[] | String;
  title_not_in?: String[] | String;
  title_lt?: String;
  title_lte?: String;
  title_gt?: String;
  title_gte?: String;
  title_contains?: String;
  title_not_contains?: String;
  title_starts_with?: String;
  title_not_starts_with?: String;
  title_ends_with?: String;
  title_not_ends_with?: String;
  description?: String;
  description_not?: String;
  description_in?: String[] | String;
  description_not_in?: String[] | String;
  description_lt?: String;
  description_lte?: String;
  description_gt?: String;
  description_gte?: String;
  description_contains?: String;
  description_not_contains?: String;
  description_starts_with?: String;
  description_not_starts_with?: String;
  description_ends_with?: String;
  description_not_ends_with?: String;
  price?: Int;
  price_not?: Int;
  price_in?: Int[] | Int;
  price_not_in?: Int[] | Int;
  price_lt?: Int;
  price_lte?: Int;
  price_gt?: Int;
  price_gte?: Int;
  image?: String;
  image_not?: String;
  image_in?: String[] | String;
  image_not_in?: String[] | String;
  image_lt?: String;
  image_lte?: String;
  image_gt?: String;
  image_gte?: String;
  image_contains?: String;
  image_not_contains?: String;
  image_starts_with?: String;
  image_not_starts_with?: String;
  image_ends_with?: String;
  image_not_ends_with?: String;
  largeImage?: String;
  largeImage_not?: String;
  largeImage_in?: String[] | String;
  largeImage_not_in?: String[] | String;
  largeImage_lt?: String;
  largeImage_lte?: String;
  largeImage_gt?: String;
  largeImage_gte?: String;
  largeImage_contains?: String;
  largeImage_not_contains?: String;
  largeImage_starts_with?: String;
  largeImage_not_starts_with?: String;
  largeImage_ends_with?: String;
  largeImage_not_ends_with?: String;
  userId?: String;
  userId_not?: String;
  userId_in?: String[] | String;
  userId_not_in?: String[] | String;
  userId_lt?: String;
  userId_lte?: String;
  userId_gt?: String;
  userId_gte?: String;
  userId_contains?: String;
  userId_not_contains?: String;
  userId_starts_with?: String;
  userId_not_starts_with?: String;
  userId_ends_with?: String;
  userId_not_ends_with?: String;
  AND?: ItemWhereInput[] | ItemWhereInput;
  OR?: ItemWhereInput[] | ItemWhereInput;
  NOT?: ItemWhereInput[] | ItemWhereInput;
}

export type ItemWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
}>;

export interface OfferWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  type?: OfferType;
  type_not?: OfferType;
  type_in?: OfferType[] | OfferType;
  type_not_in?: OfferType[] | OfferType;
  maker?: ItemWhereInput;
  receiver?: ItemWhereInput;
  AND?: OfferWhereInput[] | OfferWhereInput;
  OR?: OfferWhereInput[] | OfferWhereInput;
  NOT?: OfferWhereInput[] | OfferWhereInput;
}

export interface OfferUpdateManyMutationInput {
  type?: OfferType;
}

export interface ItemUpdateDataInput {
  title?: String;
  description?: String;
  price?: Int;
  image?: String;
  largeImage?: String;
  userId?: String;
}

export interface ItemUpdateInput {
  title?: String;
  description?: String;
  price?: Int;
  image?: String;
  largeImage?: String;
  userId?: String;
}

export interface ItemUpdateManyMutationInput {
  title?: String;
  description?: String;
  price?: Int;
  image?: String;
  largeImage?: String;
  userId?: String;
}

export interface OfferCreateInput {
  type: OfferType;
  maker: ItemCreateOneInput;
  receiver: ItemCreateOneInput;
}

export interface ItemSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: ItemWhereInput;
  AND?: ItemSubscriptionWhereInput[] | ItemSubscriptionWhereInput;
  OR?: ItemSubscriptionWhereInput[] | ItemSubscriptionWhereInput;
  NOT?: ItemSubscriptionWhereInput[] | ItemSubscriptionWhereInput;
}

export interface ItemUpdateOneRequiredInput {
  create?: ItemCreateInput;
  update?: ItemUpdateDataInput;
  upsert?: ItemUpsertNestedInput;
  connect?: ItemWhereUniqueInput;
}

export interface ItemUpsertNestedInput {
  update: ItemUpdateDataInput;
  create: ItemCreateInput;
}

export interface ItemCreateOneInput {
  create?: ItemCreateInput;
  connect?: ItemWhereUniqueInput;
}

export type OfferWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
}>;

export interface OfferSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: OfferWhereInput;
  AND?: OfferSubscriptionWhereInput[] | OfferSubscriptionWhereInput;
  OR?: OfferSubscriptionWhereInput[] | OfferSubscriptionWhereInput;
  NOT?: OfferSubscriptionWhereInput[] | OfferSubscriptionWhereInput;
}

export interface NodeNode {
  id: ID_Output;
}

export interface ItemEdge {
  node: Item;
  cursor: String;
}

export interface ItemEdgePromise extends Promise<ItemEdge>, Fragmentable {
  node: <T = ItemPromise>() => T;
  cursor: () => Promise<String>;
}

export interface ItemEdgeSubscription
  extends Promise<AsyncIterator<ItemEdge>>,
    Fragmentable {
  node: <T = ItemSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface ItemSubscriptionPayload {
  mutation: MutationType;
  node: Item;
  updatedFields: String[];
  previousValues: ItemPreviousValues;
}

export interface ItemSubscriptionPayloadPromise
  extends Promise<ItemSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = ItemPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = ItemPreviousValuesPromise>() => T;
}

export interface ItemSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<ItemSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = ItemSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = ItemPreviousValuesSubscription>() => T;
}

export interface AggregateOffer {
  count: Int;
}

export interface AggregateOfferPromise
  extends Promise<AggregateOffer>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateOfferSubscription
  extends Promise<AsyncIterator<AggregateOffer>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface OfferPreviousValues {
  id: ID_Output;
  type: OfferType;
}

export interface OfferPreviousValuesPromise
  extends Promise<OfferPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  type: () => Promise<OfferType>;
}

export interface OfferPreviousValuesSubscription
  extends Promise<AsyncIterator<OfferPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  type: () => Promise<AsyncIterator<OfferType>>;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface ItemPreviousValues {
  id: ID_Output;
  title: String;
  description: String;
  price: Int;
  image: String;
  largeImage: String;
  userId: String;
}

export interface ItemPreviousValuesPromise
  extends Promise<ItemPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  title: () => Promise<String>;
  description: () => Promise<String>;
  price: () => Promise<Int>;
  image: () => Promise<String>;
  largeImage: () => Promise<String>;
  userId: () => Promise<String>;
}

export interface ItemPreviousValuesSubscription
  extends Promise<AsyncIterator<ItemPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  title: () => Promise<AsyncIterator<String>>;
  description: () => Promise<AsyncIterator<String>>;
  price: () => Promise<AsyncIterator<Int>>;
  image: () => Promise<AsyncIterator<String>>;
  largeImage: () => Promise<AsyncIterator<String>>;
  userId: () => Promise<AsyncIterator<String>>;
}

export interface Item {
  id: ID_Output;
  title: String;
  description: String;
  price: Int;
  image: String;
  largeImage: String;
  userId: String;
}

export interface ItemPromise extends Promise<Item>, Fragmentable {
  id: () => Promise<ID_Output>;
  title: () => Promise<String>;
  description: () => Promise<String>;
  price: () => Promise<Int>;
  image: () => Promise<String>;
  largeImage: () => Promise<String>;
  userId: () => Promise<String>;
}

export interface ItemSubscription
  extends Promise<AsyncIterator<Item>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  title: () => Promise<AsyncIterator<String>>;
  description: () => Promise<AsyncIterator<String>>;
  price: () => Promise<AsyncIterator<Int>>;
  image: () => Promise<AsyncIterator<String>>;
  largeImage: () => Promise<AsyncIterator<String>>;
  userId: () => Promise<AsyncIterator<String>>;
}

export interface ItemConnection {
  pageInfo: PageInfo;
  edges: ItemEdge[];
}

export interface ItemConnectionPromise
  extends Promise<ItemConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<ItemEdge>>() => T;
  aggregate: <T = AggregateItemPromise>() => T;
}

export interface ItemConnectionSubscription
  extends Promise<AsyncIterator<ItemConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<ItemEdgeSubscription>>>() => T;
  aggregate: <T = AggregateItemSubscription>() => T;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface OfferSubscriptionPayload {
  mutation: MutationType;
  node: Offer;
  updatedFields: String[];
  previousValues: OfferPreviousValues;
}

export interface OfferSubscriptionPayloadPromise
  extends Promise<OfferSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = OfferPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = OfferPreviousValuesPromise>() => T;
}

export interface OfferSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<OfferSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = OfferSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = OfferPreviousValuesSubscription>() => T;
}

export interface OfferEdge {
  node: Offer;
  cursor: String;
}

export interface OfferEdgePromise extends Promise<OfferEdge>, Fragmentable {
  node: <T = OfferPromise>() => T;
  cursor: () => Promise<String>;
}

export interface OfferEdgeSubscription
  extends Promise<AsyncIterator<OfferEdge>>,
    Fragmentable {
  node: <T = OfferSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregateItem {
  count: Int;
}

export interface AggregateItemPromise
  extends Promise<AggregateItem>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateItemSubscription
  extends Promise<AsyncIterator<AggregateItem>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface Offer {
  id: ID_Output;
  type: OfferType;
}

export interface OfferPromise extends Promise<Offer>, Fragmentable {
  id: () => Promise<ID_Output>;
  type: () => Promise<OfferType>;
  maker: <T = ItemPromise>() => T;
  receiver: <T = ItemPromise>() => T;
}

export interface OfferSubscription
  extends Promise<AsyncIterator<Offer>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  type: () => Promise<AsyncIterator<OfferType>>;
  maker: <T = ItemSubscription>() => T;
  receiver: <T = ItemSubscription>() => T;
}

export interface OfferConnection {
  pageInfo: PageInfo;
  edges: OfferEdge[];
}

export interface OfferConnectionPromise
  extends Promise<OfferConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<OfferEdge>>() => T;
  aggregate: <T = AggregateOfferPromise>() => T;
}

export interface OfferConnectionSubscription
  extends Promise<AsyncIterator<OfferConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<OfferEdgeSubscription>>>() => T;
  aggregate: <T = AggregateOfferSubscription>() => T;
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

export type Long = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "Item",
    embedded: false
  },
  {
    name: "Offer",
    embedded: false
  },
  {
    name: "OfferType",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const prisma: Prisma;
