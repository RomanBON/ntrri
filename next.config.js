/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    i18n: {
        // These are all the locales you want to support in
        // your application
        locales: ["en", "de"],
        // This is the default locale you want to be used when visiting
        // a non-locale prefixed path e.g. `/hello`
        defaultLocale: "en",
        // This is a list of locale domains and the default locale they
        // should handle (these are only required when setting up domain routing)
        // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
        domains: [
            {
                domain: "example.com/en",
                defaultLocale: "en",
            },
            {
                domain: "example.com/de",
                defaultLocale: "de",
            },
        ],
    },
}

module.exports = nextConfig;
