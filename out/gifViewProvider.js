"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GifViewProvider = void 0;
const vscode = __importStar(require("vscode"));

class GifViewProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }

    resolveWebviewView(webviewView, context, token) {
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };
        webviewView.webview.html = this.getHtmlContent(webviewView.webview);
    }

    getHtmlContent(webview) {
     
        const gifFiles = Array.from({ length: 37 }, (_, i) => `uwu${i + 1}.gif`);

      
        const gifPaths = gifFiles.map(gif => webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'assets', gif)).toString());

        const musicPath = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'assets', 'Congratulations.mp3')).toString();

      
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title></title>
          <style>
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              height: 100vh;
              margin: 0;
            }

            img {
              max-width: 100%;
              max-height: 100%;
            }

            audio {
              margin-top: 20px;
              width: 100%;
            }
          </style>
        </head>
        <body>
          <img id="gif" src="${gifPaths[0]}" />
          <audio controls autoplay loop>
            <source src="${musicPath}" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
          <script>
            const gifPaths = ${JSON.stringify(gifPaths)};
            
           
            function getRandomIndex(excludeIndex) {
              let randomIndex;
              do {
                randomIndex = Math.floor(Math.random() * gifPaths.length);
              } while (randomIndex === excludeIndex); 
              return randomIndex;
            }

            let currentIndex = 0;

            //5 min
            setInterval(() => {
              const gifElement = document.getElementById('gif');
              currentIndex = getRandomIndex(currentIndex); 
              gifElement.src = gifPaths[currentIndex];
            }, 300000);
          </script>
        </body>
        </html>`;
    }
}

exports.GifViewProvider = GifViewProvider;
GifViewProvider.viewType = 'shikanokoNokonokoView';
//# sourceMappingURL=gifViewProvider.js.map