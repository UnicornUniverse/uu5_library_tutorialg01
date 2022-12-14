//@@viewOn:imports
import { createVisualComponent, Utils, useLsi, useState } from "uu5g05";
import { useAlertBus } from "uu5g05-elements";
import { getErrorLsi } from "../errors/errors";
import Config from "./config/config";
import AreaView from "./detail-view/area-view";
import InlineView from "./detail-view/inline-view";
import DetailModal from "./detail-view/detail-modal";
import UpdateModal from "./detail-view/update-modal";
import PreferenceModal from "./detail-view/preference-modal";
import importLsi from "../lsi/import-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DetailView",
  nestingLevel: ["area", "inline"],
  //@@viewOff:statics
};

const DetailView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.Inline.propTypes,
    ...Config.Types.Area.propTypes,
    ...Config.Types.Detail.AsyncData.propTypes,
    ...Config.Types.Detail.Properties.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.Inline.defaultProps,
    ...Config.Types.Area.defaultProps,
    ...Config.Types.Detail.AsyncData.defaultProps,
    ...Config.Types.Detail.Properties.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [DetailView.uu5Tag]);
    const errorsLsi = useLsi(importLsi, ["Errors"]);
    const { addAlert } = useAlertBus();
    const [isDetailModal, setIsDetailModal] = useState(false);
    const [isUpdateModal, setIsUpdateModal] = useState(false);
    const [isPreferenceModal, setIsPreferenceModal] = useState(false);
    const [disabled, setDisabled] = useState(false);

    function showError(error) {
      addAlert({
        message: getErrorLsi(error, errorsLsi),
        priority: "error",
      });
    }

    async function handleAddRating(rating) {
      try {
        await props.jokeDataObject.handlerMap.addRating(rating);
      } catch (error) {
        DetailView.logger.error("Error adding rating", error);
        showError(error);
      }
    }

    async function handleUpdateVisibility(visibility) {
      try {
        await props.jokeDataObject.handlerMap.updateVisibility(visibility);
      } catch (error) {
        DetailView.logger.error("Error updating visibility", error);
        showError(error);
      }
    }

    const handleDetailOpen = ({ isNewTab }) => {
      if (isNewTab) {
        props.onOpenToNewTab();
      } else {
        setIsDetailModal(true);
      }
    };

    const handleDetailClose = () => {
      setIsDetailModal(false);
    };

    const handleUpdate = (event) => {
      setIsUpdateModal(true);
    };

    const handleUpdateDone = async () => {
      setIsUpdateModal(false);
    };

    const handleUpdateCancel = () => {
      setIsUpdateModal(false);
    };

    const handleOpenPreference = (event) => {
      setIsPreferenceModal(true);
    };

    const handlePreferenceDone = async () => {
      setIsPreferenceModal(false);
    };

    const handlePreferenceCancel = () => {
      setIsPreferenceModal(false);
    };

    function handleCopyComponent(event) {
      const uu5string = props.onCopyComponent();
      Utils.Clipboard.write(uu5string);

      addAlert({
        message: lsi.copyComponentSuccess,
        priority: "success",
        durationMs: 2000,
      });
    }

    async function handleReload(event) {
      event.stopPropagation();

      try {
        setDisabled(true);
        // HINT: We should reload ALL data consumed by the component be sure the user is looking on up-to-date data
        await Promise.all([
          props.jokesDataObject.handlerMap.load(),
          props.jokeDataObject.handlerMap.load(),
          // Property preferenceDataObject is optional
          props.preferenceDataObject?.handlerMap.load(),
        ]);
      } catch (error) {
        DetailView.logger.error("Error reloading data", error);
        showError(error);
      } finally {
        setDisabled(false);
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);
    const { elementProps, componentProps } = Utils.VisualComponent.splitProps(props);

    const actionList = getActions(props, lsi, {
      handleReload,
      handleCopyComponent,
      handleOpenPreference,
      handleUpdate,
      handleUpdateVisibility,
    });

    let viewProps = {
      ...componentProps,
      info: lsi.info,
      actionList,
      disabled: disabled || props.disabled,
      onDetail: handleDetailOpen,
      onUpdate: handleUpdate,
      onAddRating: handleAddRating,
      onUpdateVisibility: handleUpdateVisibility,
    };

    return (
      <>
        {currentNestingLevel === "area" && <AreaView {...elementProps} {...viewProps} />}
        {currentNestingLevel === "inline" && <InlineView {...elementProps} {...viewProps} />}
        {isDetailModal && <DetailModal {...viewProps} onClose={handleDetailClose} shown />}
        {isUpdateModal && (
          <UpdateModal
            jokeDataObject={props.jokeDataObject}
            baseUri={props.baseUri}
            onSaveDone={handleUpdateDone}
            onCancel={handleUpdateCancel}
          />
        )}
        {isPreferenceModal && (
          <PreferenceModal
            preferenceDataObject={props.preferenceDataObject}
            onSaveDone={handlePreferenceDone}
            onCancel={handlePreferenceCancel}
          />
        )}
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getActions(
  props,
  lsi,
  { handleReload, handleCopyComponent, handleOpenPreference, handleUpdate, handleUpdateVisibility }
) {
  const isDataLoaded =
    props.jokesDataObject.data !== null &&
    props.jokeDataObject.data !== null &&
    props.preferenceDataObject.data !== null;

  const actionList = [];

  if (isDataLoaded) {
    const canManage = props.jokesPermission.joke.canManage(props.jokeDataObject.data);
    const canUpdateVisibility = props.jokesPermission.joke.canUpdateVisibility();

    if (canManage) {
      actionList.push({
        icon: "mdi-pencil",
        children: lsi.update,
        onClick: handleUpdate,
        disabled: props.disabled,
      });
    }

    if (canUpdateVisibility) {
      const lsiCode = props.jokeDataObject.data.visibility ? "hide" : "show";
      actionList.push({
        icon: props.jokeDataObject.data.visibility ? "mdi-eye-off" : "mdi-eye",
        children: lsi[lsiCode],
        onClick: () => handleUpdateVisibility(!props.jokeDataObject.data.visibility),
        disabled: props.disabled,
      });
    }

    actionList.push({
      icon: "mdi-settings",
      children: lsi.configure,
      onClick: handleOpenPreference,
      collapsed: true,
      disabled: props.disabled || props.preferenceDataObject.data.disableUserPreference,
    });
  }

  actionList.push({
    icon: "mdi-sync",
    children: lsi.reloadData,
    onClick: handleReload,
    collapsed: true,
    disabled: props.disabled,
  });

  actionList.push({
    icon: "mdi-content-copy",
    children: lsi.copyComponent,
    onClick: handleCopyComponent,
    collapsed: true,
    disabled: props.disabled,
  });

  return actionList;
}
//@@viewOff:helpers

//@@viewOn:exports
export { DetailView };
export default DetailView;
//@@viewOff:exports
