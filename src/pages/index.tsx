import type { NextPage, GetStaticPropsContext } from "next";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import { Languages } from "~/constants";
import { wrapper } from "~/redux/store";
import { i18n, posts } from "~/redux/features";
import { useAppSelector } from "~/redux/hooks";
import Posts from "~/components/Posts";

interface Page extends GetStaticPropsContext {}

const Home: NextPage = (props: Page) => {
    const t = useAppSelector(i18n.slice.translations());
    const getSupportedLanguages = useAppSelector(i18n.slice.getSupportedLanguages());

    return (
        <div>
            <Head>
                <title>Next.js / Typescript / React / Redux / I18N</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/public/favicon.ico" />
            </Head>

            <Image
                src="/jsonplaceholder.png"
                alt="Jsonplaceholder Logo"
                width={184}
                height={148}
            />

            <div>
                {Object.entries(getSupportedLanguages).map(
                    ([code, name]) => (
                        <Link
                            key={code}
                            href="/"
                            locale={code}
                        >
                            <button>{name}</button>
                        </Link>
                    ),
                )}
            </div>

            <p>{t.tagline}</p>
            <p>{t.ratings}</p>

            <Posts />
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
    const { locale, query } = ctx;
    const { dispatch } = store;
    const language = locale as Languages || Languages.EN;

    // Need here for SSR
    await dispatch(posts.slice.get());
    await dispatch(i18n.slice.get({ language }));


    return {
        props: { language, query },
    };
});

export default Home;
