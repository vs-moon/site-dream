import { VSFetch } from '@vs-common/utils/fetch/index.js'

export class VSFetchNSSSO extends VSFetch {
  constructor(config = { baseUrl: import.meta.env.VITE_API_NS_SSO_ADMIN }) {
    super(config)
  }
}

export const useRequest = Reflect.construct(VSFetchNSSSO, [])