//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef, useState } from "uu5g04-hooks";
import Error from "../core/error";
import Config from "./config/config";
import BoxView from "./detail-view/box-view";
import InlineView from "./detail-view/inline-view";
import PreferenceModal from "./detail-view/preference-modal";
import JokeErrorsLsi from "./errors-lsi";
import Lsi from "./detail-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "DetailView",
  nestingLevel: ["box", "inline"],
  //@@viewOff:statics
};

const DEFAULT_PROPS = {
  bgStyle: "transparent",
  cardView: "full",
  colorSchema: "default",
  elevation: 1,
  borderRadius: "0",
  isHome: false,
  contextType: "basic",
  showCopyComponent: true,
  onCopyComponent: () => {},
};

export const DetailView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokeDataObject: UU5.PropTypes.object.isRequired,
    jokesDataObject: UU5.PropTypes.object.isRequired,
    awscDataObject: UU5.PropTypes.object.isRequired,
    jokesPermission: UU5.PropTypes.object.isRequired,
    isHome: UU5.PropTypes.bool,
    contextType: UU5.PropTypes.oneOf(["none", "basic", "full"]),
    baseUri: UU5.PropTypes.string,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    showCopyComponent: UU5.PropTypes.bool,
    onCopyComponent: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: DEFAULT_PROPS,
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const alertBusRef = useRef();
    const [isPreferenceModal, setIsPreferenceModal] = useState(false);
    const [disabled, setDisabled] = useState(false);

    function showError(error, alertBus = alertBusRef.current) {
      alertBus.addAlert({
        content: <Error errorData={error} customErrorLsi={JokeErrorsLsi} />,
        colorSchema: "danger",
      });
    }

    async function handleAddRating(rating) {
      try {
        await props.jokeDataObject.handlerMap.addRating(rating);
      } catch (error) {
        showError(error);
      }
    }

    async function handleUpdateVisibility(visibility) {
      try {
        await props.jokeDataObject.handlerMap.updateVisibility(visibility);
      } catch (error) {
        showError(error);
      }
    }

    function handleCopyComponent() {
      const uu5string = props.onCopyComponent();
      UU5.Utils.Clipboard.write(uu5string);

      alertBusRef.current.addAlert({
        content: <UU5.Bricks.Lsi lsi={Lsi.copyComponentSuccess} />,
        colorSchema: "success",
      });
    }

    async function handleReload() {
      try {
        setDisabled(true);
        await Promise.all([props.jokesDataObject.handlerMap.load(), props.jokeDataObject.handlerMap.load()]);
      } catch (error) {
        console.error(error);
        showError(error);
      } finally {
        setDisabled(false);
      }
    }

    function handleUpdate() {
      /** There you could show modal window */
    }

    const handleOpenPreference = () => {
      setIsPreferenceModal(true);
    };

    const handlePreferenceDone = async () => {
      setIsPreferenceModal(false);
    };

    const handlePreferenceCancel = () => {
      setIsPreferenceModal(false);
    };
    //@@viewOff:private

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    const viewProps = {
      ...props,
      header: Lsi.header,
      help: Lsi.help,
      showCopyComponent: props.showCopyComponent,
      disabled: disabled || props.disabled,
      onUpdate: handleUpdate,
      onAddRating: handleAddRating,
      onUpdateVisibility: handleUpdateVisibility,
      onCopyComponent: handleCopyComponent,
      onOpenPreference: handleOpenPreference,
      onReload: handleReload,
    };

    return (
      <>
        <UU5.Bricks.AlertBus ref_={alertBusRef} location="portal" />
        {currentNestingLevel === "box" && <BoxView {...viewProps} />}
        {currentNestingLevel === "inline" && <InlineView {...viewProps} />}
        {isPreferenceModal && (
          <PreferenceModal
            preferenceDataObject={props.preferenceDataObject}
            shown={isPreferenceModal}
            onSaveDone={handlePreferenceDone}
            onCancel={handlePreferenceCancel}
          />
        )}
      </>
    );
    //@@viewOff:render
  },
});

export default DetailView;
