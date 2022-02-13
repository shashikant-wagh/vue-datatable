let StringExtends = {
    capitalize() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
};

let ObjectExtends = {
    sanitize() {
        return JSON.parse(JSON.stringify(this));
    },

    toSlug() {
    	return this.toLowerCase().replace(' ', '-');
    },

    empty() {
        return (Object.keys(this).length === 0);
    },

    isEqualsTo(comparedWith) {
        return JSON.stringify(this) === JSON.stringify(comparedWith);
    },

	exclude(indexes) {
		if(typeof indexes === 'string') {
			indexes = [indexes];
		}

		return Object.fromEntries(
			Object
				.entries(this.sanitize(this))
				.filter(([index, _]) => !indexes.includes(index))
		);
	}
};

// Extending String prototype
Object.keys(StringExtends).map((functionName) => {
    Object.defineProperty(String.prototype, functionName, {
        value(...params) {
            return StringExtends[functionName].apply(this, params);
        }
    });
});


// Extending Object prototype
Object.keys(ObjectExtends).map((functionName) => {
    Object.defineProperty(Object.prototype, functionName, {
        value(...params) {
            return ObjectExtends[functionName].apply(this, params);
        },
        writable: true
    });
});
