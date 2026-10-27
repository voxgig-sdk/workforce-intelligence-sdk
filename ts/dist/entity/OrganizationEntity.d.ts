import { WorkforceIntelligenceEntityBase } from '../WorkforceIntelligenceEntityBase';
import type { WorkforceIntelligenceSDK } from '../WorkforceIntelligenceSDK';
import type { Control } from '../types';
import type { Organization, OrganizationLoadMatch } from '../WorkforceIntelligenceTypes';
declare class OrganizationEntity extends WorkforceIntelligenceEntityBase<Organization> {
    constructor(client: WorkforceIntelligenceSDK, entopts: any);
    make(this: OrganizationEntity): OrganizationEntity;
    load(this: any, reqmatch?: OrganizationLoadMatch, ctrl?: Control): Promise<OrganizationEntity>;
}
export { OrganizationEntity };
