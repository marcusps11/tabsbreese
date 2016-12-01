# VCCP Dev Static Site Seed

## Content

[About](#About)  
----[Browser Matrix](#BrowserMatrix)  
----[Mobile Matrix](#MobileMatrix)  
----[Technologies Used](#TechnologiesUsed)  
[Getting Started](#GettingStarted)  
----[Prerequisites](#Prerequisites)  
----[Setup](#Setup)  
[Development](#Development)  
----[Serve](#Serve)  
----[Architecture](#Architecture)  
----[Develop](#Develop)  
----[Build](#Build)  
[Version Control](#VersionControl)  
----[Branches](#Branches)  
----[Launch Development Mode](#LaunchDevelopmentMode)  
----[Releasing Code](#ReleasingCode)  

----------

## <a name="About"></a>About

Creates a simple HTML site for small and quick microsites e.g. Asda News HD, Nationwide Share etc.

### Features:

* Bootstrap with basic layout and styling
* HTML templating with Nunjucks
* SASS with sourcemaps, autoprefixing and REM fallback
* SVG icons
* SASS linting with Styleint
* ES6/ES2015 with Babel and Browserify
* JS linting with ESLint
* Bower dependancy injection
* Socail media meta tags


### <a name="BrowserMatrix"></a>Browser Matrix

| **OS**  | **OS Version**  |**Browser**| **Browser Version** | **Testing Type** |
|---      |---              |---        |---                  |---               |
|Windows  | 10              |  Edge     | 13+ (Latest)        | **Full**             |
|Windows  | -               |  IE       | 11                  | **Full**             |
| Windows/MacOS       | -               | Firefox   | 44+ (Latest)        | **Full**             |
| Windows/MacOS       | -               | Chrome | 48+ (Latest)        | **Full**             |
| MacOS       | 10.8+               | Safari | 9+ (Latest)        | **Full**             |

### <a name="MobileMatrix"></a>Mobile Matrix

| **Device**  | **OS**  | **OS Version**  |**Browser**| **Browser Version** | **Testing Type** |
|---   |---   |---              |---        |---                  |---               |
|IPhone       | IOS     |  9.2+           | Safari    | -|**Full** |
|IPad| IOS     |  9.2+           | Safari    | -|**Full** |
|Galaxy S6 | Android |  5.1.1           | Chrome | -|**Full** |
|Samsung S5| Android |  5.0+           | Chrome | -|**Full** |


### <a name="TechnologiesUsed"></a>Technologies Used

#### Front-end

* Bootstrap v3+ ([link](http://getbootstrap.com))
* Modernizr v3+ ([link](https://modernizr.com/))
* jQuery v3+ (Optional) ([link](https://jquery.com/))

#### Build Tools

* Gulp v3+ ([link](http://gulpjs.com/))
* SASS v3+ ([link](http://sass-lang.com/))
* Babel v6+ ([link](http://babeljs.io/))
* Browserify v13+ ([link](http://browserify.org/))
* Nunjucks v2+ ([link](https://mozilla.github.io/nunjucks/))
* [vccp-dev](https://github.com/vccp/vccp-dev)


----------

## <a name="GettingStarted"></a>Getting Started

### <a name="Prerequisites"></a>Prerequisites
 You are going to need:

* Node  ([link](https://nodejs.org/en/))
* Gulp-CLI   ([link](https://github.com/gulpjs/gulp-cli))
* Bower ([link](https://bower.io/))
* [vccp-dev](https://github.com/vccp/vccp-dev)

####Environments
This project has been built and tested on the following machines/systems:

* Mac
* Windows 10

### <a name="Setup"></a>Setup
**VCCP Dev**  
1. Create repo for project.  
2. `cd` into project folder  
3.  Run `vccp-dev init --static-site-seed`  

**Standalone**  
1. Clone this repo for project.  
2. `cd` into project folder  
3.  Run `npm install` and `bower install`  

----------

## <a name="Development"></a>Development

### <a name="Serve"></a>Serve
`gulp serve`

### <a name="Architecture"></a>Architecture
Folder structure:

```html
.tmp/ <!-- Temporary files -->
dist/ <!-- Compiled code -->
gulp/ <!-- Workflow/Gulp code -->
src/  <!-- Development source code -->
  |- fonts/
  |- images/
  |- scripts/
  |- styles/
  |- templates/ <!-- HTML templates -->
  |- test/ <!-- Testing code -->

```

### <a name="Develop"></a>Develop

**HTML**

* DO NOT EDIT THE HTML FILES ON THE TOP LEVEL OF SRC.
* Edit files in `src/templates` which generate the top level HTML files using [Nunjucks](https://mozilla.github.io/nunjucks/).
  * `src/templates/layouts` are layouts which a page inherits.
  * `src/templates/modules` are self contained modules that can be imported into a layout or a page.
  * `src/templates/pages` are pages that will be generated from the combination of its content, the layout and modules.

**Styles**

* Edit scss file in the `src/styles` folder.
  * `src/styles/main.scss` is the main file that import other scss files.
  * Other scss partial files start with an underscore.
  * Third party styles are imported from the bower folder.
  * If you are editing third party styles copy the file into the styles folder and change the import in the main.scss.

**Scripts**

* Javascript is written in ES6/ES2015 utilizing modules.
  * `src/scripts/main.js` is the main file that import other JS files.
  * JS is transpiled using Babel and Browserify to create `bundle.js`


**Images**

* Images are optimizied in the build step.
* SVG icon spritesheet `src/images/icons.svg` are generated from the files in `src/images/icons`.
  * See [SVG Icon Process](https://cloudfour.com/thinks/our-svg-icon-process/) for more information.

### <a name="Build"></a>Build
`gulp` OR `gulp dist`

----------

## <a name="VersionControl"></a>Version Control


### <a name="Branches"></a>Branches
| **Branch**  | **Description**  |
|---      |---              |
|develop| This branch is used for stable development source code and will be used to compile code for staging.|
|staging| This branch is compiled code for staging servers. This code should be the compiled code from develop branch.|
|uat|This branch is compiled code QA.|
|master| This branch should be the source code deployed to the live environment. Do not merge into this branch unless you wish to deploy live.|
|release| This branch will have the compiled source code from the master branch and will be the code deployed to the live environment|
|documentation| This branch will be to store images and files for documentation|

#### Creating Branches

Always create a branch from **develop**.

To create a **feature** branch, follow the naming convention below:
```
sprint-1/feature/feature-name
```

To create a **bug-fix** branch, follow the naming convention below:
```
sprint-1/bug-fix/bug-name
```


### Lint Your Code

Please ensure all code is linted via the following command otherwise you cannot merge code to develop.
```
vccp-dev lint
```

### Merging Code to Develop

You should only use the following command when merging to the `develop` branch.

```
vccp-dev merge-to-develop
```

----------

## <a name="ReleasingCode"></a>Releasing Code
To release your code, use the following command:

```
vccp-dev release [--prod | --uat]
```

### Flags

Please read the documentation for [vccp-dev](https://github.com/vccp/vccp-dev).

| **Name**  | **Description**  |
|---   |---   |
|--uat| releases compiled code to the `uat` branch|
|--prod| pushes development code to the `master` branch and releases compile to the `release` branch. A **tag** will be created. |
