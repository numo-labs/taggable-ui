export const MUTATION_CREATE_TAG = `
mutation createTag($id: String, $displayName: String, $location: LocationInputType, $tags: [TagInputItem], $metadata: [MetaDataInputItem], $markets: String, $content: [ContentItemType]) {
	taggable {
    tagData(_id: $id, displayName: $displayName, location: $location, tags: $tags, metadata: $metadata, markets: $markets, content: $content) {
      _id,
      displayName,
			location {
				lat,
				lon
			},
      tags {
        node,
				displayName,
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
