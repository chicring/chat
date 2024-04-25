import $toastMessage from '@/components/ToastMessage/index'


export function success (message : string){
  $toastMessage.show({
    color: "success",
    variant: "flat",
    message: message
  })
}

export function info (message : string){
  $toastMessage.show({
    color: "#90CAF9",
    variant: "flat",
    message: message
  })
}

export function warn (message : string){
  $toastMessage.show({
    color: "warning",
    variant: "flat",
    message: message
  })
}

export function error (message : string){
  $toastMessage.show({
    color: "#F2B8B5",
    variant: "flat",
    message: message
  })
}
