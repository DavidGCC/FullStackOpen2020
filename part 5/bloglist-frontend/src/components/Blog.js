import React from 'react'
const Blog = ({ blog }) => (
  <div>
    <b>{blog.title}</b> by <b>{blog.author}</b>
  </div>
)

export default Blog
