import { BaseDto } from "../base_dto";

export type collectionDTO = BaseDto & {
    name: string;
    config: string;
    description: string;
};
