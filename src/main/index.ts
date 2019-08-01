'use strict'
import { app, BrowserWindow, ipcMain, shell, dialog } from 'electron'
import fs from 'fs'
import * as path from 'path'
import { format as formatUrl } from 'url'

declare const __static: string;
const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: BrowserWindow;

function createMainWindow() {
  const window = new BrowserWindow({
    icon: path.join(__static, "./icons/win/favicon.ico"),
    minWidth: 800,
    minHeight: 600,
    title: 'Milestone Deployment Assistant',
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true
    }
  });

  //prevent app title from updating
  window.on('page-title-updated', (evt): void => {
    evt.preventDefault();
  });

  //disable the toolbar
  window.setMenu(null);

  //open devtools in development
  if (isDevelopment) {
    window.webContents.openDevTools()
  }

  //run webpack server in development 
  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  }
  else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  window.on('closed', () => {
    mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}


// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
})

//print to PDF
ipcMain.on('print-to-pdf', (event: { sender: Electron.WebContents; }, filename: string) => {

  const win = BrowserWindow.fromWebContents(event.sender)

  //open save dialog, pass in the filename and restrict filetype to PDF
  dialog.showSaveDialog({
    defaultPath: `${filename}.pdf`,
    filters: [{ name: 'PDF', extensions: ['pdf'] }]
  }, pdfPath => {
    if (pdfPath) {
      win.webContents.printToPDF({ pageSize: "Letter" }, (error, data) => {
        if (error) return console.log(error.message);

        fs.writeFile(pdfPath, data, err => {
          if (err) return console.log(err.message);
          shell.openExternal(`file://${pdfPath}`);
        });
      });
    }
    event.sender.send('print-done');
  });
});

ipcMain.on('export-data', (event: { sender: { send: (arg0: string) => void; }; }, data: string, filename: string) => {

  dialog.showSaveDialog({
    defaultPath: `${filename}.mddata`,
    filters: [{ name: 'Milestone Deployment Data', extensions: ['mddata'] }]
  }, filePath => {
    if(filePath){
      fs.writeFile(filePath, data, err => {
        if (err) return console.log(err.message);
      });
    }
    event.sender.send('export-done');
  })
});
