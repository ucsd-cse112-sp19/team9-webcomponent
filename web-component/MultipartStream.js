
class MultipartParser {
    constructor(target, boundary) {
        this.target = target;
        this.boundary = boundary;
        this.inBody = false;
        this.contentLength = 0;
        this.working = "";
    }
    append(chunk) {
        if(!this.inBody) {
            this.appendHeader(chunk);
        } else {
            this.appendBody(chunk);
        }

    }
    appendHeader(chunk) {
        const endHeader = chunk.indexOf("\r\n\r\n");
        if(endHeader != -1) {  // end of headers
            this.working += chunk.substr(0, endHeader);
            // console.log("HEADERS:");
            // console.log(this.working);

            const cli = this.working.indexOf("Content-Length: ");

            const cls = this.working.substr(cli);

            const cln = cls.substr(cls.indexOf(" "));

            this.contentLength = parseInt(cln);

            // console.log("CONTENT-LENGTH: " + this.contentLength);

            this.working = chunk.substr(endHeader + 4);
            this.inBody = true;
        }
    }
    appendBody(chunk) {
        const remaining = this.contentLength - this.working.length;
        this.working += chunk.substr(0, remaining);

        if(chunk.length >= remaining) {
            this.target.notify(this.working);
            this.inBody = false;
            this.working = "";
            this.appendHeader(chunk.substr(remaining));
        }
    }
}

class MultipartStream extends HTMLElement {
    constructor(){
        super();

        this.target = { append: () => {} };


        const parser = new MultipartParser(this, "--frame");

        const xhr = new XMLHttpRequest();

        // xhr.addEventListener("progress", this.newChunk,);
        xhr.open("GET", "/messages", true);
        var loaded = 0;
        xhr.onprogress = e => {
            const chunk = xhr.response.substr(loaded);
            // console.log(chunk);
            parser.append(chunk);
            loaded = e.loaded;
        };


        xhr.send();

    }

    notify(e) {
        this.target.append(e);
    }

    setTarget(target) {
        this.target = target;
    }
}

customElements.define('multipart-stream', MultipartStream);