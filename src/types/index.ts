import { FileWithPath } from '@mantine/dropzone';
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

export type FacilityCreateParams = Omit<
  Data.Facility,
  | 'id'
  | 'facilityPaymentSetting'
  | 'facilityImages'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
> & {
  type: 'PerHour' | 'WholeDay';
  amount: string;
  downPayment?: string;
  images: FileWithPath[];
};

export type FacilityEditParams = FacilityCreateParams;

export type LeaseCreateParams = Omit<
  Data.Lease,
  | 'id'
  | 'property'
  | 'tenant'
  | 'leaseUtilityCharges'
  | 'leaseExtraCharges'
  | 'leasePayments'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
> & {
  leaseUtilityCharges: { id: number; amount: string }[];
  leaseExtraCharges: { id: number; amount: string }[];
};

export type LeaseEditParams = LeaseCreateParams;

export type ReservationCreateParams = Omit<
  Data.Reservation,
  | 'id'
  | 'facility'
  | 'tenant'
  | 'reservationPayments'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
>;

export type ReservationEditParams = ReservationCreateParams;

export type LeasePaymentCreateParams = Omit<
  Data.LeasePayment,
  | 'id'
  | 'lease'
  | 'user'
  | 'userId'
  | 'leasePaymentImages'
  | 'status'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
> & {
  images: FileWithPath[];
};

export type LeasePaymentEditParams = LeasePaymentCreateParams;

export type ReservationPaymentCreateParams = Omit<
  Data.ReservationPayment,
  | 'id'
  | 'reservation'
  | 'user'
  | 'userId'
  | 'reservationPaymentImages'
  | 'status'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
> & {
  images: FileWithPath[];
};

export type ReservationPaymentEditParams = ReservationPaymentCreateParams;

export type PaymentEditParams = Omit<
  Data.LeasePayment,
  | 'id'
  | 'amount'
  | 'lease'
  | 'leaseId'
  | 'user'
  | 'userId'
  | 'leasePaymentImages'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
>;

export type PollCreateParams = Omit<
  Data.Poll,
  'id' | 'pollChoices' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type PollEditParams = PollCreateParams;

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
