import useMemberships from "components/index/hooks/useMemberships"
import useGuild from "components/[guild]/hooks/useGuild"

const useIsMember = (): boolean => {
  const memberships = useMemberships()
  const { id } = useGuild()

  if (id === undefined || memberships === undefined) return undefined

  return memberships.some((_) => _.guildId === id)
}

export default useIsMember
