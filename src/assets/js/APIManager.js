// Custom HTTP client
class APIManager {
	constructor() {
        this.cache = {};
        this.header = {};
        this.clearCache = false;
		this.baseURI = 'https://gorest.co.in/public/v2';
	}

	get(url, burstCache = false) {
        this.clearCache = burstCache;
		return this.httpClient('GET', this.baseURI+url);
	}

	post(url, params) {
        return this.httpClient('POST', this.baseURI+url, params);
	}

	put(url, params) {
		return this.httpClient('PUT', this.baseURI+url, params);
	}

	delete(url, params) {
        return this.httpClient('DELETE', this.baseURI+url, params);
	}

    setHeader(header) {
        this.header = header;
        return this;
    }

    httpClient(method, url, params) {
        if(!this.clearCache && this.cache[method+'-'+url]) {
            this.clearCache = false;
            return Promise.resolve(this.cache[method+'-'+url]);
        }

        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);

            Object
                .entries(this.header)
                .forEach(([key, value]) => {
                    console.log(key, value)
                    xhr.setRequestHeader(key, value)
                });

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let response = JSON.parse(xhr.response || '{}');
                    this.cache[method+'-'+url] = response;
                    resolve(response);
                } else {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                }
            };

            xhr.onerror = () => {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send(JSON.stringify(params || {}));
        });
    }
}

export default APIManager;