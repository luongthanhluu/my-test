export interface CardActivity {
    createdAt: string
    description: string
}

export interface Card {
    text: string
    id?: string
    note?: string
    activities?: CardActivity[]
}
