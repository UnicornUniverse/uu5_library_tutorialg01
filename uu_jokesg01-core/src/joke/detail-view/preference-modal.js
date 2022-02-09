//@@viewOn:imports
import { createVisualComponent, PropTypes, Lsi, useLsiValues, useState } from "uu5g05";
import { Modal, Button } from "uu5g05-elements";
import { Form, FormCheckbox, SubmitButton } from "uu5g05-forms";
import { Error } from "../../core/core";
import Config from "./config/config";
import LsiData from "./preference-modal-lsi";
//@@viewOff:imports

export const PreferenceModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "PreferenceModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    preferenceDataObject: PropTypes.object.isRequired,
    shown: PropTypes.bool,
    onSaveDone: PropTypes.func,
    onCancel: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    shown: false,
    onSaveDone: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const inputLsi = useLsiValues(LsiData);
    const [error, setError] = useState();
    const isPending = props.preferenceDataObject.state === "pending";

    async function handleSubmit(event) {
      try {
        // The modal window remains opened during operation and shows possible errors
        // (pessimistic approach). The parent component is responsible to close modal
        // window after operation has been successfuly done and show some global success
        // alert if needed.
        error && setError(null);
        await props.preferenceDataObject.handlerMap.save(event.data.value);
        props.onSaveDone();
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const preference = props.preferenceDataObject.data;
    const formInputCss = Config.Css.css`margin-bottom:16px`;

    return (
      <Modal header={<Lsi lsi={LsiData.header} />} info={<Lsi lsi={LsiData.info} />} open={props.shown}>
        {error && <Error errorData={error} className={formInputCss} />}
        <Form onSubmit={handleSubmit} layout="1:2">
          <FormCheckbox
            label={inputLsi.showCategories}
            name="showCategories"
            initialValue={preference.showCategories}
            className={formInputCss}
          />
          <FormCheckbox
            label={inputLsi.showAuthor}
            name="showAuthor"
            initialValue={preference.showAuthor}
            className={formInputCss}
          />
          <FormCheckbox
            label={inputLsi.showCreationTime}
            name="showCreationTime"
            initialValue={preference.showCreationTime}
            className={formInputCss}
          />
          <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "flex-end" })}>
            <Button onClick={props.onCancel} disabled={isPending}>
              <Lsi lsi={LsiData.cancel} />
            </Button>
            <SubmitButton>
              <Lsi lsi={LsiData.submit} />
            </SubmitButton>
          </div>
        </Form>
      </Modal>
    );
    //@@viewOff:render
  },
});

export default PreferenceModal;
