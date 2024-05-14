import { logOperators, operators } from "../data/data";
import { Dropdown } from "./dropdown";
import { FormLine } from "./layout/formLine";
import { AutocompleteInput } from "./autocompleteInput";
import { Dispatch, SetStateAction } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import "../style/custom.css"
import { delRuleValue } from "../data/generate";

export function FormLineIf(props: { id: number, elArr: JSX.Element[], setEl: Dispatch<SetStateAction<JSX.Element[]>>, fields: string[] }) {
  const id = props.id

  const handleDel = () => {
    let elArr = Array.from(props.elArr)
    elArr.splice(id, 1)
    props.setEl(elArr)
    delRuleValue(id, true)
  }

  return (
    <div>
      {id !== 0 && <FormLine><div className="w-full mx-4"><Dropdown items={logOperators} prop={"logoperator"} id={id} order={true} /></div></FormLine>}
      <FormLine>
        <div className="w-4/12 mr-4"><Dropdown items={props.fields} prop={"field"} id={id} order={true} /></div>
        <div className="w-3/12 mr-4"><Dropdown items={operators} prop={"operator"} id={id} order={true} /></div>
        <div className="w-4/12 mr-4"> <AutocompleteInput items={props.fields} prop={"value"} id={id} /> </div>
        {id !== 0 && <button type="button" className="mb-2 w-11 rounded-none bg-red-600 hover:bg-red-500 text-xl text-center text-base text-white " onClick={handleDel}> <TrashIcon className="mx-auto h-5 w-5" /> </button>}
        {id == 0 && <button type="button" className="mb-2 w-11 rounded-none bg-gray-300 hover:bg-gray-200 text-xl text-center text-base text-white " onClick={handleDel}> <TrashIcon className="mx-auto h-5 w-5" /></button>}
      </FormLine>
    </div>
  )

}