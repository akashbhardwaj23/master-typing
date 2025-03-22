import ThemeToggle from "./ui/themetoggle";


// export default function Navbar(){
//     return (
//         <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 font-mono dark:bg-black dark:border-white/80 dark:text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center justify-between h-16">
//                     <div className="flex justify-center">
//                             Typing Master
//                     </div>
//                     <div className="flex items-center gap-4 cursor-pointer">
//                         <ThemeToggle />
//                     </div>
//             </div>
//         </div>
//     </nav> 
//     )
// }




export default function Navbar(){
    return (
        <nav className="z-50 lg:sticky max-w-[90%] m-auto lg:top-0">
            <section className="flex w-full justify-between items-center m-auto p-2">
                <div className="flex items-center justify-center font-poppins font-semibold text-xl">
                    Typing
                </div>

                <div className="flex items-center gap-4 cursor-pointer">
                    <ThemeToggle />
                </div>
            </section>

            </nav>
    )
}