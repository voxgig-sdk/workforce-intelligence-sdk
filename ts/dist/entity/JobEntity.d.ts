import { WorkforceIntelligenceEntityBase } from '../WorkforceIntelligenceEntityBase';
import type { WorkforceIntelligenceSDK } from '../WorkforceIntelligenceSDK';
import type { Control } from '../types';
import type { Job, JobLoadMatch, JobListMatch } from '../WorkforceIntelligenceTypes';
declare class JobEntity extends WorkforceIntelligenceEntityBase<Job> {
    constructor(client: WorkforceIntelligenceSDK, entopts: any);
    make(this: JobEntity): JobEntity;
    load(this: any, reqmatch?: JobLoadMatch, ctrl?: Control): Promise<JobEntity>;
    list(this: any, reqmatch?: JobListMatch, ctrl?: Control): Promise<JobEntity[]>;
}
export { JobEntity };
