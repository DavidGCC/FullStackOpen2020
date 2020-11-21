import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import TogglableBlog from '../components/TogglableBlog'
import FullBlog from '../components/FullBlog'

describe('<TogglableBlog />', () => {
    let component
    beforeEach(() => {
        const blog = {
            'title': 'A',
            'author': 'B',
            'likes': 0,
            'url': 'T',
            'user': {
                'name': 'DD'
            }
        }
        component = render(
            <TogglableBlog title='A' author='B' defaultButtonText='C' hiddenButtonText='D'>
                <FullBlog blog={blog} />
            </TogglableBlog>
        )
    })

    test('should render given children', () => {
        expect(component.container.querySelector('.fullBlog')).toBeDefined()
    })
    test('should only render title and author by default', () => {
        expect(component.container.querySelector('.togglableContent')).toHaveStyle('display: none')
    })
    test('should show togglable content after clicking show button', () => {
        const button = component.getByText('C')
        fireEvent.click(button)
        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

    test('url and likes are shown after clicking show button', () => {
        const button = component.getByText('C')
        fireEvent.click(button)
        const url = component.getByText('URL:')
        const likes = component.getByText('Likes:')
        expect(url).toBeDefined()
        expect(likes).toBeDefined()

    })
})