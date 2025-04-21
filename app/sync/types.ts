import type { AssignmentModel, DependencyModel, EventModel, ResourceModel } from "@bryntum/scheduler";

export type LogType = 'event' | 'assignment';
export type ActionType = 'create' | 'update' | 'delete' | 'unassign' | 'assign';

export interface EventInfo {
    name?: string;
    startDate?: Date;
    endDate?: Date;
}

export interface AssignmentInfo {
    eventName?: string;
    resourceName?: string;
}

type CustomType = {
    $PhantomId: string;
    id?: number;
}

export type SyncResponse = {
    requestId : string,
    success: boolean,
    resources? : {
        rows? : CustomType[]
    },
    events?: {
        rows? : CustomType[]
    },
    assignments?: {
        rows? : CustomType[]
    },
    dependencies?: {
        rows? : CustomType[]
    } 
};

export type EventChange = {
    added? : EventModel[],
    updated? : EventModel[],
    removed? : EventModel[]
};

export type DependencyChange = {
    added? : DependencyModel[],
    updated? : DependencyModel[],
    removed? : DependencyModel[]
};

export type AssignmentChange = {
    added? : AssignmentModel[],
    updated? : AssignmentModel[],
    removed? : AssignmentModel[]
};

export type ResourceChange = {
    added? : ResourceModel[],
    updated? : ResourceModel[],
    removed? : ResourceModel[]
};

export type TableChangeType = 
    ResourceChange | 
    EventChange | 
    AssignmentChange | 
    DependencyChange;

export type OperationType = ResourceModel[] | EventModel[] | AssignmentModel[] | DependencyModel[];

export type CustomModel = (ResourceModel | EventModel | AssignmentModel | ResourceModel) & { $PhantomId : string }

