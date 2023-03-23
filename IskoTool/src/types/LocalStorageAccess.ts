export function saveToLocal(key: string, value: any[]) {
    return localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromLocal(key: string) {
    return JSON.parse(localStorage.getItem(key));
}
