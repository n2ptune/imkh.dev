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
