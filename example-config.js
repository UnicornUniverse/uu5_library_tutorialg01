// this file is added to the bundle as assets/example-config.js and can be used in demos for loader configuration
// ("imports" variable below is automatically computed & replaced during build)

// uses ES5 syntax
(function () {
  var cdnBaseUri = new URL(
    document.currentScript.getAttribute("data-orig-src") ||
      document.currentScript.src
  ).origin;
  var imports = {}; // this line will be auto-replaced by devkit
  for (var k in imports)
    imports[k] = new URL(imports[k], cdnBaseUri).toString();

  // for custom imports use this syntax:
  // imports["uu_customlibg01"] = new URL("/uu-customlibg01/1.0.0/uu_customlibg01.min.js", cdnBaseUri).toString();

  imports["uu_plus4u5g02-app"] =
    "https://cdn.plus4u.net/uu-plus4u5g02/1.0.0/uu_plus4u5g02-app.min.js";
  imports["uu5g05-dev"] =
    "https://cdn.plus4u.net/uu-uu5g05/1.0.0/uu5g05-dev.min.js";
  imports["uu5richtextg01"] =
    "https://cdn.plus4u.net/uu-uu5richtextg01/1.0.0/uu5richtextg01.min.js";
  imports["immutable"] =
    "https://cdn.plus4u.net/libs/immutable/3.8.2/immutable.min.js";
  imports["uu_editablecomponentcontentg03"] =
    "https://cdn.plus4u.net/uu-editablecomponentcontentg03/3.0.0/uu_editablecomponentcontentg03.min.js";
  imports["uu_applibraryregistryg01-bricks"] =
    "https://cdn.plus4u.net/uu-applibraryregistryg01/1.0.0/uu_applibraryregistryg01-bricks.min.js";
  imports["uu5tilesg02"] =
    "https://cdn.plus4u.net/uu-uu5tilesg02/1.0.0/uu5tilesg02.min.js";

  window.Uu5Loader.config({ imports: imports });

  let currentUrl = (
    location.href.slice(0, 6) === "about:" && window.frameElement
      ? parent
      : window
  ).location.href;
  let domain = new URL(currentUrl).hostname;
  let isDev =
    domain === "localhost" ||
    domain === "uuapp-dev.plus4u.net" ||
    /^\d+\.\d+\.\d+\.\d+$/.test(domain);
  if (isDev) {
    if (!window.uu5Environment) window.uu5Environment = {};
    // prettier-ignore
    Object.assign(window.uu5Environment, {
      "uu_app_oidc_providers_oidcg02_uri": "https://uuapp-dev.plus4u.net/uu-oidc-maing02/eca71064ecce44b0a25ce940eb8f053d/oidc",
      "uu_app_oidc_providers_oidcg02_uri": "https://uuapp-dev.plus4u.net/uu-oidc-maing02/eca71064ecce44b0a25ce940eb8f053d/oidc",
      "uu5g05_libraryRegistryBaseUri": "https://uuapp-dev.plus4u.net/uu-applibraryregistry-maing01/000008ad5570455e83857a394f9a21c9",
      "uu5g05_plus4UGoBaseUri": "https://uuapp-dev.plus4u.net/uu-plus4ugo-maing01/00000c3f57074bfcb759aba2d562e013",
      "uu_plus4u5g02_identityManagementBaseUri": "https://uuapp-dev.plus4u.net/uu-identitymanagement-maing01/58ceb15c275c4b31bfe0fc9768aa6a9c",
      "uu_plus4u5g02_commonServicesBaseUri": "https://uuapp-dev.plus4u.net/uu-commonservices-maing01/00000b33c474420aa887c972097b8024",
      "uu_plus4u5g02_peopleBaseUri": "https://uuapp-dev.plus4u.net/uu-plus4upeople-maing01/0000004723544d1ab0b74000d9f7671c",
      "uu_plus4u5g02_organizationBaseUri": "https://uuapp-dev.plus4u.net/uu-plus4uorganization-maing01/00000e17cfda49f49db73ed53ac8e4cf",
    });
  }
})();
