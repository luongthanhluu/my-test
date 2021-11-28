import React from 'react'
import { render } from 'enzyme'

import { PageLayout } from '../index'

test('Loading with false props', () => {
    const wrapper = render(
        <PageLayout title="title">
            <div></div>
        </PageLayout>
    )
    expect(wrapper).toMatchSnapshot()
})
