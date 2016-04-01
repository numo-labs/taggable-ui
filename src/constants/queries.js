export const QUERY_SEARCH_TAGS = `
query tagQuery($id: String) {
	taggable(id: $id) {
    _id,
    displayName,
    tags {
      tagId,
      tagType,
      source,
      active
    }
    metadata {
      key,
      value
    }
  }
}
`;

export const MUTATION_CREATE_TAG = `
mutation createTag($id: String, $displayName: String, $tags: [TagInputItem], $metadata: [MetaDataInputItem]) {
	taggable {
    tagData(_id: $id, displayName: $displayName, tags: $tags, metadata: $metadata) {
      _id,
      displayName,
      tags {
        tagId,
        tagType,
        source,
        active
      }
      metadata {
        key,
        value
      }
    }
  }
}
`;
