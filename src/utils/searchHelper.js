import { mockTags } from './mockTags.js';

export function filterTags (searchTerm) {
  if (searchTerm === '') {
    return [];
  }
  return mockTags.filter(tag => {
    return tag._id.search(searchTerm) > -1 || tag.displayName.search(searchTerm) > -1;
  });
}

export function getTagData (tagId) {
  return mockTags.find(tag => tag._id === tagId);
}

export function findLinkedTags (tagArray) {
  return tagArray.map(tag => getTagData(tag.tagId));
}
