import React from 'react'
import { render } from 'enzyme'

import { Header } from '../index'

test('Header with title', () => {
    const wrapper = render(<Header title="title" />)
    expect(wrapper.text()).toEqual('title')
})
