import {
  DefaultError,
  DefinedUseBaseQueryResult,
  DefinedUseQueryResult,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import { createQueryKeys } from './key'

type UndefinedInitialDataOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & {
  initialData?: undefined
}
type DefinedInitialDataOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & {
  initialData: TQueryFnData | (() => TQueryFnData)
}
type DefinedInitialDataResult<TData, TError> = DefinedUseQueryResult<TData, TError>

type Configs<
  TVariables = unknown,
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey'> & {
  queryKey(arg: TVariables): TQueryKey
}

function createQuery<
  TVariables,
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  configs: Configs<TVariables, TQueryFnData, TError, TData, TQueryKey>,
): unknown extends TVariables
  ? (
      options?: Omit<UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>,
    ) => UseQueryResult<TData, TError>
  : (
      options: Omit<UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'> & {
        variables: TVariables
      },
    ) => UseQueryResult<TData, TError>
function createQuery<
  TVariables,
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  configs: Configs<TVariables, TQueryFnData, TError, TData, TQueryKey>,
): unknown extends TVariables
  ? (
      options?: Omit<DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>,
    ) => DefinedUseBaseQueryResult<TData, TError>
  : (
      options: Omit<DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'> & {
        variables: TVariables
      },
    ) => DefinedInitialDataResult<TData, TError>
function createQuery({ queryKey, ...configs }: any) {
  return (options: any) => {
    const key = queryKey(options.variables)
    return useQuery({
      ...configs,
      ...options,
      queryKey: key,
      queryFn: configs.queryFn,
    })
  }
}

const keys = createQueryKeys('user', {
  me(variables: { id: number }) {
    return [variables] as const
  },
})

const useAQuery = createQuery({
  queryKey: keys.me,
  queryFn: async ({ queryKey }) => {
    const [_, , variables] = queryKey
    return {
      id: variables.id,
      firstName: '123',
      lastName: '321',
    }
  },
})

const useBQuery = createQuery({
  queryKey: () => ['user'] as const,
  queryFn() {
    return ['user']
  },
})

function createThing() {
  const hook = ({ variables }: any) => {
    const key = () => ['user', variables] as const
    return ['user', variables]
  }
  hook.key = key
  return hook
}

export const useThing = createThing({ variables: { id: 1 } })

const TestA = {
  useAQuery,
}

function Test() {
  TestA.useAQuery({
    variables: { id: 2 },
  })
  useBQuery()
}
