import {rtkApi} from "../../../../shared/api/rtkApi";
import {ITaskSliceSchema} from "../../../../entity/Task";

export interface StateSchema {
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    task: ITaskSliceSchema
}

export type StateSchemaKeys = keyof StateSchema;


