export default function removeProtocolFromUrl(url: string) {
    return url.replace(/^https?:\/\//, '');
}
