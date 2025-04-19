'use client'
import InteractiveCard from './InteractiveCard'

export default function Card({ 
    campgroundName,
    tel,
    address
}: { 
    campgroundName: string, 
    tel: string,
    address: string
}) {
    return (
        <InteractiveCard>
            <div className="w-full h-full p-4 flex flex-col gap-3 bg-gradient-to-br from-amber-50 to-green-50 hover:from-amber-100 hover:to-green-100 transition-all duration-300 rounded-xl border border-amber-200 shadow-sm hover:shadow-md relative overflow-hidden">
                {/* Sun circle in top right */}
                <div className="absolute right-2 top-2 w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center">
                    <div className="absolute w-full h-full animate-pulse bg-yellow-200 rounded-full opacity-70"></div>
                    <div className="w-6 h-6 bg-yellow-400 rounded-full z-10"></div>
                </div>

                {/* Improved tent illustration */}
                <div className="absolute right-2 bottom-2 w-1/3 h-1/2">
                    {/* Tent main structure */}
                    <div className="relative w-full h-full">
                        {/* Tent roof */}
                        <div className="absolute top-0 left-0 w-full h-3/4">
                            <div className="absolute top-0 left-0 w-full h-full bg-amber-500/30 clip-path-tent-roof"></div>
                            <div className="absolute top-0 left-1/4 w-1/2 h-full bg-amber-600/20 clip-path-tent-roof"></div>
                        </div>
                        {/* Tent base */}
                        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-amber-700/20 rounded-b-sm"></div>
                        {/* Tent opening */}
                        <div className="absolute bottom-1/4 left-1/3 w-1/3 h-1/4 bg-amber-300/30 rounded-t-sm"></div>
                        {/* Tent pole */}
                        <div className="absolute bottom-0 left-1/2 w-0.5 h-3/4 bg-amber-800 transform -translate-x-1/2"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-amber-900 tracking-wide">
                        {campgroundName}
                    </h3>
                    
                    {/* Address */}
                    <div className="flex items-start gap-2 mt-2">
                        <div className="relative pl-4">
                            <div className="absolute left-0 top-0.5 text-amber-600">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                            </div>
                            <p className="text-sm text-gray-700 line-clamp-2">
                                {address}
                            </p>
                        </div>
                    </div>
                    
                    {/* Phone number */}
                    <div className="mt-3 flex items-center">
                        <div className="inline-flex items-center gap-2 px-3 py-0 bg-amber-100 rounded-full border border-amber-200">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-amber-700">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                            </svg>
                            <span className="text-amber-800 font-medium text-sm">{tel}</span>
                        </div>
                    </div>
                </div>

                {/* CSS for tent shape */}
                <style jsx>{`
                    .clip-path-tent-roof {
                        clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
                    }
                `}</style>
            </div>
        </InteractiveCard>
    )
}