'use strict';
import _ from 'lodash';
import {
  SET_SELECTED_TAG_FROM_SEARCH,
  SET_SEARCH_STRING,
  SET_SEARCH_RESULTS,
  SET_TAG_TYPE_AND_QUERY_TYPE,
  SAVE_CONFIGURATION,
  BUSY_SEARCHING,
  DELETE_VALUE,
  ADD_PARENT_TAG,
  REMOVE_PARENT_TAG,
  ADD_VALUE,
  ADD_KEY_VALUE_PAIR,
  SET_NEW_KEY_STRING,
  SET_NEW_VALUE_STRING,
  EMPTY_TAG_IN_VIEW,
  UPDATE_DISPLAYNAME,
  UPDATE_ID,
  UPDATE_LATITUDE,
  UPDATE_LONGITUDE,
  CLEAN_SEARCH_PANE,
  SAVE_TAG_CONTENT
} from '../constants/action-types.js';

export const initialState = {
  // state for search component in the search pane
  tag: {
    searchResults: {
      total: 0,
      items: []
    },
    linkedTags: [],
    searchString: '',
    tagType: null,
    queryType: 'QUERY_DISPLAYNAME',
    inSearch: false
  },
  tagInView: {
    _id: '',
    displayName: '',
    location: {
      lat: '',
      lon: ''
    },
    metadata: [],
    tags: [],
    links: {
      incoming: [],
      outgoing: []
    }
  },
  searchString: '',
  tagType: null,
  queryType: 'QUERY_DISPLAYNAME',
  // state for parent search component inside the view pane
  parent: {
    searchResults: {
      total: 0,
      items: []
    },
    searchString: '',
    inSearch: false,
    tagType: null,
    queryType: 'QUERY_DISPLAYNAME'
  },
  // state for the view pane
  configurationSaved: true,
  newKey: '',
  newValue: '',
  createMode: true
};

export default function taggable (state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_TAG_FROM_SEARCH:
      return {
        ...state,
        tagInView: action.tagDoc,
        createMode: false
      };
    case SAVE_TAG_CONTENT:
      return {
        ...state,
        tagInView: action.tagDoc
      };
    case SET_SEARCH_STRING:
      return {
        ...state,
        [action.option]: {
          ...state[action.option],
          searchString: action.text
        }
      };
    case BUSY_SEARCHING:
      return {
        ...state,
        [action.option]: {
          ...state[action.option],
          inSearch: true
        }
      };
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        [action.option]: {
          ...state[action.option],
          searchResults: action.searchResults,
          inSearch: false
        }
      };
    case SET_TAG_TYPE_AND_QUERY_TYPE:
      return {
        ...state,
        [action.option]: {
          ...state[action.option],
          tagType: action.tagType,
          queryType: action.queryType
        }
      };
    case ADD_PARENT_TAG:
      const newParentTag = {
        node: action.node,
        displayName: action.name,
        source: 'taggable_ui',
        active: true
      };
      const newOutGoingLink = {
        node: {
          properties: {
            name: action.name,
            id: action.node
          }
        },
        relationship: {
          properties: {
            active: true
          },
          type: 'Pending'
        }
      };
      const tags = [...state.tagInView.tags, newParentTag];
      return {
        ...state,
        tagInView: {
          ...state.tagInView,
          links: {
            ...state.tagInView.links,
            outgoing: [
              ...state.tagInView.links.outgoing,
              newOutGoingLink
            ]
          },
          tags: _.uniqBy(tags, 'node') // prevent duplicate links
        },
        configurationSaved: false
      };
    case REMOVE_PARENT_TAG:
      return {
        ...state,
        tagInView: {
          ...state.tagInView,
          tags: state.tagInView.tags.filter(tag => tag.node !== action.node),
          links: {
            ...state.tagInView.links,
            outgoing: state.tagInView.links.outgoing.filter(link => link.node.properties.id !== action.node)
          }
        },
        configurationSaved: false
      };
    case SAVE_CONFIGURATION:
      return {
        ...state,
        configurationSaved: true
      };
    case DELETE_VALUE:
      const metadataCopy = state.tagInView.metadata;
      const contentCopy = state.tagInView.metadata[action.metaIndex];
      const newValues = contentCopy.values;
      if (newValues.length === 1) {
        metadataCopy.splice(action.metaIndex, 1);
      } else {
        newValues.splice(action.index, 1);
        metadataCopy.splice(action.metaIndex, 1, {...contentCopy, values: newValues});
      }
      return {
        ...state,
        configurationSaved: false,
        tagInView: {
          ...state.tagInView,
          metadata: metadataCopy
        }
      };
    case ADD_VALUE:
      const addMetadataCopy = state.tagInView.metadata;
      const addContentCopy = state.tagInView.metadata[action.index];
      const targetValuesArray = state.tagInView.metadata[action.index].values;
      const newValuesArray = [...targetValuesArray, action.value];
      addMetadataCopy.splice(action.index, 1, {...addContentCopy, values: newValuesArray});
      return {
        ...state,
        configurationSaved: false,
        tagInView: {
          ...state.tagInView,
          metadata: addMetadataCopy
        }
      };
    case ADD_KEY_VALUE_PAIR:
      const metaCopy = state.tagInView.metadata;
      const newKeyValue = {
        key: action.key,
        values: [action.value]
      };
      const newMeta = [...metaCopy, newKeyValue];
      return {
        ...state,
        configurationSaved: false,
        tagInView: {
          ...state.tagInView,
          metadata: newMeta
        }
      };
    case SET_NEW_KEY_STRING:
      return {
        ...state,
        newKey: action.keyString
      };
    case SET_NEW_VALUE_STRING:
      return {
        ...state,
        newValue: action.valueString
      };
    case EMPTY_TAG_IN_VIEW:
      return {
        ...state,
        tagInView: initialState.tagInView,
        createMode: true
      };
    case UPDATE_DISPLAYNAME:
      return {
        ...state,
        tagInView: {
          ...state.tagInView,
          displayName: action.displayName
        },
        configurationSaved: false
      };
    case UPDATE_ID:
      return {
        ...state,
        tagInView: {
          ...state.tagInView,
          _id: action.id
        },
        configurationSaved: false
      };
    case UPDATE_LATITUDE:
      return {
        ...state,
        tagInView: {
          ...state.tagInView,
          location: {
            ...state.tagInView.location,
            lat: action.latitude
          }
        },
        configurationSaved: false
      };
    case UPDATE_LONGITUDE:
      return {
        ...state,
        tagInView: {
          ...state.tagInView,
          location: {
            ...state.tagInView.location,
            lon: action.longitude
          }
        },
        configurationSaved: false
      };
    case CLEAN_SEARCH_PANE:
      return {
        ...state,
        tag: initialState.tag
      };
    default:
      return state;
  }
}
