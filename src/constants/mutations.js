export const MUTATION_CREATE_TAG = `
mutation createTag($id: String, $displayName: String, $location: LocationInputType, $tags: [TagInputItem], $metadata: [MetaDataInputItem], $markets: String, $content: [ContentItemType]) {
	taggable {
    tagData(_id: $id, displayName: $displayName, location: $location, tags: $tags, metadata: $metadata, markets: $markets, content: $content) {
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
