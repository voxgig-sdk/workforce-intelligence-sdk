import { WorkforceIntelligenceEntityBase } from '../WorkforceIntelligenceEntityBase';
import type { WorkforceIntelligenceSDK } from '../WorkforceIntelligenceSDK';
import type { Control } from '../types';
import type { Health, HealthLoadMatch } from '../WorkforceIntelligenceTypes';
declare class HealthEntity extends WorkforceIntelligenceEntityBase<Health> {
    constructor(client: WorkforceIntelligenceSDK, entopts: any);
    make(this: HealthEntity): HealthEntity;
    load(this: any, reqmatch?: HealthLoadMatch, ctrl?: Control): Promise<HealthEntity>;
}
export { HealthEntity };
