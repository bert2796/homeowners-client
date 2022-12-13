declare namespace Data {
  type Action =
    | 'Create'
    | 'View'
    | 'View Payment'
    | 'Edit'
    | 'Delete'
    | 'Pay'
    | 'Approve Payment'
    | 'Reject Payment';

  type Base = {
    createdAt: string;
    updatedAt: string;
  };

  type Announcement = Base & {
    id: number;
    title: string;
    description: string;
    location?: string;
    startDate?: string;
    endDate?: string;
  };

  type Facility = Base & {
    id: number;
    name: string;
    description: string;
    facilityPaymentSetting: FacilityPaymentSetting;
    facilityImages: FacilityImage[];
  };

  type FacilityPaymentSetting = Base & {
    id: number;
    type: 'PerHour' | 'WholeDay';
    amount: string;
    downPayment?: string;
  };

  type FacilityImage = Base & {
    id: number;
    url: string;
  };

  type Lease = Base & {
    id: number;
    property: Property;
    tenant: User;
    leaseUtilityCharges: UtilityCharge[];
    leaseExtraCharges: LeaseExtraCharge[];
    leasePayments: LeasePayment[];
    propertyId: number;
    tenantId: number;
    rentalAmount?: string;
    totalAmount: string;
    date: string;
    type?: string;
  };

  type LeaseUtilityCharge = Base & {
    id: number;
    lease: Lease;
    utility: Utility;
    leaseId: number;
    utilityId: number;
    amount?: string;
  };

  type LeaseExtraCharge = Base & {
    id: number;
    lease: Lease;
    extra: ExtraCharge;
    leaseId: number;
    extraId: number;
    amount?: string;
  };

  type LeasePayment = Base & {
    id: number;
    lease: Lease;
    leaseId: number;
    user: User;
    userId: number;
    leasePaymentImages: LeasePaymentImage[];
    status: 'Approved' | 'Rejected' | 'Pending';
    reason?: string;
    otherReason?: string;
    otherReasonDetails?: string;
    amount: string;
  };

  type LeasePaymentImage = Base & {
    url: string;
  };

  type Reservation = Base & {
    id: number;
    facility: Facility;
    tenant: User;
    reservationPayments: ReservationPayment[];
    facilityId: number;
    tenantId: number;
    totalAmount: string;
    startDate: string;
    endDate: string;
  };

  type ReservationPayment = Base & {
    id: number;
    reservation: Reservation;
    reservationId: number;
    user: User;
    userId: number;
    reservationPaymentImages: ReservationPaymentImage[];
    status: 'Approved' | 'Rejected' | 'Pending';
    reason?: string;
    otherReason?: string;
    otherReasonDetails?: string;
    amount: string;
  };

  type ReservationPaymentImage = Base & {
    url: string;
  };

  type Payment = Base & {
    id: number;
    date: string;
    type: string;
    user: User;
    amount: string;
    status: 'Approved' | 'Rejected' | 'Pending';
    paymentType: 'lease' | 'reservation';
    images: LeasePaymentImage[];
  };

  type Poll = Base & {
    id: number;
    title: string;
    description: string;
    startDate?: string;
    endDate?: string;
    choices?: string[];
    pollChoices?: PollChoice[];
  };

  type PollChoice = Base & {
    id: number;
    option: string;
  };

  type PropertySettings = {
    id: number;
    name: string;
    display: string;
    description?: string;
  };

  type Utility = {
    id: number;
    name: string;
    display: string;
    description?: string;
  };

  type ExtraCharge = {
    id: number;
    name: string;
    display: string;
    description?: string;
  };

  type Property = Base & {
    id: number;
    name: string;
    code: string;
    amount: string;
    description?: string;
    location: string;
    bathrooms: number;
    bedrooms: number;
    propertyLocationBlockId: number;
    propertyLocationPhaseId: number;
    propertyTypeId: number;
    propertyLocationBlock: PropertySettings;
    propertyLocationPhase: PropertySettings;
    propertyType: PropertySettings;
  };

  type User = Base & {
    id: number;
    email: string;
    username: string;
    firstName: string;
    middleName: string;
    lastName: string;
    password?: string;
    role: 'Admin' | 'Tenant' | 'Staff';
  };
}
