export const API_PREFIX = 'link';

export function getLinkId(url: string) {
    const regex = new RegExp(`/${API_PREFIX}/([^/]+)`);
    const match = url.match(regex);

    return match ? match[1] : null;
}

export function getShortLinkById(url: string) {
    return window.location.origin + '/' + API_PREFIX + '/' + url;
}