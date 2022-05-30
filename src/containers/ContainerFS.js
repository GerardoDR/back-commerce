const fs = require('fs');

class ContainerFS{
    constructor(fileName){
        this.fileName = fileName;
    }
    
    saveInFile(content) {
        fs.writeFileSync(this.fileName, JSON.stringify(content, null, 2));
    }

    getContentFile() {
        let content = [];

        try {
            let file = fs.readFileSync(this.fileName, 'utf-8');
            content = JSON.parse(file);
        } catch (error) {
            this.saveInFile(content);
            console.log(`Creacion del archivo ${this.fileName}`);
        }

        return content;
    }
}

module.exports = { ContainerFS }