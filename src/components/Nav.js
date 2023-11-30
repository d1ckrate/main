"use client";

import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { Logo } from "./Logo";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { useAuth } from "../AuthContext";

const NavLink = (props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [logoSrc, setLogoSrc] = useState("/logochicofooter2.png");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleToggle = () => {
    console.log(colorMode);
    toggleColorMode();
    setLogoSrc(
      colorMode !== "light" ? "/logochicofooter2.png" : "/logochicofooter.png"
    );
  };
  const { user } = useAuth();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Logo src={logoSrc} animado={"false"} width={141} height={141} />
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <ColorModeSwitcher onClick={handleToggle} />
              {user ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Button onClick={handleLogin}>Iniciar Sesión</Button>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
