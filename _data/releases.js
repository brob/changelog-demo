const EleventyFetch = require("@11ty/eleventy-fetch");

require('dotenv').config();

module.exports = async () => {

    const query = `
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
    try {
      const { data } = await EleventyFetch(process.env.HYGRAPH_ENDPOINT, {
        
        fetchOptions: {
          body: JSON.stringify({ query }),
          method: "POST",
        },
        duration: '5m',
        type: 'json',
        verbose: true 
      })

      return data.releases;
    } catch (error) {
      console.log(error);
    }

  };