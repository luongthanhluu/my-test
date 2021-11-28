import { Card } from './card'

export interface RepoItem {
    id: string
    title: string
    cards: Card[]
}

export interface Repo {
    id?: string
    name: string
    lists?: RepoItem[]
}

export enum ListStatus {
    Open = 'Open',
    Confirmed = 'Confirmed',
    FalsePositive = 'False Positive',
    Fixed = 'Fixed',
}
