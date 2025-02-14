function defaultedArray<T>(array: T[], defaultValue: () => T) {
    return new Proxy(array, {
        get(target, p, receiver) {
            if (typeof p === 'string' && !isNaN(parseInt(p)) && !(p in target)) {
                target[p as unknown as number] = defaultValue()
                console.log('Success')
            }
            return Reflect.get(target, p, receiver)
        },
    })
}

export { defaultedArray }
