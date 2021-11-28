import { Repo } from 'models/repo'

export const repoMock: Repo[] = [
    {
        name: 'Repo 1',
        id: '1',
        lists: [
            { title: 'Open', cards: [], id: 'a' },
            {
                title: 'Confirmed',
                cards: [
                    { text: 'Vulnerability 3', id: 'y' },
                    { text: 'Vulnerability 4', id: 'z' },
                ],
                id: 'b',
            },
            {
                title: 'False Positive',
                cards: [
                    { text: 'Vulnerability 5', id: 'm' },
                    { text: 'Vulnerability 6', id: 'n' },
                ],
                id: 'c',
            },
            {
                title: 'Fixed',
                cards: [
                    { text: 'Vulnerability 7', id: 'o' },
                    { text: 'Vulnerability 8', id: 'p' },
                    {
                        text: 'Vulnerability 1',
                        id: 'w',
                        activities: [
                            {
                                createdAt: '2021-11-28T11:24:05.600Z',
                                description: 'moved from Open to Confirmed',
                            },
                            {
                                createdAt: '2021-11-28T11:24:24.903Z',
                                description: 'moved from Confirmed to Fixed',
                            },
                        ],
                    },
                ],
                id: 'd',
            },
        ],
    },
]
