import useGuild from "components/[guild]/hooks/useGuild"
import useUser from "./useUser"

const useIsOwner = () => {
  const { id } = useUser()
  const guild:any = useGuild()

  const owner: number = guild?.admins[0].id 

  return owner === id // ()

  // if (typeof guild?.owner?.id !== "number" || typeof id !== "number") return false

  // return guild.owner.id === id
}

export default useIsOwner
