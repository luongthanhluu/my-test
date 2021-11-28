import React from 'react'
import { render } from 'enzyme'
import { Provider } from 'react-redux'

import { store } from 'store'
import { RepoItem } from '../RepoItem'
import { repoMock } from '../../../__fixtures__/repo'

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: jest.fn(),
}))

test('should match snapshot with data', () => {
    const wrapper = render(
        <Provider store={store}>
            <RepoItem item={repoMock[0]} />
        </Provider>
    )
    expect(wrapper).toMatchSnapshot()
})
