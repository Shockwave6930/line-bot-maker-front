import React, { useState } from "react"
import Image from "next/image"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { createTheme } from "@mui/material/styles"
import { css } from "@mui/styled-engine"
import { ThemeProvider } from "@mui/material/styles"
import { useLiffOperation, useUser } from "../provider/LiffProvider"

const classes = {
  root: {
    flexGrow: 1,
    color: "#388e3c",
    backgroundColor: "#81c784",
  },
  appbar: {
    position: "fixed",
    top: 0,
    left: 0,
  },
  iconimage: {
    width: 32,
    height: 32,
    borderRadius: 999,
  },
  menuButton: {
    marginRight: 8,
  },
  title: {
    flexGrow: 1,
  },
} as const

const theme = createTheme({
  palette: {
    primary: {
      main: "#06c755",
    },
    secondary: {
      main: "#00bcd4",
    },
  },
})

const Header: React.FC = () => {
  const { logout, login } = useLiffOperation()
  const user = useUser()

  const [showPopover, setPopover] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <div css={css(classes.root)}>
        <AppBar css={css(classes.appbar)} position="static" color="primary">
          <Toolbar>
            {/* <IconButton
              edge="start"
              css={css(classes.menuButton)}
              style={{ color: "#f8faf7" }}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton> */}
            <Typography
              variant="h6"
              css={css(classes.title)}
              style={{ color: "#f8faf7", fontFamily: "M PLUS Rounded 1c" }}
            >
              Line Bot Maker
            </Typography>
            {user != null ? (
              <div className="relative">
                <IconButton
                  edge="end"
                  css={css(classes.menuButton)}
                  style={{ color: "#f8faf7" }}
                  aria-label="menu"
                  onClick={() => setPopover((prev) => !prev)}
                >
                  <Image
                    src={user.iconUrl ?? ""}
                    css={css(classes.iconimage)}
                    alt=""
                    width="32px"
                    height="32px"
                  />
                </IconButton>
                {showPopover && (
                  <div className="absolute top-full right-0 w-[240px] flex-col rounded bg-white shadow-md">
                    <div className="flex items-center space-x-2 border-b border-gray-200 px-4 py-4">
                      <div className="h-8 w-8 shrink-0">
                        <Image
                          src={user.iconUrl ?? ""}
                          css={css(classes.iconimage)}
                          alt=""
                          className="shrink-0"
                          width="32px"
                          height="32px"
                        />
                      </div>
                      <div>
                        <div>{user.name}</div>
                        <div className="text-xs">DEBUG: {user.id}</div>
                      </div>
                    </div>
                    <button
                      className="w-full px-4 py-3 text-left transition hover:bg-gray-100"
                      onClick={async () => {
                        await logout()
                      }}
                    >
                      ログアウト
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => login()}
                className="rounded border-2 border-white px-4 py-2 text-white"
              >
                ログイン
              </button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  )
}

export default Header
