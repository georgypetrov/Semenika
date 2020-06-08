export const Utils = {
    filterNames( payload ) {
        return payload ? payload.map(obj => obj.name) : [];
    }
}