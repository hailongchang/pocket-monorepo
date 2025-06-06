import { PocketEventType } from './events.ts';
import {
  ForgotPasswordRequest,
  AccountDelete,
  AccountEmailUpdated,
  AccountPasswordChanged,
  PremiumPurchaseEvent,
  AccountRegistration,
  ExportReady,
  AddItem,
  ExportRequested,
  DeleteItem,
  FavoriteItem,
  UnfavoriteItem,
  ArchiveItem,
  UnarchiveItem,
  AddTags,
  ReplaceTags,
  ClearTags,
  RemoveTags,
  RenameTag,
  DeleteTag,
  UpdateTitle,
  ShareableListItemEvent,
  ShareableListEvent,
  ShareableListCreated,
  ShareableListDeleted,
  ShareableListHidden,
  ShareableListUnhidden,
  ShareableListUpdated,
  ShareableListPublished,
  ShareableListUnpublished,
  ShareableListItemCreated,
  ShareableListItemDeleted,
  ShareableListItemUpdated,
  ListEvent,
  ShareEvent,
  ShareCreated,
  ShareContextUpdated,
  AccountEvent,
  SearchEvent,
  SearchResponseGenerated,
  CorpusItemAdded,
  CorpusItemUpdated,
  CorpusItemRemoved,
  CorpusEvent,
  CollectionEvent,
  CollectionCreated,
  CollectionUpdated,
  ProspectDismissed,
  IncomingBaseEvent,
  ExportPartComplete,
} from './types/index.ts';
import { ProspectEvent } from './types/prospect.ts';
export * from './types/index.ts';
export * from './events.ts';

export type PocketEvent =
  | ForgotPasswordRequest
  | AccountEvent
  | ExportReady
  | ExportRequested
  | ExportPartComplete
  | PremiumPurchaseEvent
  | ListEvent
  | ShareableListEvent
  | ShareableListItemEvent
  | ShareEvent
  | SearchEvent
  | CorpusEvent
  | ProspectEvent
  | CollectionEvent;

export type IncomingPocketEvent = PocketEvent & IncomingBaseEvent;

export type PocketEventTypeMap = {
  [PocketEventType.FORGOT_PASSWORD]: ForgotPasswordRequest;
  [PocketEventType.ACCOUNT_DELETION]: AccountDelete;
  [PocketEventType.ACCOUNT_EMAIL_UPDATED]: AccountEmailUpdated;
  [PocketEventType.ACCOUNT_REGISTRATION]: AccountRegistration;
  [PocketEventType.ACCOUNT_PASSWORD_CHANGED]: AccountPasswordChanged;
  [PocketEventType.PREMIUM_PURCHASE]: PremiumPurchaseEvent;
  [PocketEventType.EXPORT_READY]: ExportReady;
  [PocketEventType.EXPORT_REQUESTED]: ExportRequested;
  [PocketEventType.EXPORT_PART_COMPLETE]: ExportPartComplete;
  [PocketEventType.ADD_ITEM]: AddItem;
  [PocketEventType.DELETE_ITEM]: DeleteItem;
  [PocketEventType.FAVORITE_ITEM]: FavoriteItem;
  [PocketEventType.UNFAVORITE_ITEM]: UnfavoriteItem;
  [PocketEventType.ARCHIVE_ITEM]: ArchiveItem;
  [PocketEventType.UNARCHIVE_ITEM]: UnarchiveItem;
  [PocketEventType.ADD_TAGS]: AddTags;
  [PocketEventType.REPLACE_TAGS]: ReplaceTags;
  [PocketEventType.CLEAR_TAGS]: ClearTags;
  [PocketEventType.REMOVE_TAGS]: RemoveTags;
  [PocketEventType.RENAME_TAG]: RenameTag;
  [PocketEventType.DELETE_TAG]: DeleteTag;
  [PocketEventType.UPDATE_TITLE]: UpdateTitle;
  [PocketEventType.SHAREABLE_LIST_CREATED]: ShareableListCreated;
  [PocketEventType.SHAREABLE_LIST_DELETED]: ShareableListDeleted;
  [PocketEventType.SHAREABLE_LIST_UPDATED]: ShareableListUpdated;
  [PocketEventType.SHAREABLE_LIST_HIDDEN]: ShareableListHidden;
  [PocketEventType.SHAREABLE_LIST_UNHIDDEN]: ShareableListUnhidden;
  [PocketEventType.SHAREABLE_LIST_PUBLISHED]: ShareableListPublished;
  [PocketEventType.SHAREABLE_LIST_UNPUBLISHED]: ShareableListUnpublished;
  [PocketEventType.SHAREABLE_LIST_ITEM_CREATED]: ShareableListItemCreated;
  [PocketEventType.SHAREABLE_LIST_ITEM_DELETED]: ShareableListItemDeleted;
  [PocketEventType.SHAREABLE_LIST_ITEM_UPDATED]: ShareableListItemUpdated;
  [PocketEventType.SHARE_CREATED]: ShareCreated;
  [PocketEventType.SHARE_CONTEXT_UPDATED]: ShareContextUpdated;
  [PocketEventType.SEARCH_RESPONSE_GENERATED]: SearchResponseGenerated;
  [PocketEventType.CORPUS_ITEM_ADDED]: CorpusItemAdded;
  [PocketEventType.CORPUS_ITEM_UPDATED]: CorpusItemUpdated;
  [PocketEventType.CORPUS_ITEM_REMOVED]: CorpusItemRemoved;
  [PocketEventType.COLLECTION_CREATED]: CollectionCreated;
  [PocketEventType.COLLECTION_UPDATED]: CollectionUpdated;
  [PocketEventType.PROSPECT_DISMISSED]: ProspectDismissed;
};
