# Word O’Clock



## Features

- Zen mode: remove all the distractions ([link](https://wordoclock.netlify.app/?zen=true))
- [Screensaver mode](#screensaver): make the quotes dance around the screen! ([link](https://wordoclock.netlify.app/?screensaver=true))
- Languages: supports English, Spanish, Portuguese, French, and Italian (by default, it will try to use the system language)
  - Random language: see a quote in a different language each minute, isn't that cool? ([link]([https://wordoclock.netlify.app/?locale=random](https://wordoclock.netlify.app/?random-locale=true)))
- [Themes](#themes): the clock has `colour themes` and `special themes` and each theme has light and dark variants, of course
  - Random colour theme: see a different colour theme each minute, isn't that even cooler? ([link](https://wordoclock.netlify.app/?theme=color-system))
- Fade effect
- Font personalization: if you don't like the default font of a theme, that's perfectly fine, we won't judge you, so you can change it for another using the `font` param!
- Responsive: no matter how long a quote is, it will always look good on desktop and mobile 😎
- Static mode: get rid of all the javascript event listener an control the clock only with query parameters
- All the settings are saved in the browser's local storage and they are updated in the URL without refreshing the page, thanks to History API

## Settings

The clock can be controlled using URL parameters, these parameters will overwrite the existing configuration

- `zen`: enable/disable Zen mode
- `screensaver`: enable/disable Screensaver mode
- `locale`: set the locale
- `theme`: set the theme
- `font`: set a custom font from Google Fonts (it will be available on the font selector input!)
- `fade`: enable/disable fade effect
- `show-time`: enable/disable the time at the top of the screen
- `static`: get rid of the menu and control the clock only with query parameters!

Developer settings

- `time`: get the quotes for a particular time ([link](https://wordoclock.netlify.app/?time=12:30))

## Languages

There is support for 15 languages (by default, it will try to use the system language).

Want to implement a new language? Sure thing, ping me and let's talk about it!

## Contribute

If you want to help you can:

- [Raise an issue to add a new quote](https://github.com/cdmoro/wordoclock/issues/new?template=add-quote.yml&labels=add-quote&title=%5B23%3A28%5D%5Ben%5D+Add+quote) or a new variant for a specific time
- Raise an issue reporting a bug related to a quote (i.e. a typo)
- Contact me and share your thoughts about a quote, the project, or anything you want :D
- Show me your love in the form of [coffees](https://buymeacoffee.com/cdmoro), [cafecitos](http://cafecito.app/cdmoro)
- Be my [Patreon](https://patreon.com/cdmoro)

## Screensaver

If you want to use this clock as a screensaver there are several ways to address this, although, it depends on the OS. I'm currently using the Mac OS solution and it worked like a charm. You can find more information here:

- Mac OS: Mac OS X Screen Saver powered by a Web View (https://github.com/liquidx/webviewscreensaver)
- Windows: Set Webpage as Screensaver in Windows 10 (https://www.youtube.com/watch?v=UovZwUlwwEs)
- Linux: Live Webpage as a Desktop Wallpaper on KDE Desktop (https://www.youtube.com/watch?v=_v1sJhBu25o)

## Themes

Some nice themes, locale and font combinations!

### Photo

https://wordoclock.netlify.app/?theme=photo-system

|Fuzzy| Fuzzy + Solid |
|---|---|
|![image](https://github.com/user-attachments/assets/05c47c65-a885-4222-9cf4-22f521b8c524)|![image](https://github.com/user-attachments/assets/b3ef48fd-8e45-4932-a682-0239a93b15e3)|

## Development

### Web

To run the project you need Node and NPM installed on your system.
  1. Clone the project
  1. Install NPM dependencies
  1. Run `npm run dev` and voila! The clock will be automatically opened in your favorite browser.

## Technology stack

This project is possible thanks to the following projects:

- [Vite](https://vite.dev/)
- [Vitest](https://vitest.dev/)
- [Husky](https://typicode.github.io/husky/)
- [Netlify](https://www.netlify.com/)

## Credits

- [lunarphase-js](https://github.com/jasonsturges/lunarphase-js)
- [Picsum](https://picsum.photos/)

## Contact

Hi! I'm Carlos and you can find me here

- [Twitter](https://twitter.com/CarlosBonadeo)
- [LinkedIn](https://twitter.com/CarlosBonadeo)
