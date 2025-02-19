const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");



const directory = path.join(__dirname, "audio");
const files = fs.readdirSync(directory);
const filesArray = files.filter((file) => file.endsWith(".mp3") || file.endsWith(".flac") || file.endsWith(".wav")).map((file) => path.join(directory, file));

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1400,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    win.removeMenu();
    win.setIcon("./logo.png");
    win.webContents.openDevTools();
    win.loadFile(path.join(__dirname, "ui/build/index.html"));
    //win.loadURL("http://localhost:3000");
    win.webContents.once('did-finish-load', () => {
        win.webContents.setZoomFactor(0.9); // 
        win.webContents.send("audio-files-array", filesArray);
    });

    ipcMain.on("toggle-playing-audio", (_event, data) => {
        win.webContents.send("toggle-audio", data);
    });
}

app.on("ready", () => {
    createWindow();

    ipcMain.handle("get-audio-files", async () => {
        return filesArray;
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    });

});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});