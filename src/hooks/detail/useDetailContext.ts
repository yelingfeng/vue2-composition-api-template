import { InjectionKey } from '@vue/composition-api'
import { createContext, useContext } from '@/hooks/core/useContext'

/**
 * Detail界面页签5个属性
 */
export interface DetailContextProps {
  rowOption: Record<string, any>
}

const detailContextInjectKey: InjectionKey<DetailContextProps> = Symbol()

export function createDetailContext(context: DetailContextProps) {
  return createContext<DetailContextProps>(context, detailContextInjectKey)
}

export function useDetailContext() {
  return useContext<DetailContextProps>(detailContextInjectKey)
}
