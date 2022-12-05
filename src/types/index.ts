import { TablerIcon } from '@tabler/icons';

export type MenuItem = {
  name: string;
  path: string;
  icon: TablerIcon;
  children?: MenuItem[];
};

export type PaginationMeta = {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
};

export type Paginated<T> = {
  data: T[];
  meta: PaginationMeta;
};

// services params

export type PaginateParams = {
  take: number;
  page: number;
  search?: string;
};

export type ExtraChargeCreateParams = Omit<
  Data.ExtraCharge,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type ExtraChargeEditParams = ExtraChargeCreateParams;

export type PollCreateParams = Omit<
  Data.Poll,
  'id' | 'pollChoices' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type PropertyCreateParams = Omit<
  Data.Property,
  | 'id'
  | 'propertyLocationBlock'
  | 'propertyLocationPhase'
  | 'propertyType'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
>;

export type PropertySettingsCreateParams = Omit<
  Data.PropertySettings,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type PropertySettingsEditParams = PropertySettingsCreateParams;

export type PropertyEditParams = PropertyCreateParams;

export type UtilityCreateParams = Omit<
  Data.Utility,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type UtilityEditParams = UtilityCreateParams;

export type AnnouncementCreateParams = Omit<
  Data.Announcement,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type AnnouncementEditParams = AnnouncementCreateParams;

export type UserCreateParams = Omit<
  Data.User,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type UserEditParams = UserCreateParams;
