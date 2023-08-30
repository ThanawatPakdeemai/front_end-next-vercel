import useOfflineNotification from "@hooks/worker/useOfflineNotification"
import Box from "@mui/material/Box"
import dynamic from "next/dynamic"

const BaseToastComponent = dynamic(
  () =>
    import("@feature/toast/components").then((mod) => mod.BaseToastComponent),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: true
})

const OfflineIndicator = ({ className = "" }: { className?: string }) => {
  const [isOnline] = useOfflineNotification()

  const renderContent = () => {
    if (!isOnline) {
      return (
        <Box
          component="div"
          className="offline-indicator__inner fixed bottom-4 left-0 z-[1000] w-full p-[0_20px] md:p-[0_80px]"
          sx={{
            ".MuiAlert-action": {
              display: "none"
            }
          }}
        >
          <BaseToastComponent
            text="It appears that you are offline"
            status="error"
            onClose={() => {}}
            className="mt-0 w-full"
            icon={<Icomoon className="icon-Wifi-Warning text-error-main" />}
          />
        </Box>
      )
    }
    return null
  }

  return (
    <Box
      component="div"
      className={`offline-indicator ${className}`}
    >
      {renderContent()}
    </Box>
  )
}

export default OfflineIndicator
