//@@viewOn:imports
import { createVisualComponent, useEffect, useLsi, Lsi } from "uu5g05";
import { IdentificationModal } from "uu_plus4u5g02-elements";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import Header from "./header";
import Content from "./content";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

const PLACEHOLDER_HEIGHT = "100%";

export const DetailModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DetailModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.DetailModal.propTypes,
    ...Config.Types.Detail.AsyncData.propTypes,
    ...Config.Types.Detail.Internals.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.DetailModal.defaultProps,
    ...Config.Types.Detail.AsyncData.defaultProps,
    ...Config.Types.Detail.Internals.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const errorsLsi = useLsi(importLsi, ["Errors"]);

    useEffect(() => {
      async function checkDataAndLoad() {
        if (props.preferenceDataObject?.state === "readyNoData") {
          try {
            await props.preferenceDataObject.handlerMap.load();
          } catch (error) {
            DetailModal.logger.error("Error reloading preference data", error);
          }
        }
      }

      checkDataAndLoad();
    });
    //@@viewOff:private

    //@@viewOn:render
    const {
      header,
      info,
      actionList,
      awscDataObject,
      isHome,
      onClose,
      identificationType,
      jokesDataObject,
      ...contentProps
    } = props;

    const headerElement = <Header header={header} joke={props.jokeDataObject.data} />;

    return (
      <IdentificationModal
        header={headerElement}
        info={<Lsi lsi={info} />}
        open={true}
        onClose={onClose}
        actionList={actionList}
        disabled={props.disabled}
        identificationType={identificationType}
        closeOnOverlayClick
      >
        {(modal) => (
          <DataObjectStateResolver
            dataObject={props.jokesDataObject}
            height={PLACEHOLDER_HEIGHT}
            customErrorLsi={errorsLsi}
          >
            <DataObjectStateResolver
              dataObject={props.jokeDataObject}
              height={PLACEHOLDER_HEIGHT}
              customErrorLsi={errorsLsi}
            >
              <DataObjectStateResolver dataObject={props.preferenceDataObject} customErrorLsi={errorsLsi}>
                {() => <Content {...contentProps} wrapperStyle={modal.style} />}
              </DataObjectStateResolver>
            </DataObjectStateResolver>
          </DataObjectStateResolver>
        )}
      </IdentificationModal>
    );
    //@@viewOff:render
  },
});

export default DetailModal;
