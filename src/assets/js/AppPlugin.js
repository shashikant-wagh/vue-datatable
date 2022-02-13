import './extensions.js';
import APIManager from './APIManager.js';

export default {
	install(app) {
		app.mixin({
			// Using mixin so these computed props will be available on all components
			computed: {
				apiManager:  {
	                cache: false,
	                get() {
	                    return new APIManager;
	                },
	            },

	            // In Vue 2 you can create global EventBus but not possible in Vue 3
	            // We need global EventBus for FlashMessage, following logic serve as global EventBus for Vue 3
	            EventBus() {
	            	return {
	            		listen: (event, callback) => window.addEventListener(event, callback, false),
	            		emit: (event, data) => window.dispatchEvent(new CustomEvent(event, {detail: data})),
	            	}
	            }
	        }
		});
	}
};