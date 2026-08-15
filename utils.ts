export function isNullOrUndefined(value: any): boolean {  return value === null || value === undefined;}

export function deepClone<T>(obj: T): T {  return JSON.parse(JSON.stringify(obj));}

export function formatDate(date: Date, format: string): string {  const options = {    year: 'numeric',    month: '2-digit',    day: '2-digit',  };  return new Intl.DateTimeFormat('en-US', options).format(date);}

export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {  let timeout: NodeJS.Timeout;  return function executedFunction(...args: any[]) {    const later = () => {      clearTimeout(timeout);      func(...args);    };    clearTimeout(timeout);    timeout = setTimeout(later, wait);  } as T;}

export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {  let lastFunc: NodeJS.Timeout;  let lastRan: number;  return function() {    const context = this;    const args = arguments;    if (!lastRan) {      func.apply(context, args);      lastRan = Date.now();    }    clearTimeout(lastFunc);    lastFunc = setTimeout(function() {      if ((Date.now() - lastRan) >= limit) {        func.apply(context, args);        lastRan = Date.now();      }    }, limit - (Date.now() - lastRan));  } as T;}