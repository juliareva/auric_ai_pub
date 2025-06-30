const Loading = () => {
  return (
    <div className="flex justify-center items-center gap-4 flex-col animate-pulse">
        <div className="flex justify-center items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-black dark:bg-white"></div>
            <div className="h-2 w-2 rounded-full bg-black dark:bg-white"></div>
            <div className="h-2 w-2 rounded-full bg-black dark:bg-white"></div>
        </div>
        <span className="text-black font-lato text-md dark:text-white">Loading your meditation… take a deep breath and relax.</span>
    </div>
  )
}

export default Loading