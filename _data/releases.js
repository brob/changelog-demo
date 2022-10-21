const { GraphQLClient, gql } = require('graphql-request');
require('dotenv').config();

module.exports = async () => {
    const client = new GraphQLClient(
      `${process.env.HYGRAPH_ENDPOINT}`
    );
  
    const query = gql`
    query Releases {
        releases {
            body
            slug
            title
            version
            pullRequestData {
              nodes {
                url
                title
                state
                permalink
                number
                deletions
                bodyText
                body
                additions
                commits(first: 10) {
                    totalCount
                    nodes {
                      url
                      commit {
                        messageBody
                        messageHeadline
                        author {
                          name
                        }
                      }
                    }
                  }
              }
            }
          }
      }
    `;
  
    const { releases } = await client.request(query);
  
    return releases;
  };