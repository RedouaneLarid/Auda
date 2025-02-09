const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    getAudioFiles: () => {
        ipcRenderer.invoke("get-audio-files").then(res => {
            res.forEach(file => {
                const AudioElement = document.createElement("li");
                AudioElement.innerText = file.split(/[\\/\.]/).slice(file.split(/[\\/\.]/).length - 2, file.split(/[\\/\.]/).length - 1);
                AudioElement.id = file;
                AudioElement.onclick = () => {
                    ipcRenderer.send("toggle-playing-audio", file);
                }
                document.getElementById("audio-list").append(AudioElement);
            })
        });
    },

    onToggle: (callback)=>{
        ipcRenderer.on("toggle-audio" , (_event , data) => callback(_event , data));
    },

    getFilesArray: (callback) =>{
        ipcRenderer.on("audio-files-array" , (_event , data) => callback(_event , data));
    }
});
