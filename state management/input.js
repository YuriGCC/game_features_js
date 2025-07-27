export default class InputHandler {
    constructor() {
        this.lastKey = '';
        
        window.addEventListener('keydown', (e) => {
            switch(e.key) {
                case "a":
                    this.lastKey = "PRESSIONE esquerda";
                    break;
                case "d":
                    this.lastKey = "PRESSIONE direita";
                    break;
                case "s":
                    this.lastKey = "PRESSIONE baixo"
                    break;
                case "w":
                    this.lastKey = "PRESSIONE cima"
                    break;
            }
        });

        window.addEventListener('keyup', (e) => {
            switch(e.key) {
                case "a":
                    this.lastKey = "SOLTE esquerda";
                    break;
                case "d":
                    this.lastKey = "SOLTE direita";
                    break;
                case "s":
                    this.lastKey = "SOLTE baixo";
                    break;
                case "w":
                    this.lastKey = "SOLTE cima";
                    break;
            }
        });
    }
}