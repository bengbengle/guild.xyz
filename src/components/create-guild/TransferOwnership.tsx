import {
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  FormControl,
  Input,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"
import Button from "components/common/Button"
import Card from "components/common/Card"
import FormErrorMessage from "components/common/FormErrorMessage"
import { Alert } from "components/common/Modal"
import { useRef } from "react"
import { useForm, useWatch } from "react-hook-form"

const ADDRESS_REGEX = /^0x[A-F0-9]{40}$/i

const TransferOwnership = (): JSX.Element => {
  const {
    control,
    register,
    formState: { errors },
  } = useForm({ mode: "all" })

  const transferOwnershipTo = useWatch({ name: "transferOwnershipTo", control })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)

  return (
    <Card px={{ base: 5, sm: 6 }} py={7}>
      <Stack direction={{ base: "column", md: "row" }} alignItems="start" w="full">
        <FormControl
          isInvalid={errors?.transferOwnershipTo}
          maxW={{ base: "full", md: "sm" }}
        >
          <Input
            {...register("transferOwnershipTo", {
              pattern: {
                value: ADDRESS_REGEX,
                message:
                  "Please input a 42 characters long, 0x-prefixed hexadecimal address.",
              },
            })}
          />

          <FormErrorMessage>{errors?.transferOwnershipTo?.message}</FormErrorMessage>
        </FormControl>
        <Button w="full" h={10} isDisabled={!transferOwnershipTo} onClick={onOpen}>
          Transfer ownership
        </Button>
      </Stack>

      <Alert leastDestructiveRef={cancelRef} {...{ isOpen, onOpen, onClose }}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Transfer ownership
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onClose} ml={3}>
              Transfer ownership
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </Alert>
    </Card>
  )
}

export default TransferOwnership
