import { PropTypes } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import { IdentificationBlock } from "uu_plus4u5g02-elements";

// Required API of every component using user preference property
const Preference = {
  propTypes: {
    uu5Id: PropTypes.string,
    disableUserPreference: PropTypes.bool,
  },
  defaultProps: {
    disableUserPreference: false,
  },
};

// Required API of every component supporting area nesting level
const Area = {
  propTypes: {
    card: IdentificationBlock.propTypes.card,
    colorScheme: IdentificationBlock.propTypes.colorScheme,
    borderRadius: IdentificationBlock.propTypes.borderRadius,
    significance: IdentificationBlock.propTypes.significance,
    level: IdentificationBlock.propTypes.level,
  },
  defaultProps: {
    card: IdentificationBlock.defaultProps.card,
    borderRadius: IdentificationBlock.defaultProps.borderRadius,
    level: IdentificationBlock.defaultProps.level,
  },
};

// Required API of every component supporting inline nesting level
const Inline = {
  propTypes: {
    colorScheme: Uu5Elements.Text.propTypes.colorScheme,
    significance: Uu5Elements.Text.propTypes.significance,
  },
  defaultProps: {
    colorScheme: Uu5Elements.Text.defaultProps.colorScheme,
    significance: Uu5Elements.Text.defaultProps.significance,
  },
};

// Required API of every AreaView component
const AreaView = {
  propTypes: {
    ...Area.propTypes,
    actionList: PropTypes.array,
  },
  defaultProps: {
    ...Area.defaultProps,
    actionList: [],
  },
};

// Required API of every InlineView component
const InlineView = {
  propTypes: {
    ...Inline.propTypes,
    actionList: PropTypes.array,
  },
  defaultProps: {
    ...Inline.defaultValues,
    actionList: [],
  },
};

// Required API of every DetailModal component
const DetailModal = {
  propTypes: {
    actionList: PropTypes.array,
    onClose: PropTypes.func,
  },
  defaultProps: {
    actionList: [],
  },
};

export default {
  Area,
  Inline,
  Preference,
  AreaView,
  InlineView,
  DetailModal,
};
