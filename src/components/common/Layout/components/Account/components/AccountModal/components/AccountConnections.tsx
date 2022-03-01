import {
  HStack,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
import Button from "components/common/Button"
import Section from "components/common/Section"
import useUser from "components/[guild]/hooks/useUser"
import { ArrowClockwise, Question } from "phosphor-react"
import LinkedAddress from "./LinkedAddress"

const AccountConnections = () => {
  const {
    isLoading,
    addresses,
    linkedAddressesCount,
    discordId,
    verifyAddress,
    isSigning,
  } = useUser()
  const { account } = useWeb3React()

  return (
    <Stack spacing="10" w="full">
      {/* <Section title="Connected Discord account">
        {!addressSignedMessage ? (
          <Text colorScheme="gray">
            Hidden. Verify that you're the owner of this account below to view
          </Text>
        ) : (
          <Text colorScheme="gray">Account id: {discordId}</Text>
        )}
      </Section> */}
      <Section
        title="Linked addresses"
        titleRightElement={
          linkedAddressesCount && (
            <>
              <Popover placement="top" trigger="hover">
                <PopoverTrigger>
                  <Icon as={Question} />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverBody>
                    If you join a guild with another address, but with the same
                    Discord account, your addresses will be linked together and each
                    will be used for requirement checks.
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              {Array.isArray(addresses) && (
                <HStack justifyContent="right" flexGrow={1}>
                  <IconButton
                    size="sm"
                    variant="ghost"
                    aria-label="Reload linked addresses"
                    icon={<ArrowClockwise size={14} />}
                    borderRadius="full"
                    onClick={verifyAddress}
                  />
                </HStack>
              )}
            </>
          )
        }
      >
        {isLoading && !addresses ? (
          <Spinner />
        ) : !linkedAddressesCount ? (
          <Text colorScheme="gray">
            If you join a guild with another address, but with the same Discord
            account, your addresses will be linked together and each will be used for
            requirement checks.
          </Text>
        ) : !Array.isArray(addresses) ? (
          <Text colorScheme="gray">
            {linkedAddressesCount} address{linkedAddressesCount > 1 && "es"} hidden.
            Verify that you're the owner of this account below to view{" "}
            {linkedAddressesCount > 1 ? "them" : "it"}
          </Text>
        ) : (
          <Stack spacing={4} pt="2" alignItems="start" w="full">
            {addresses
              .filter((address) => address?.toLowerCase() !== account.toLowerCase())
              .map((address) => (
                <LinkedAddress key={address} address={address} />
              ))}
          </Stack>
        )}
      </Section>
      {linkedAddressesCount && !Array.isArray(addresses) && (
        <Button
          onClick={verifyAddress}
          isLoading={isSigning}
          loadingText="Check your wallet"
        >
          Sign message to verify address
        </Button>
      )}
    </Stack>
  )
}

export default AccountConnections
