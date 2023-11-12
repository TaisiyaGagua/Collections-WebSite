interface Config {
    [key: string]: string;
}

export type getAllItemsResponse = {
    items: Config[];
};
