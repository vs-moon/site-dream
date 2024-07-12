import { VSFetch } from '@vs-common/utils/fetch/index.js'

export class VSFetchNSSOURCE extends VSFetch {
  constructor(config = { baseUrl: import.meta.env.VITE_API_NS_RESOURCE }) {
    super(config)
  }
}

export const useRequest = Reflect.construct(VSFetchNSSOURCE, [])