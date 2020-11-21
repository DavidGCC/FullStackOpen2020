import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import FullBlog from '../components/FullBlog'

describe('<FullBlog />', () => {
    test('after clicking like button twice handler should be called twice', () => {
        const blog = {
            'title': 'A',
            'author': 'B',
            'likes': 0,
            'url': 'T',
            'user': {
                'name': 'DD'
            }
        }
        let mockHandler = jest.fn()
        let component = render(
            <FullBlog blog={blog} handleLike={mockHandler} />
        )
        const button = component.container.querySelector('.likeButton')
        fireEvent.click(button)
        fireEvent.click(button)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})