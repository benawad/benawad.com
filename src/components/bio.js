/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/IMG_2629.jpg/" }) {
        childImageSharp {
          fixed(width: 200, height: 200, quality: 80, cropFocus: SOUTH) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata
  return (
    <div
      style={{
        marginBottom: rhythm(2.5),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
        }}
      />
      <p>
        I'm a Software Consultant who enjoys making programming videos on{" "}
        <a
          href="https://youtube.com/c/benawad97"
          target="_blank"
          rel="noopener noreferrer"
        >
          YouTube
        </a>{" "}
        and building a cooking app called{" "}
        <a
          href="https://www.mysaffronapp.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Saffron
        </a>
        or my newest app called{" "}
        <a
          href="https://dogehouse.tv/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dogehouse
        </a>
        . My favorite technologies right now are: React.js, Typescript, GraphQL,
        Node.js, and PostgreSQL.
      </p>
      <p>Follow Me Online Here:</p>
      <ul>
        <li>
          <a
            href="https://twitter.com/benawad"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </li>
        <li>
          <a
            href="https://github.com/benawad"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://discord.gg/Vehs99V"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
        </li>
      </ul>
      <p>
        <Link to="/speaking">Interested in having me speak at an event?</Link>
      </p>
    </div>
  )
}

export default Bio
