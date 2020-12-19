import { computed } from "vue";

export function useModelWrapper(_, emit, name = "value") {
    return computed({
        get: () => _.value,
        set: (value) => emit(`update:${name}`, value),
    });
}