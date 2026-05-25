import { useLoading } from '../composables/useLoading';

let _loading: ReturnType<typeof useLoading> | null = null;

function getLoading() {
  if (!_loading) _loading = useLoading();

  return _loading;
}

export const loading = {
  show: (message?: string) => getLoading().show(message),
  hide: () => getLoading().hide(),
};

/** Returns the singleton loading instance refs for template binding */
export function useLoadingRefs() {
  return getLoading();
}
