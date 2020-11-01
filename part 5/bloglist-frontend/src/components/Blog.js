import React from 'react'
const Blog = ({ blog }) => (
  <div style={{fontSize: '1.5rem', fontFamily: 'sans-serif'}}>
    <p><b>{blog.title}</b> by <b>{blog.author}</b></p>
  </div>
)

export default Blog
