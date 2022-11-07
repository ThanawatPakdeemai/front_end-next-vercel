import React, { useState } from "react"
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material"
import type { SelectChangeEvent } from "@mui/material/Select"
import type { NextPage } from "next"
import Image from "next/image"
import SidebarTemplate from "@src/components/templates/sidebarTemplate"
import styles from "@src/styles/css/Home.module.css"

const Home: NextPage = () => {
  const [age, setAge] = useState<string>("")

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value)
  }

  return (
    <SidebarTemplate>
      <div className={styles.container}>
        <Button
          variant="contained"
          color="info"
        >
          Contained
        </Button>
        <Button
          variant="contained"
          color="primary"
        >
          Contained
        </Button>
        <Button
          variant="contained"
          color="success"
        >
          Contained
        </Button>
        <Button
          variant="contained"
          disabled
        >
          Disabled
        </Button>
        <Button
          variant="contained"
          href="#contained-buttons"
        >
          Link
        </Button>
        <Box className="max-w-[200px]">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>

          <div className={styles.grid}>
            <a
              href="https://nextjs.org/docs "
              className={styles.card}
            >
              <h2 className="text">Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a
              href="https://nextjs.org/learn "
              className={styles.card}
            >
              <h2>Learn &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>

            <a
              href="https://github.com"
              className={styles.card}
            >
              <h2>Examples &rarr;</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a
              href="https://vercel.com"
              className={styles.card}
            >
              <h2>Deploy &rarr;</h2>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/favicon.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </SidebarTemplate>
  )
}

export default Home
