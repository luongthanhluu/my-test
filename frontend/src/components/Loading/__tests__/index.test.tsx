import React from 'react'
import { render } from 'enzyme'

import { Loading } from '../index'

test('Loading with false props', () => {
    const wrapper = render(<Loading loading={false} />)
    expect(wrapper).toMatchSnapshot()
})

test('Loading with true props', () => {
    const wrapper = render(<Loading loading={true} />)
    expect(wrapper).toMatchSnapshot()
})
