'use strict';
import _ from 'lodash';
import {
  SET_SELECTED_TAG_FROM_SEARCH,
  SET_SEARCH_STRING,
  SET_SEARCH_RESULTS,
  SET_TAG_TYPE_AND_QUERY_TYPE,
  SAVE_CONFIGURATION,
  BUSY_SEARCHING,
  ADD_PARENT_TAG,
  REMOVE_PARENT_TAG,
  CLEAN_SEARCH_PANE,
  SAVE_TAG_CONTENT,
  TOGGLE_SAVE_MODAL_STATE,
  EMPTY_TAG_IN_VIEW,
  SAVE_PERMISSIONS,
  LOG_OUT,
  LOGIN_ERROR
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
    },
    markets: [],
    content: [],
    description: ''
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
  createMode: true,
  modalVisible: false,
  idToken: '',
  loggedIn: false,
  loginError: false,
  readOnly: false,
  createEnabled: false
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
    case TOGGLE_SAVE_MODAL_STATE:
      return {
        ...state,
        modalVisible: !state.modalVisible
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
    case EMPTY_TAG_IN_VIEW:
      return {
        ...state,
        tagInView: initialState.tagInView
      };
    case CLEAN_SEARCH_PANE:
      return {
        ...state,
        tag: initialState.tag
      };
    case SAVE_PERMISSIONS:
      return {
        ...state,
        idToken: action.idToken,
        loggedIn: true,
        readOnly: action.readOnly,
        createEnabled: action.createEnabled
      };
    case LOG_OUT:
      return {
        ...state,
        loggedIn: false
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: true
      };
    default:
      return state;
  }
}
