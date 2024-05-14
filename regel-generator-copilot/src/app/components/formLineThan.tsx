import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useEffect } from "react";
import { required, visibility } from "../data/data";
import { Dropdown } from "./dropdown";
import { FormLine } from "./layout/formLine";
import "../style/custom.css";
import { delRuleValue } from "../data/generate";

export function FormLineThan(props: {id: number, elArr: JSX.Element[], setEl: Dispatch<SetStateAction<JSX.Element[]>>, fields: string[]}) {
  const id = props.id

  const handleDel = () => {
    let elArr = Array.from(props.elArr)
    elArr.splice(id, 1)
    props.setEl(elArr)
    delRuleValue(id, false)
  }

   return (
    <div>
      <FormLine>
        <div className="w-4/12 mr-4"><Dropdown items={props.fields} prop={"field"} id={id} order={false} /></div>
        <div className="w-3/12 mr-4"><Dropdown items={visibility} prop={"visibility"} id={id} order={false} /></div>
        <div className="w-4/12 mr-4"><Dropdown items={required} prop={"required"} id={id} order={false} /></div>
        {id !== 0 && <button type="button" className="mb-2 w-11 rounded-none bg-red-600 hover:bg-red-500 text-xl text-center text-base text-white" onClick={handleDel}> <TrashIcon className="mx-auto h-5 w-5" /> </button>}
        {id == 0 && <button type="button" className="mb-2 w-11 rounded-none bg-gray-300 hover:bg-gray-200 text-xl text-center text-base text-white" onClick={handleDel}> <TrashIcon className="mx-auto h-5 w-5" /> </button>}
      </FormLine>
    </div >
  )

}