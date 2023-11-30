import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../app/globals.css";
import { AuthProvider } from "../AuthContext";
const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        fontFamily: "'Poppins', sans-serif;",
      },
    }),
  },
});
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
