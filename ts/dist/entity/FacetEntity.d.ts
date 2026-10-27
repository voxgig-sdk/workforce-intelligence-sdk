import { WorkforceIntelligenceEntityBase } from '../WorkforceIntelligenceEntityBase';
import type { WorkforceIntelligenceSDK } from '../WorkforceIntelligenceSDK';
import type { Control } from '../types';
import type { Facet, FacetLoadMatch } from '../WorkforceIntelligenceTypes';
declare class FacetEntity extends WorkforceIntelligenceEntityBase<Facet> {
    constructor(client: WorkforceIntelligenceSDK, entopts: any);
    make(this: FacetEntity): FacetEntity;
    load(this: any, reqmatch?: FacetLoadMatch, ctrl?: Control): Promise<FacetEntity>;
}
export { FacetEntity };
