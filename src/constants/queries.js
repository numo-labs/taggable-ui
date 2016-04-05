export const QUERY_SEARCH_TAGS = `
query tagQuery($id: String, $start: Int, $size: Int) {
	taggable(searchString: $id, start: $start, size: $size) {
		total,
		items {
			_id,
	    displayName,
	    tags {
	      tagId,
	      inherited,
	      source,
	      active
	    }
	    metadata {
	      key,
	      values
	    }
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
        values
      }
    }
  }
}
`;
