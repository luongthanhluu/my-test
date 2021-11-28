// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import 'jest-enzyme'
import { configure, render } from 'enzyme'
import enableHooks from 'jest-react-hooks-shallow'
import Adapter from 'enzyme-adapter-react-16'
import { createElement, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

enableHooks(jest)
configure({ adapter: new Adapter() })

const ReduxProvider = ({ children }) => {
    return createElement(
        Provider,
        {
            store,
        },
        children
    )
}

export function renderWithProvider<P, S>(
    tree: ReactElement<P>,
    options: any
): cheerio.Cheerio {
    return render(createElement(ReduxProvider, { children: tree }), options)
}
