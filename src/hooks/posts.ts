import { useStaticQuery, graphql } from 'gatsby'

export const useAllPosts = () => {
  const query = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            id
            frontmatter {
              cover_image {
                publicURL
                childImageSharp {
                  gatsbyImageData(formats: [AUTO], placeholder: DOMINANT_COLOR)
                }
              }
              tags
              title
              published
              description
              date
            }
            timeToRead
            excerpt(pruneLength: 70, truncate: true)
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  return { posts: query.allMarkdownRemark.edges.map(edge => edge.node) }
}

export const useTimeToReadToText = (timeToRead: string | number) => {
  if (typeof timeToRead === 'string') {
    timeToRead = parseInt(timeToRead)
  }

  const template = (n: number, emoji: string) => `읽는 데 ${n}분 걸림 ${emoji}`

  if (1 <= timeToRead && timeToRead <= 3) {
    return template(timeToRead, '☕')
  } else if (3 < timeToRead && timeToRead <= 5) {
    return template(timeToRead, '🔥')
  } else {
    return template(timeToRead, '📰')
  }
}

export const usePostWithSlug: (s: string) => object = slug => {
  // const query = useStaticQuery(
  //   graphql`
  //     query getPost {
  //       markdownRemark(fields: { slug: { eq: $slug } }) {
  //         id
  //         tableOfContents(absolute: false, heading: "", maxDepth: 10)
  //         timeToRead
  //         html
  //         frontmatter {
  //           date
  //           description
  //           published
  //           tags
  //           title
  //         }
  //         fields {
  //           slug
  //         }
  //       }
  //     }
  //   `
  // )

  return {}
}
