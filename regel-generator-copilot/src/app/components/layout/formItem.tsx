export function FormItem(props: { [x: string]: any; children: any; }) {
    const { children } = props;

    return (
        <div className={"flex-auto w-" + props.width}>
            {props.icon || props.title ? <div className="flex space-x-1 items-center pb-2">
                {props.title ? <p className="text-sm font-bold">{props.title}</p> : ""}
            </div> : "" }
            {children}
        </div>
    )

}