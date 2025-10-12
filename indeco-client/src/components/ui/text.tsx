import { cn } from "@/constants/utils"

const Title = ({children, className} : {children: React.ReactNode, className?: string}) => {
    return (
        <h2 className={cn("text-xl md:text-2xl font-medium text-dark_brownish tracking-wide ", className)}>{children}</h2>
    )
}

const SubTitle = ({children, className} : {children: React.ReactNode, className?: string}) => {
    return (
        <h3 className={cn("text-gray-900 font-medium", className)}>{children}</h3>
    )
}

const SubText = ({children, className} : {children: React.ReactNode, className?: string}) => {
    return (
        <p className={cn("text-gray-600 text-sm", className)}>{children}</p>
    )
}

export { Title, SubTitle,SubText };