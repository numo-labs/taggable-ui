export const QUERY_SEARCH_TAGS = `
query tagQuery($id: String, $queryType: QueryTypeEnum!, $tagType: TagTypeEnum, $start: Int, $size: Int) {
	taggable(searchString: $id, queryType: $queryType, tagType: $tagType, start: $start, size: $size) {
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
