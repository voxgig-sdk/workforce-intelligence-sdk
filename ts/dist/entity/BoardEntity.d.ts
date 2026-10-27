import { WorkforceIntelligenceEntityBase } from '../WorkforceIntelligenceEntityBase';
import type { WorkforceIntelligenceSDK } from '../WorkforceIntelligenceSDK';
import type { Control } from '../types';
import type { Board, BoardListMatch } from '../WorkforceIntelligenceTypes';
declare class BoardEntity extends WorkforceIntelligenceEntityBase<Board> {
    constructor(client: WorkforceIntelligenceSDK, entopts: any);
    make(this: BoardEntity): BoardEntity;
    list(this: any, reqmatch?: BoardListMatch, ctrl?: Control): Promise<BoardEntity[]>;
}
export { BoardEntity };
