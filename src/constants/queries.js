export const QUERY_SEARCH_TAG = `
query tagQuery ($tagid: String) {
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
