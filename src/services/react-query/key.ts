type CreateQueryKeysResult<TRoot, TFns extends Record<string, <TArgs extends Array<any>>(...args: TArgs) => any>> = {
  all(): [TRoot]
} & {
  [TKey in keyof TFns]: {
    all(): [TRoot, TKey]
  } & (<TArgs extends Parameters<TFns[TKey]>, TResult extends ReturnType<TFns[TKey]>>(
    ...args: TArgs
  ) => [TRoot, TKey, ...TResult])
}

const ALL_KEY = 'all'

export function createQueryKeys<TRoot extends string, TFns extends Record<string, (...args: any[]) => any>>(
  root: TRoot,
  fns?: TFns,
): CreateQueryKeysResult<TRoot, TFns> {
  const handlers = {}
  for (const [scope, fn] of Object.entries(fns || {})) {
    if (scope === ALL_KEY) {
      throw new Error(`"${ALL_KEY}" is a key reserved for the "createQueryKeys" function`)
    }
    const handler = <TArgs extends any[]>(...args: TArgs) => {
      return [root, scope].concat(fn(...args))
    }
    Object.defineProperty(handler, ALL_KEY, {
      value: () => [root, scope],
      writable: false,
    })
    Object.defineProperty(handlers, scope, { value: handler, writable: false })
  }
  return Object.assign(handlers, {
    [ALL_KEY]: () => {
      return [root] as const
    },
  }) as CreateQueryKeysResult<TRoot, TFns>
}

export function createQueryKeysV2(root: string, configs: Record<string, any> = {}) {
  const handlers = {}

  for (const [scope, { queryKey: key, queryFn }] of Object.entries(configs)) {
    if (scope === ALL_KEY) {
      throw new Error(`"${ALL_KEY}" is a key reserved for the "createQueryKeys" function`)
    }
    const queryKey = (...args: any[]) => {
      return [root, scope, ...key(...args)]
    }
    queryKey[ALL_KEY] = () => [root, scope]
    return {
      ...handlers,
      [scope]: {
        queryKey,
        queryFn,
      },
      [ALL_KEY]: () => [root],
    }
  }
  return handlers
}
