import { createMuiTheme } from '@material-ui/core/styles'
const theme = createMuiTheme({
    palette: {
        type: "dark",
        background: {
            default: "#2D2D2D",
        },
        primary: {
            main: '#ffe62d',
        },
        table: {
            main: "#2D2D2D",
            hover: "#333333"
        }
    },
})
export default theme