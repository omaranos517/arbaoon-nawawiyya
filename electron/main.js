const { app, BrowserWindow } = require('electron')
const path = require('node:path')
import { readFileSync } from 'node:fs'

const cfg = JSON.parse(readFileSync(new URL('../app.config.json', import.meta.url)))
app.setAppUserModelId(cfg.appId)

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        title: 'الأربعون النووية',
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
        },
    })

    if (app.isPackaged) {
        win.loadFile(path.join(__dirname, '../dist/index.html'))
    } else {
        win.loadURL('http://localhost:5173')
    }
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})