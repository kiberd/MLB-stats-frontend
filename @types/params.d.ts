declare module "params" {
    export interface SearchPlayersParams {
        name: string | undefined,
        resultSize: number,
        startingIndex: number
      };
}