function defaultedArray<T>(array: T[], defaultValue: () => T) {
    return new Proxy(array, {
        get(target, p, receiver) {
            if (typeof p !== 'string' || isNaN(parseInt(p)) || p in target)
                return Reflect.get(target, p, receiver)
            
            const value = defaultValue()
            Reflect.set(target, p, value, receiver)
            return value
        },
    })
}

export { defaultedArray }
