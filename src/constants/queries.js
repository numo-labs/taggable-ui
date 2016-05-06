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
query tagSuggest ($text: String, $size: Int) {
  taggable {
    suggest(text: $text, size: $size) {
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
