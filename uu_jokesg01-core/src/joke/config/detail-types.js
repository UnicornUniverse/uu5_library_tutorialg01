import { PropTypes } from "uu5g05";

// Component's public properties stored as user preference property in uuMT
// Component -> PreferenceProvider -> View -> AreaView -> Content
// Component -> PreferenceProvider -> View -> DetailModal -> Content
const Preferences = {
  propTypes: {
    showCategories: PropTypes.bool,
    showAuthor: PropTypes.bool,
    showCreationTime: PropTypes.bool,
  },
  defaultProps: {
    showCategories: true,
    showAuthor: true,
    showCreationTime: true,
  },
};

// Component's other public properties that are not stored as user preference property
// Component -> View -> AreaView -> Content
// Component -> View -> DetailModal -> Content
const Properties = {
  propTypes: {
    showDelete: PropTypes.bool,
  },
  defaultProps: {
    showDelete: false,
  },
};

// Async data objects & lists required by Content
// Provider -> View -> InlineView
// Provider -> View -> AreaView -> Content
// Provider -> View -> DetailModal -> Content
const AsyncData = {
  propTypes: {
    jokeDataObject: PropTypes.object.isRequired,
    jokesDataObject: PropTypes.object.isRequired,
    jokesPermission: PropTypes.object.isRequired,
    preferenceDataObject: PropTypes.object,
  },
  defaultProps: {
    preferenceDataObject: {
      state: "ready",
      data: {
        showCategories: true,
        showAuthor: true,
        showCreationTime: true,
        disableUserPreference: true,
      },
    },
  },
};

// Internal properties
// View -> InlineView
// View -> AreaView -> Content
// View -> DetailModal -> Content
const Internals = {
  propTypes: {
    onDetail: PropTypes.func,
    onUpdate: PropTypes.func,
    onAddRating: PropTypes.func,
    onUpdateVisibility: PropTypes.func,
    onDelete: PropTypes.func,
    onCopyComponent: PropTypes.func,
    onOpenToNewTab: PropTypes.func,
  },
  defaultProps: {},
};

export default { AsyncData, Preferences, Properties, Internals };
