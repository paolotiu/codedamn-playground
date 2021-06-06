export type InterfaceSchema<T> = Omit<Record<keyof T, any>, 'id'>;
