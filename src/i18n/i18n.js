import { init, register, getLocaleFromNavigator, locale as svelteLocale, t } from 'svelte-i18n';
import { writable } from 'svelte/store';

export const customLocale = writable(undefined);

Promise.all([
    register('en', () => import('../locales/en-US.json')),
    register('ko', () => import('../locales/ko-KR.json'))
])
.then(() => {
   
    let detectedLocale = getLocaleFromNavigator();

 
    if (detectedLocale.startsWith('ko')) {
        detectedLocale = 'ko-KR';
    } else if (detectedLocale.startsWith('en')) {
        detectedLocale = 'en-US';
    }

    const initialLocale = detectedLocale === 'ko-KR' ? 'ko-KR' : 'en-US';


    init({
        fallbackLocale: 'en-US',
        initialLocale: initialLocale,  
    }).then(() => {
        svelteLocale.set(initialLocale);  
        customLocale.set(initialLocale);

       
    }).catch(error => {
       
    });

    
    customLocale.subscribe((value) => {
        if (value) {
           
            svelteLocale.set(value);  
        }
    });
})
.catch(error => {
    
});

export { customLocale as locale, t};
