export const QUERY_SEARCH_TAG = `
query ($tagid: String) {
  taggable {
    search(id: $tagid) {
      _id,
      displayName,
      location {
        lat,
        lon
      },
      metadata {
        values,
        key
      },
      markets,
      tags {
      	node,
        displayName,
        active,
        source
      },
      description,
      content {
        url,
        market,
        language,
        sections {
          text,
          title,
          image
        }
      },
      links {
        incoming {
          node {
            labels,
            properties {
              name,
              id
            }
          }
          relationship {
            type,
            properties {
              active,
              type
            }
          }
        },
        outgoing {
          node {
            labels,
            properties {
              name,
              id
            }
          }
          relationship {
            type,
            properties {
              active,
              type
            }
          }
        }
      }
    }
  }
}
`;

export const QUERY_SUGGEST_TAGS = `
query tagSuggest ($text: String, $size: Int, $start: Int) {
  taggable {
    suggest(text: $text, size: $size, start: $start) {
      total,
      items {
        tagid,
        active,
        label,
        name,
        context,
        boost
      }
    }
  }
}
`;
