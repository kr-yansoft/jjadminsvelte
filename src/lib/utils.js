export function setPageTitle(title) {
  document.title = `J.J Casino | ${title}`;
}

export function slideUp(elm, duration = 300) {
	if (!elm.classList.contains('transitioning')) {
		elm.classList.add('transitioning');
		elm.style.transitionProperty = 'height, margin, padding';
		elm.style.transitionDuration = duration + 'ms';
		elm.style.boxSizing = 'border-box';
		elm.style.height = elm.offsetHeight + 'px';
		elm.offsetHeight;
		elm.style.overflow = 'hidden';
		elm.style.height = 0;
		elm.style.paddingTop = 0;
		elm.style.paddingBottom = 0;
		elm.style.marginTop = 0;
		elm.style.marginBottom = 0;
		window.setTimeout( () => {
			elm.style.display = 'none';
			elm.style.removeProperty('height');
			elm.style.removeProperty('padding-top');
			elm.style.removeProperty('padding-bottom');
			elm.style.removeProperty('margin-top');
			elm.style.removeProperty('margin-bottom');
			elm.style.removeProperty('overflow');
			elm.style.removeProperty('transition-duration');
			elm.style.removeProperty('transition-property');
			elm.classList.remove('transitioning');
		}, duration);
	}
}

export function slideDown(elm, duration = 300) {
	if (!elm.classList.contains('transitioning')) {
		elm.classList.add('transitioning');
		elm.style.removeProperty('display');
		let display = window.getComputedStyle(elm).display;
		if (display === 'none') display = 'block';
		elm.style.display = display;
		let height = elm.offsetHeight;
		elm.style.overflow = 'hidden';
		elm.style.height = 0;
		elm.style.paddingTop = 0;
		elm.style.paddingBottom = 0;
		elm.style.marginTop = 0;
		elm.style.marginBottom = 0;
		elm.offsetHeight;
		elm.style.boxSizing = 'border-box';
		elm.style.transitionProperty = "height, margin, padding";
		elm.style.transitionDuration = duration + 'ms';
		elm.style.height = height + 'px';
		elm.style.removeProperty('padding-top');
		elm.style.removeProperty('padding-bottom');
		elm.style.removeProperty('margin-top');
		elm.style.removeProperty('margin-bottom');
		window.setTimeout( () => {
			elm.style.removeProperty('height');
			elm.style.removeProperty('overflow');
			elm.style.removeProperty('transition-duration');
			elm.style.removeProperty('transition-property');
			elm.classList.remove('transitioning');
		}, duration);
	}
}

export function slideToggle(elm, duration = 300) {
	if (window.getComputedStyle(elm).display === 'none') {
		slideDown(elm, duration);
	} else {
		slideUp(elm, duration);
	}
}

export function convertNumberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function checkIsFloat(x){
	return Number(x) === x && x % 1 !== 0;
};

export function checkIsInt(x){
	return Number(x) === x && x % 1 === 0;
};

export function countDecimals(x) {
	var split = x.toString().split('.');

	return (split[1]) ? split[1].length : 0; 
};

export function animateNumber() {
	var elms = [].slice.call(document.querySelectorAll('[data-animation]'));
	if (elms) {
		elms.map(function(elm) {
			var targetAnimate = elm.getAttribute('data-animation');
			var targetValue = elm.getAttribute('data-value');
			
			switch (targetAnimate) {
				case 'width':
					setTimeout(() => {
						elm.style.width = targetValue;
					}, 250);
					break;
				case 'height':
					setTimeout(() => {
						elm.style.height = targetValue;
					}, 250);
					break;
				case 'number':
					var targetElm = elm;
					var decimal = countDecimals(targetValue);
					var divide = 1;
					var x = decimal;
					while (x > 0) {
						divide *= 10;
						x--;
					}
			
					const animate = () => {
						const value = +(targetValue.replace(',', ''));
						const data = +((targetElm.count) ? targetElm.count : 0);
						const time = value / 300;
				
						if (data < value) {
							var targetText = data + time;
							targetElm.innerText = convertNumberWithCommas((targetText).toFixed(decimal));
							targetElm.count = targetText;
							setTimeout(animate, 1);
						} else {
							targetElm.innerText = convertNumberWithCommas(value);
						}
					}
					animate();
					break;
				case 'class':
					elm.classList.add(targetValue);
					break;
			}
		});
	}
}