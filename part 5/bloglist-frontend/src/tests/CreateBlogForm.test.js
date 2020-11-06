import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlogForm from '../components/CreateBlogForm'

describe('<CreateBlogForm />', () => {
    test('after sending a new blog handler should be called on correct data', () => {
        let mockHandler = jest.fn()
        let component = render(
            <CreateBlogForm createBlog={mockHandler} />
        )
        const input = component.container.querySelectorAll('input')
        const form = component.container.querySelector('form')
        fireEvent.change(input[0], {
            target: { value: 'T' }
        })
        fireEvent.change(input[1], {
            target: { value: 'A' }
        })
        fireEvent.change(input[2], {
            target: { value: 'L' }
        })
        fireEvent.submit(form)

        expect(mockHandler.mock.calls).toHaveLength(1)
        expect(mockHandler.mock.calls[0][0].title).toBe('T')
        expect(mockHandler.mock.calls[0][0].author).toBe('A')
        expect(mockHandler.mock.calls[0][0].url).toBe('L')
    })
})