import { IconProps } from "@/types/iconProps";
import clsx from "clsx";
import { Spinner } from "../spinner/spinner";
import { LinkType, LinkTypes } from "@/lib/link-types";
import Link from "next/link";

interface Props{
    size?: "small"| "medium"|"large"
    variant?: "accent"|"secondary"|"outline"|"disabled"|"ico" | "success";
    icon?: IconProps;
    iconTheme?: "accent"|"secondary"|"gray";
    iconPosition?: "left"|"right";
    disabled?: boolean;
    isLoading?: boolean;
    children?: React.ReactNode;
    baseUrl?:string;
    linktype?:LinkType;
    action?:Function;
    type?:"button"|"submit"
    fullWith?:boolean;
}


export const Button=({
    size = "medium",
    variant = "accent",
    icon,
    iconTheme ="accent",
    iconPosition ="right",
    disabled,
    isLoading,
    children,
    baseUrl,
    linktype ="internal",
    type="button",
    fullWith=false,
    action = ()=>{},

}:Props)=>{

    let variantStyles:string = "",
    sizeStyles:string = "", 
    icoSize:number= 0;

    switch (variant) {
        case "accent"://DEFAULT
            variantStyles = "bg-primary hover:bg-primary-400 text-white rounded";
            break;
        case "secondary":
            variantStyles = "bg-primary-200 hover:bg-primary-300/50 text-primary rounded";
            break;
        case "outline":
            variantStyles = "bg-white hover:bg-gray-400/50 boder boder-gray-500 text-gray-900 rounded";
            break;
        case "disabled":
            variantStyles = "bg-gray-400 border border-gray-500 text-gray-600 rounded cursor-not-allowed";
            break;
        case "success":
            variantStyles = "bg-secondary hover:bg-secondary-400 text-white rounded";
            break;
        case "ico":
                if(iconTheme==="accent"){ //DEFAULT
                    variantStyles =
                    "bg-primary hover:bg-primary-400 text-white rounded-full"
                }
                if(iconTheme==="secondary"){
                    variantStyles =
                    "bg-primary-200 hover:bg-primary-300/50 text-primary rounded-full"
                }
                if(iconTheme==="gray"){
                    variantStyles =
                    "bg-gray-700 hover:bg-gray-600 text-white rounded-full"
                }
            break;
    }

    switch (size) {
        case "small":
            sizeStyles=`text-caption3 font-meduim ${
                variant==="ico"? " flex items-center justify-center w-[40px] h-[40px]" : "px-[14px] py-[12px]"
            } `;
            icoSize=18;
            break;
        case "medium"://DEFAULT
            sizeStyles=`text-caption2 font-meduim ${
                variant==="ico"? "flex items-center justify-center w-[50px] h-[50px]" :"px-[18px] py-[15px]"
            } `;
            icoSize=20;
            break;
        case "large":
            sizeStyles=`text-caption1 font-meduim ${
                variant==="ico"? "flex items-center justify-center w-[60px] h-[60px]" :"px-[22px] py-[18px]"
            } `;
            icoSize=24;
            break;

    }

    const handleClick=()=>{
        if(action){
            action()
        }
    };
        const buttonContent =(
        <>
        {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">{
                        variant==="accent" || variant ==="ico"?
                        (<Spinner size="small" variant="white"/>):
                        (<Spinner size="small"/>)}
                         
                </div>)}

            <div className={clsx(isLoading && "invisible")}>
                {icon && variant === "ico"? (
                <icon.icon size={icoSize}/>
                ) : (
                
                <div className=" flex gap-4 items-center">
                    {icon && iconPosition ==="left" && (
                         <icon.icon size={icoSize}/>
                    )}                
                {children}
                {icon && iconPosition ==="right" && (
                         <icon.icon size={icoSize}/>
                    )}       
                </div>    
                )}
                </div>
        </>
    )

    const buttonElement =(
        <button
        type={type}
        className={clsx(variantStyles,icoSize,sizeStyles, isLoading && "cursor-wait",
        fullWith && "w-full",
        isLoading && "cursor-wait","relative animate")} 
        onClick={handleClick} 
        disabled={disabled}
    >
         { buttonContent}
    </button>
    )

      if(baseUrl){
        if(linktype=== LinkTypes.EXTERNAL){
            return(
                <a href={baseUrl} target="_blank">
                    {buttonElement}
                </a>
            )
        };
      }else{
        const linkHref = baseUrl || "/";
        return<Link href={linkHref}> {buttonElement} </Link>

      }
      return buttonElement
 
};