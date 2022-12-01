declare namespace Data {
  type Action = 'Create' | 'View' | 'Edit' | 'Delete';

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

  type PropertySettings = {
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
    role: 'Admin' | 'Tenant';
  };
}
