//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, PropTypes, Utils, Lsi, useEffect, useMemo } from "uu5g05";
import { Icon } from "uu5g05-elements";
import Config from "./config/config";
import LsiData from "./content-view-lsi";
//@@viewOff:imports

const ContentView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ContentView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.Detail.Preferences.propTypes,
    ...Config.Types.Detail.Internals.propTypes,
    categoryList: PropTypes.array.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.Detail.Preferences.defaultProps,
    ...Config.Types.Detail.Internals.defaultProps,
    categoryList: [],
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const joke = props.jokeDataObject.data;

    const imageFileUrl = useMemo(() => {
      if (joke.imageFile) {
        return URL.createObjectURL(joke.imageFile);
      }
    }, [joke.imageFile]);

    useEffect(() => {
      if (joke.imageFileUrl) {
        return () => URL.revokeObjectURL(joke.imageFileUrl);
      }
    }, [joke.imageFileUrl]);

    function handleAddRating(rating) {
      props.onAddRating(rating, props.jokeDataObject);
    }

    function handleUpdate() {
      props.onUpdate(props.jokeDataObject);
    }

    function handleVisibility() {
      props.onUpdateVisibility(!joke.visibility, props.jokeDataObject);
    }

    function buildCategoryNames() {
      // for faster lookup
      let categoryIds = new Set(joke.categoryIdList);
      return props.categoryList
        .reduce((acc, category) => {
          if (categoryIds.has(category.id)) {
            acc.push(category.name);
          }
          return acc;
        }, [])
        .join(", ");
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    const canManage = props.jokesPermission.joke.canManage(joke);
    const canAddRating = props.jokesPermission.joke.canAddRating(joke);
    const canUpdateVisibility = props.jokesPermission.joke.canUpdateVisibility();
    const actionsDisabled = props.jokeDataObject.state === "pending";

    return (
      <div {...attrs}>
        {joke.text}

        {imageFileUrl && <img src={imageFileUrl} alt={joke.name} className={Css.image()} />}

        <div className={Css.actionPanel()}>
          <div className={Css.ratingBox()}>
            {
              // ISSUE - Uu5Elements - No alternative for UU5.Bricks.Rating
              // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ebd485572961002969f212
            }
            <UU5.Bricks.Rating
              className={Css.rating()}
              value={joke.averageRating}
              onClick={canAddRating ? handleAddRating : undefined}
              disabled={actionsDisabled}
              colorSchema={props.colorSchema}
            />
            <Lsi lsi={LsiData.votes} params={[joke.ratingCount]} />
          </div>

          <div>
            {canManage && (
              <Icon
                icon="mdi-pencil"
                className={Css.actionIcon()}
                onClick={handleUpdate}
                disabled={actionsDisabled}
                colorScheme={props.colorScheme}
              />
            )}
            {canUpdateVisibility && (
              <Icon
                icon="mdi-eye"
                className={Css.actionIcon()}
                onClick={handleVisibility}
                disabled={actionsDisabled}
                colorScheme={props.colorScheme}
              />
            )}
          </div>
        </div>

        {props.showCategories && joke.categoryIdList?.length > 0 && (
          <Line icon="mdi-tag-multiple" content={buildCategoryNames()} colorScheme={props.colorScheme} />
        )}

        {props.showAuthor && <Line icon="mdi-account" content={joke.uuIdentityName} colorScheme={props.colorScheme} />}

        {
          // ISSUE - Uu5Elements - No alternative for UU5.Bricks.DateTime
          // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ebd512572961002969f24f
        }
        {props.showCreationTime && (
          <Line
            icon="mdi-calendar"
            content={<UU5.Bricks.DateTime value={joke.sys.cts} dateOnly />}
            colorScheme={props.colorScheme}
          />
        )}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function Line({ icon, content, colorScheme }) {
  return (
    <div className={Css.line()}>
      <Icon className={Css.infoIcon()} icon={icon} colorScheme={colorScheme} />
      {content}
    </div>
  );
}
//@@viewOff:helpers

//@@viewOn:css
const Css = {
  image: () => Config.Css.css`
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  `,

  actionPanel: () => Config.Css.css`
    border-top: 1px solid #BDBDBD;
    margin-top: 16px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    height: 48px;
    justify-content: space-between;
  `,

  ratingBox: () => Config.Css.css`
    padding: 16px 0;
    display: flex;
    align-items: center;
    font-size: 12px;
  `,

  rating: () => Config.Css.css`
    margin-right: 16px;
  `,

  line: () => Config.Css.css`
    font-size: 14px;
    line-height: 19px;
    color: rgba(0,0,0,0.75);
    padding: 4px 0;
    display: flex;
    align-items: center;
  `,

  infoIcon: () => Config.Css.css`
    font-size: 16px;
    margin-right: 8px;
  `,

  actionIcon: () => Config.Css.css`
    font-size: 20px;
    text-decoration: none;
    margin-left: 8px;
    cursor: pointer;
  `,
};
//@@viewOff:css

export default ContentView;