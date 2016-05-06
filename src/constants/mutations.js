export const MUTATION_CREATE_TAG = `
mutation createTag($id: String, $displayName: String, $location: LocationInputType, $tags: [TagInputItem], $metadata: [MetaDataInputItem], $markets: String, $description: String, $content: [ContentInputItem]) {
	taggable {
    tagData(_id: $id, displayName: $displayName, location: $location, tags: $tags, metadata: $metadata, markets: $markets, content: $content, description: $description) {
			_id,
       location {
         lat,
         lon
       },
       displayName,
       tags{
         active,
         displayName,
         node,
         source
       },
       metadata {
         values,
       	key
       },
       description,
       markets,
			 content {
				 url,
				 market,
				 language,
				 sections {
					 text,
					 title,
					 image
				 }
			 }
    }
  }
}
`;
