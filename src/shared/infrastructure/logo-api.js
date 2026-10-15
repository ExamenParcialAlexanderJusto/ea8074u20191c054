const logoApiUrl = import.meta.env.VITE_LOGO_API_URL;
const logoApiToken = import.meta.env.VITE_LOGO_API_TOKEN;

export class LogoApi {
    getUrlToLogo(domain) {
        return `${logoApiUrl}/${domain}?token=${logoApiToken}&format=webp&retina=true`;
    }
}
