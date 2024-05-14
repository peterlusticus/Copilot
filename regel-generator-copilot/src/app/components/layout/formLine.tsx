export function FormLine(props: { [x: string]: any; children: any; }) {
    const { children } = props;

    return (
        <div className={"border-gray-300 relative bg-white border shadow-sm p-4 flex focus:outline-none  flex-auto w-" + props.width}>
            {props.icon || props.title ? <div className="flex space-x-1 items-center pb-2">
                {props.title ? <p className="text-base font-bold">{props.title}</p> : ""}
            </div> : "" }
            {children}
        </div>
    )

}