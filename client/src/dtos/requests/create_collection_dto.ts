export type CreateCollectionDto = {
    user_id: string | null;
    name: string;
    description: string;
    config?: string;
};
