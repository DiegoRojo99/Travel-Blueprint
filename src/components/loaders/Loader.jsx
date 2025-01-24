import CampingLoader from "./CampingLoader"

export default function Loader({ loader = 'camping'}){
  function getLoader(loader){
    switch(loader){
      case 'camping':
        return <CampingLoader />
      default:
        return <CampingLoader />
    }
  }
  return (
    <div className="w-full h-full flex justify-center items-center">
      {getLoader(loader)}
    </div>
  )
}