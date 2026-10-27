import { BoardEntity } from './entity/BoardEntity';
import { FacetEntity } from './entity/FacetEntity';
import { HealthEntity } from './entity/HealthEntity';
import { JobEntity } from './entity/JobEntity';
import { JobPostingEntity } from './entity/JobPostingEntity';
import { OrganizationEntity } from './entity/OrganizationEntity';
export type * from './WorkforceIntelligenceTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { WorkforceIntelligenceEntityBase } from './WorkforceIntelligenceEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class WorkforceIntelligenceSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Board(entopts?: Record<string, any>): BoardEntity;
    Facet(entopts?: Record<string, any>): FacetEntity;
    Health(entopts?: Record<string, any>): HealthEntity;
    Job(entopts?: Record<string, any>): JobEntity;
    JobPosting(entopts?: Record<string, any>): JobPostingEntity;
    Organization(entopts?: Record<string, any>): OrganizationEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): WorkforceIntelligenceSDK;
    tester(testopts?: any, sdkopts?: any): WorkforceIntelligenceSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof WorkforceIntelligenceSDK;
export { stdutil, config, BaseFeature, WorkforceIntelligenceEntityBase, WorkforceIntelligenceSDK, SDK, };
export type { DirectResult };
