export const MUTATION_CREATE_TAG = `
mutation createTag($id: String, $displayName: String, $location: LocationInputType, $tags: [TagInputItem], $metadata: [MetaDataInputItem]) {
	taggable {
    tagData(_id: $id, displayName: $displayName, location: $location, tags: $tags, metadata: $metadata) {
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
