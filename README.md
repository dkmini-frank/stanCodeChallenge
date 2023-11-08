<div align="center">
	<br/>
	<div style="margin:auto">
		<span style="font-size:200%">.stan interview project</span>
	</div>
</div>

# Description

This is the .stan interview project, this file will mainly explain how this project design and work

I need to apologize here, because I received the code challenge task on the 7th/11/2023, but I had made an appointment with my family on the evening of the 7th, so I could only complete this task when I got off work on the 8th, so the time was not very sufficient. Only the programcard has been write testing here, and the rest of the tests have not been completed.

# Project Structure

## Overview

<!-- DIRSTRUCTURE_START_MARKER -->
<pre>
stanInterview/
├─ README.md ........................ readme file
├─ babel.config.json ................ babel file
├─ jest.config.js ................... jest config file
├─ package-lock.json ................ package lock file for version lock
├─ package.json ..................... package file
├─ postcss.config.js ................ css auto prefix file
├─ tsconfig.json .................... typescript config file
├─ public/ .......................... static asset file
│  ├─ favicon.ico ................... favicon using .stan logo screenshot
│  ├─ index.html .................... production env index.html file
│  └─ indexDev.html ................. development env index.html file
├─ src/ ............................. developer mainly working file
│  ├─ global.css .................... global css config file
│  ├─ global.d.ts ................... Typescript third part dependence declare file
│  ├─ index.tsx ..................... app entry file
│  ├─ Api/ .......................... mainly using for api call but in this project will only using promise to mock api fetch and return the data
│  │  └─ mockMovieData.ts ........... mock data and mock api call
│  ├─ Assets/ ....................... all the assets folder
│  │  └─ Images/ .................... image folder
│  │     └─ logo.svg ................ logo
│  ├─ Components/ ................... component will only using for this project
│  │  ├─ Carousel/ .................. 
│  │  │  ├─ index.tsx ............... 
│  │  │  └─ style.scss .............. 
│  │  ├─ Header/ .................... 
│  │  │  ├─ index.tsx ............... 
│  │  │  └─ style.scss .............. 
│  │  ├─ ProgramCard/ ............... 
│  │  │  ├─ index.tsx ............... 
│  │  │  └─ style.scss .............. 
│  │  └─ _test_/ .................... testing folder
│  │     └─ unit/ ................... 
│  │        └─ ProgramCard.test.tsx . 
│  ├─ DefaultData/ .................. default setting data
│  │  └─ HeaderData/ ................ header default data folder
│  │     └─ headerData.ts ........... 
│  ├─ Pages/ ........................ all app pages here
│  │  ├─ Homepage/ .................. 
│  │  │  ├─ index.tsx ............... 
│  │  │  └─ style.scss .............. 
│  │  ├─ ProgramPage/ ............... 
│  │  │  ├─ index.tsx ............... 
│  │  │  └─ style.scss .............. 
│  │  └─ _test_/ .................... 
│  ├─ Route/ ........................ route for the app
│  │  └─ index.tsx .................. 
│  └─ Store/ ........................ redux, redux-saga management folder, this project are not using redux as it's not necessary
│     ├─ rootReducer.ts ............. 
│     ├─ rootSaga.ts ................ 
│     ├─ rootStore.ts ............... 
│     └─ HomePage/ .................. 
│        ├─ actions.ts .............. 
│        ├─ reducer.ts .............. 
│        └─ types.ts ................ 
└─ webpackConfig/ ................... webpack configration file
   ├─ webpack.common.js ............. 
   ├─ webpack.dev.js ................ 
   └─ webpack.prod.js ............... 
</pre>
<!-- DIRSTRUCTURE_END_MARKER -->

## Customize webpack according to task requirements

I gave comments in webpack and completed all packaging requirements according to the task requirements, including the naming of the target folder, and the naming and storage location of the required js, css, logo.svg and html files.

for example

```javascript
plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            // .stan code challenge don't want faviocn in the build fild
            // favicon: './public/favicon.ico',
        }),
        // .stan code challenge only need style.css file so don't need gzip css
        // new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
        new MiniCssExtractPlugin({ filename: 'style.css' }),
        // new CompressionPlugin({ test: /\.js(\?.*)?$/i, algorithm: 'gzip' }),
    ],
    output: {
        // .stan code challenge only need app.js file so don't need code splitting
        // filename: 'js/[name].[contenthash].js',
        // chunkFilename: 'js/[name].[contenthash].js',
        filename: 'app.js',
    },
```

## Run The Project

```javascript
npm run start
```

## build the Project

```javascript
npm run build
```

# run testing

```javascript
npm run test
```

# data fetch

I am using a promise to insead of real ajax call, and set up a 2s time delay to show the loading skeleton

## carousel design solution

First of all, the basic functions of the carousel are all completed. I added the isLoading state and errorState props to the carousel, so when you pass the different props, it will return different UI, and the data of the carousel is passed through parameters too, so that it can be achieved through multiple states of a component. High reusability.

```javascript
interface CarouselProps {
    data: moiveData[] | undefined;
    isLoading: boolean;
    error: boolean;
}
<Carousel data={backEndData} isLoading={isLoading} error={errorStatus} />
```

## Header design solution

I also made the header as a component, because it will be using in two pages, the header content is also pass as props, so it's more flexible for using

```javascript
interface HeaderProps {
    // each menu item as a string to pass in
    // each menu item link as a string to pass in
    menuList?: { name: string; id: number; link: string }[];
}
```

## programcard design solution

the programcard component have the same solution as carousel, it also have three props in order for resuable

```javascript
// program card props interface
interface ProgramCardProps {
    data: moiveData | undefined;
    isLoading: boolean;
    errorStatus: boolean;
}
<ProgramCard data={movieDetail} isLoading={isLoading} errorStatus={errorStatus} />
```

## improvement for this project if there is more time

1. I will finish all the unit testing for all componet and page
2. the carousel should be able to add animation to make it looks nice
3. the responsive should have more breakpoint to suit different screen size
