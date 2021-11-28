import React from 'react'
import { render } from 'enzyme'
import { Provider } from 'react-redux'

import { store } from 'store'
import { BoardItem } from '../BoardItem'
import { repoMock } from '../../../__fixtures__/repo'

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: jest.fn(),
}))

test('should match snapshot with data', () => {
    const wrapper = render(
        <Provider store={store}>
            <BoardItem item={repoMock[0].lists[0]} />
        </Provider>
    )
    expect(wrapper).toMatchSnapshot()
})
