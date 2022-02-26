// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'

import {render, fireEvent} from '@testing-library/svelte'

import Comp from '../../src/components/devtool-tabs.svelte'
import {devtoolStore} from "../../src/stores/devtool.store";

beforeAll(()=>{
    devtoolStore.set({
        tabs: ["a", "b"],
        activeTab: "b"
    })
})

test('expect tabs to be rendered with proper active class', () => {
    const {getByText} = render(Comp)

    const tabA = getByText('a')
    const tabB = getByText('b')
    expect(tabA).not.toHaveClass("active")
    expect(tabB).toHaveClass("active")
    expect(tabA).toBeInTheDocument()
    expect(tabB).toBeInTheDocument()
})

// Note: This is as an async test as we are using `fireEvent`
test('expect active to change after click on tab', async () => {
    const {getByText} = render(Comp, {name: 'World'})
    const tabA = getByText('a')
    const tabB = getByText('b')

    // Using await when firing events is unique to the svelte testing library because
    // we have to wait for the next `tick` so that Svelte flushes all pending state changes.
    await fireEvent.click(tabA)

    expect(tabA).toHaveClass("active")
    expect(tabB).not.toHaveClass("active")
})
