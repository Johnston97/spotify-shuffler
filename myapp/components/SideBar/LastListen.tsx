import { Image, Text } from '@chakra-ui/react'

export const LastListen = ({ lastListenedTo }) => {
  // Could check against track api to compare start timestamp and expected song finish time
  if (
    lastListenedTo === '0 m' ||
    lastListenedTo === '1 m' ||
    lastListenedTo === '2 m' ||
    lastListenedTo === '3 m'
  ) {
    return (
      <Image
        height="20px"
        color="white"
        width="20px"
        src="/assets/whiteEqualiser.png"
      ></Image>
    )
  } else {
    return <Text fontSize="xs">{lastListenedTo}</Text>
  }
}
