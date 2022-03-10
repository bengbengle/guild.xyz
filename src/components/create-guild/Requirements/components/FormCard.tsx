import { CloseButton, VStack } from "@chakra-ui/react"
import CardMotionWrapper from "components/common/CardMotionWrapper"
import ColorCard from "components/common/ColorCard"
import { PropsWithChildren } from "react"
import { RequirementType, RequirementTypeColors } from "types"
import RequirementChainTypeText from "./RequirementChainTypeText"

type Props = {
  index: number
  type: RequirementType
  onRemove: () => void
}

const FormCard = ({
  type,
  index,
  onRemove,
  children,
}: PropsWithChildren<Props>): JSX.Element => (
  <CardMotionWrapper>
    <ColorCard color={RequirementTypeColors[type]}>
      <CloseButton
        position="absolute"
        top={2}
        right={2}
        width={8}
        height={8}
        rounded="full"
        aria-label="Remove requirement"
        zIndex="1"
        onClick={onRemove}
      />
      <VStack spacing={4} alignItems="start" pt={4} h="full">
        {children}
      </VStack>
      <RequirementChainTypeText
        index={index}
        requirementType={type}
        top={"-px"}
        left={"-px"}
        textContainerProps={{
          borderTopLeftRadius: "2xl",
          borderBottomRightRadius: "xl",
        }}
      />
    </ColorCard>
  </CardMotionWrapper>
)

export default FormCard
