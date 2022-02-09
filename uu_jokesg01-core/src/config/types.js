import { PropTypes } from "uu5g05";
import { Text } from "uu5g05-elements";
import { IdentificationBlock } from "uu_plus4u5g02-elements";

// Required API of every component supporting box nesting level
const Box = {
  propTypes: {
    card: IdentificationBlock.propTypes.card,
    background: IdentificationBlock.propTypes.background,
    colorScheme: IdentificationBlock.propTypes.colorScheme,
    borderRadius: IdentificationBlock.propTypes.borderRadius,
    significance: IdentificationBlock.propTypes.significance,
  },
  defaultProps: {
    card: IdentificationBlock.defaultProps.card,
    background: IdentificationBlock.defaultProps.background,
    colorScheme: IdentificationBlock.defaultProps.colorScheme,
    borderRadius: IdentificationBlock.defaultProps.borderRadius,
    significance: IdentificationBlock.defaultProps.significance,
  },
};

// Required API of every component supporting inline nesting level
const Inline = {
  propTypes: {
    background: Text.propTypes.background,
    colorScheme: Text.propTypes.colorScheme,
    significance: Text.propTypes.significance,
  },
  defaultProps: {
    background: Text.defaultProps.background,
    colorScheme: Text.defaultProps.colorScheme,
    significance: Text.defaultProps.significance,
  },
};

// Required API of every BoxView component
const BoxView = {
  propTypes: {
    ...Box.propTypes,
    header: PropTypes.object.isRequired,
    actionList: PropTypes.array,
  },
  defaultProps: {
    ...Box.defaultProps,
    actionList: [],
  },
};

// Required API of every InlineView component
const InlineView = {
  propTypes: {
    ...Inline.propTypes,
    header: PropTypes.object.isRequired,
    actionList: PropTypes.array,
  },
  defaultProps: {
    ...Inline.defaultValues,
    actionList: [],
  },
};

// Required API of every InlineModal component
const InlineModal = {
  propTypes: {
    header: PropTypes.object.isRequired,
    shown: PropTypes.bool,
    actionList: PropTypes.array,
    onClose: PropTypes.func,
  },
  defaultProps: {
    shown: false,
    actionList: [],
    onClose: () => {},
  },
};

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

export default { Box, Inline, BoxView, InlineView, InlineModal, Preference };
