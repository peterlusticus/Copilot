import { logOperators, operators } from "../data/data";
import { Dropdown } from "./dropdown";
import { FormLine } from "./layout/formLine";
import { AutocompleteInput } from "./autocompleteInput";
import { Dispatch, SetStateAction } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import "../style/custom.css"
import { delRuleValue } from "../data/generate";

/**
 * Renders a form line for conditional rendering based on props.
 * @param props - The component props.
 * @param props.id - The unique identifier for the form line.
 * @param props.elArr - The array of JSX elements.
 * @param props.setEl - The function to update the array of JSX elements.
 * @param props.fields - The array of field names.
 * @returns The JSX element representing the form line.
 */
export function FormLineIf(props: { id: number, elArr: JSX.Element[], setEl: Dispatch<SetStateAction<JSX.Element[]>>, fields: string[] }) {
  // Function to handle deletion of the form line
  const handleDel = () => {
    let elArr = [...props.elArr]
    elArr.splice(props.id, 1)
    props.setEl(elArr)
    delRuleValue(props.id, true)
  }

  return (
    <div>
      {props.id !== 0 && <FormLine><div className="w-full mx-4"><Dropdown items={logOperators} prop={"logoperator"} id={props.id} order={true} /></div></FormLine>}
      <FormLine>
        <div className="w-4/12 mr-4"><Dropdown items={props.fields} prop={"field"} id={props.id} order={true} /></div>
        <div className="w-3/12 mr-4"><Dropdown items={operators} prop={"operator"} id={props.id} order={true} /></div>
        <div className="w-4/12 mr-4"> <AutocompleteInput items={props.fields} prop={"value"} id={props.id} /> </div>
        {props.id !== 0 && <button type="button" className="mb-2 w-11 rounded-none bg-red-600 hover:bg-red-500 text-xl text-center text-base text-white " onClick={handleDel}> <TrashIcon className="mx-auto h-5 w-5" /> </button>}
        {props.id == 0 && <button type="button" className="mb-2 w-11 rounded-none bg-gray-300 hover:bg-gray-200 text-xl text-center text-base text-white " onClick={handleDel}> <TrashIcon className="mx-auto h-5 w-5" /></button>}
      </FormLine>
    </div>
  )
}