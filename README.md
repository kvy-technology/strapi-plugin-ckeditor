# CKEditor 5 custom field for Strapi

This package provides a custom field for Strapi that lets you use and configure CKEditor in no time.

Custom fields are supported since Strapi 4.4+ and offer powerful API to create highly customizable fields.

This is an official plugin, provided to you by the [CKEditor team](https://ckeditor.com) 👋

## <a id="features"></a>✨ Features

* **No code field customization:** customize each field for its specific usage scenario – let it be short note, blog article, or a document.
* **Predefined editor presets:** a couple predefined editor presets (sets of CKEditor 5 plugins and their configuration) to choose from.
* **Custom max length validation:** Twitter-like length validation with visual indicators, based on the number of characters in the text, not the HTML string.
* **Dark mode support:** because you like it.
* **More features coming soon:** Media library and upload adapter integrations, more granular editor toolbar and plugins configuration, and more.

## <a id="installation"></a>🔧 Installation

Inside your Strapi app, add the package:

With `npm`:

```bash
npm install @ckeditor/strapi-plugin-ckeditor
```

With `yarn`:

```bash
yarn add @ckeditor/strapi-plugin-ckeditor
```

In `config/plugins.js` file add:

```js
ckeditor: true
```

If you do not yet have this file, then create and add:

```js
module.exports = () => {
    return {
        ckeditor: true
    }
}
```

Then run build:

```bash
npm run build
```

or:

```bash
yarn build
```

## <a id="contributing"></a>🛠 Contributing

This section covers the way how to configure your environment if you want to contribute to this package.

### Setting up the environment

In order to start making changes in the plugin you first need to install Strapi infrastructure on top of the plugin repository. At the time of writing the guide, since you need the custom-fields feature you need to use this particular version of Strapi.

```
npx create-strapi-app@custom-fields --quickstart strapi
cd strapi
```

By default Strapi does not create plugins folder so we need to create it.

```
mkdir -p src/plugins
```

Now we should clone this repository so we can work on it.

```
git clone git@github.com:cksource/strapi-plugin-ckeditor.git src/plugins/strapi-plugin-ckeditor
```

Let's add an entry inside `./package.json` file so, we won't need to use `yarn` inside plugin itself.

```
"workspaces": ["./src/plugins/strapi-plugin-ckeditor"]
```

Install dependencies:

```
yarn install
```

Now we need to register plugin so strapi can use it. In order to do that we need
to create (if not already created) `./config/plugins.js` file and add entry to it.

```
module.exports = {
  ckeditor: {
    enabled: true,
    resolve: "./src/plugins/strapi-plugin-ckeditor"
  },
};
```

Rebuild the project and start the server:

```
yarn build
yarn start
```