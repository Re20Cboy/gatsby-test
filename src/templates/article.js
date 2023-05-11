import React from 'react'
import { graphql } from 'gatsby'

export default function Article({ data }) {
  const { title, body } = data.sanityArticle

  function renderBlock(block) {
    switch (block._type) {
      case 'block':
        return <p>{block.children[0].text}</p>
      case 'image':
        return (
          <img
            src={block.asset.url}
            alt={block.alt}
            style={{ maxWidth: '100%' }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div>
      <h1>{title}</h1>
      {body.map((block) => renderBlock(block))}
    </div>
  )
}

export const query = graphql`
  query ($slug: String!) {
    sanityArticle(slug: { current: { eq: $slug } }) {
      title
      body {
        _key
        _type
        children {
          text
        }
        asset {
          url
        }
        alt
      }
    }
  }
`
