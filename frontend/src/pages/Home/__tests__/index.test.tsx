import React from 'react'
import { render } from 'enzyme'
import { Provider } from 'react-redux'

import { store } from 'store'
import { HomeComponent } from '../index'
import { repoMock } from '../../../__fixtures__/repo'

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: jest.fn(),
}))

test('should match snapshot with data', () => {
    const wrapper = render(
        <Provider store={store}>
            <HomeComponent loading={false} data={repoMock} errorMessage="" />
        </Provider>
    )
    expect(wrapper).toMatchSnapshot()
})

test('should match snapshot with error message', () => {
    const wrapper = render(
        <Provider store={store}>
            <HomeComponent
                loading={false}
                data={repoMock}
                errorMessage="error message"
            />
        </Provider>
    )
    expect(wrapper).toMatchSnapshot()
})

test('should match snapshot with loading', () => {
    const wrapper = render(
        <Provider store={store}>
            <HomeComponent
                loading={false}
                data={repoMock}
                errorMessage="error message"
            />
        </Provider>
    )
    expect(wrapper).toMatchSnapshot()
})
