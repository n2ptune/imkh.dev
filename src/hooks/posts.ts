import { useStaticQuery, graphql } from 'gatsby'

export const useAllPosts = () => {
  const query = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
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
            excerpt
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
