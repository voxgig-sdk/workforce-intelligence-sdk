import { WorkforceIntelligenceEntityBase } from '../WorkforceIntelligenceEntityBase';
import type { WorkforceIntelligenceSDK } from '../WorkforceIntelligenceSDK';
import type { Control } from '../types';
import type { JobPosting, JobPostingListMatch } from '../WorkforceIntelligenceTypes';
declare class JobPostingEntity extends WorkforceIntelligenceEntityBase<JobPosting> {
    constructor(client: WorkforceIntelligenceSDK, entopts: any);
    make(this: JobPostingEntity): JobPostingEntity;
    list(this: any, reqmatch?: JobPostingListMatch, ctrl?: Control): Promise<JobPostingEntity[]>;
}
export { JobPostingEntity };
