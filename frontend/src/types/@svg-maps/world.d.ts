declare module '@svg-maps/world' {
    declare interface Worldmap {
        label: string;
        viewBox: string;
        locations: {
            name: string;
            id: string;
            path: string;
        }[];
    }
    declare const world: Worldmap;
    export default world;
}
