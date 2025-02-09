# Experimenting with the JavaScript built-in audio API and Electron Js.

**Note: while the app runs just fine , we do not recommand checking the code since it might cause you a serious brain damage,we followed the "Tiri brk" and "kima jat jat" principles which some people can find disturbing**

This Project is devided into two projects , the base directory represents the whole Electron application which also includes within this directory a react app. Each react component serves as a renderer process for the electron app, the web page can either be served directly from the build files (production), or as localhost served as a URL (for development only).

## Running Auda

In the project directory, you can run:

### `npm start`

If you make any changes in the react app , you should build it first before running the electron app:

in the ui directory ("cd ui"):

### `npm run build`

currently Auda only reads audio files from the audio folder in the root directory, we will later improve it so that you can select manualy the directory.


**Note: The app is still under development, honestly just playing with Electron, I will probably ditch it soon if it gets boring**

### MUSIC IS HARAM (not being sarcastic).

