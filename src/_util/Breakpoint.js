/**
 * ブレイクポイント振り分けJS
 *
 */
export class BreakPoint {
	/**
	 *
	 * @param {object} options ブレイクポイントのobject
	 */
	constructor(options) {
		this.listeners = [];
		this.settings = {};
		this.obj = {};
		this.break_point_change_event ={};
		this.myquery    = [];
		this.myquery_cl = [];

		this.defaults = {
			breakpoints: [
				{width: 600, name: 'tablet'},
				{width: 960, name: 'PC'}
			]
		};

		if (options === undefined) {
			options = this.defaults;
		}
		this.settings.breakpoints = options.breakpoints || this.defaults.breakpoints;
		this.settings.breakpoints.unshift({width: 1, name: 'SP'});

		this._init();
	}

	/**
	 * _init
	 */
	_init() {
		//ブラウザ判定（旧IE event登録振り分け）
		if (typeof Event === 'function') {
			this.break_point_change_event = new CustomEvent('breakpoints');
		} else {
			this.break_point_change_event = document.createEvent('CustomEvent');
			this.break_point_change_event.initCustomEvent('breakpoints', true, true, null);
		}

		// メディアの組み立て
		this.settings.breakpoints.some((val, index) => {
			if (index === 0) {
				this.myquery.push('screen and (max-width: ' + (this.settings.breakpoints[index + 1]['width']) + 'px)');
			} else if (index === this.settings.breakpoints.length - 1) {
				this.myquery.push('screen and (min-width: ' + (val['width'] + 1) + 'px)');
			} else {
				this.myquery.push('screen and (max-width: ' + this.settings.breakpoints[index + 1]['width'] + 'px) and (min-width: ' + (this.settings.breakpoints[index]['width'] + 1) + 'px)');
			}
		});

		this.myquery_cl = [].concat(this.myquery);
		this.myquery_cl.some((val, index) => {
			this.myquery_cl[index] = this.myquery_cl[index].replace(/\s+/g, "");
		});

		this.dispatchEvent = (e, data) => {
			let observers = this.listeners[e.type] || '';
			if (observers !== '') {
				for (let i = 0; i < observers.length; ++i) {
					observers[i](data);
				}
			}
		};
		window.addEventListener('load', this._check_breakpoints.bind(this));
	}

	/**
	 * breakpoint dispatch
	 */
	_check_breakpoints() {
		this.myquery.some((val, index) => {
			// init
			if (window.matchMedia(this.myquery[index]).matches) {
				this.obj = {
					width     : window.innerWidth,
					breakpoint: this.settings.breakpoints[index]['width'],
					name      : this.settings.breakpoints[index]['name']
				};
				this.dispatchEvent(this.break_point_change_event, this.obj);
			}

			window.matchMedia(this.myquery[index]).addListener((e) => {
				if (e.matches) {
					let tmp = e['media'].replace(/\s+/g, "");

					// fire
					this.obj = {
						width     : window.innerWidth,
						breakpoint: this.settings.breakpoints[this.myquery_cl.indexOf(tmp)]['width'],
						name      : this.settings.breakpoints[this.myquery_cl.indexOf(tmp)]['name']
					};
					this.dispatchEvent(this.break_point_change_event, this.obj);
				}
			});
		});
	}

	/**
	 * イベントリスナー登録
	 * @param state
	 * @param callback
	 * @param isCapture
	 */
	addEventListener(state, callback, isCapture) {
		if (!this.listeners[state]) this.listeners[state] = [];
		this.listeners[state].push(callback);
	}

	/**
	 * イベントリスナー削除
	 * @param state
	 */
	removeEventListener(state) {
		if (!this.listeners[state]) return;
		this.listeners[state] = null;
	}

	getPoint() {
		return this.obj;
	}

	getName() {
		return this.obj['name'];
	}

	getBreakPoint() {
		return this.obj['breakpoint'];
	}

	getWidth() {
		return this.obj['width'];
	}
}