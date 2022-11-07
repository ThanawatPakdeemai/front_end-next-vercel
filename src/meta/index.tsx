import Head from "next/head"

interface IProp {
  title?: string
  description?: string
  image?: string
}

const Meta = ({
  title = "Nakamoto Games | Experience the biggest play-to-earn crypto gaming selection.",
  description = "Nakamoto Games offers gamers worldwide the opportunity to participate in countless blockchain-based games and generate a sustainable and sizable income",
  image = "/ng.png"
}: IProp) => (
  <Head>
    <title data-testid="title">{title}</title>
    <meta
      name="description"
      content={description}
    />
    <link
      rel="icon"
      href="https://files.naka.im/seo/favicon.png"
    />

    {/* Facebook */}
    <meta
      property="og:locale"
      content="en_US"
    />
    <meta
      property="og:type"
      content="website"
    />
    <meta
      property="og:title"
      content={title}
    />
    <meta
      property="og:description"
      content={description}
    />
    <meta
      property="og:site_name"
      content="NAKAMOTO Games"
    />
    <meta
      property="og:image"
      content={image}
    />
    <meta
      property="og:image:width"
      content="2400"
    />
    <meta
      property="og:image:height"
      content="1260"
    />

    {/* Twitter */}
    <meta
      name="twitter:card"
      content="summary_large_image"
    />
    <meta
      name="twitter:label1"
      content="Est. reading time"
    />
    <meta
      name="twitter:data1"
      content="10 minutes"
    />
    <meta
      name="twitter:image"
      content={image}
    />
    <meta
      name="twitter:card"
      content="summary"
    />
    <meta
      name="twitter:site"
      content="@NakamotoGames"
    />
  </Head>
)
export default Meta
